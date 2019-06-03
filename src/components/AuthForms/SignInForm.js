import React, { Component, PureComponent, createRef, Fragment } from 'react';
import { View, Text, ActivityIndicator, TextInput, BackHandler, Alert } from 'react-native';
import jwtDecode from 'jwt-decode';
import { withApollo } from 'react-apollo';
import PropTypes from 'prop-types';
import TouchID from 'react-native-touch-id';
import AsyncStorage from '@react-native-community/async-storage';
import dismissKeyboard from 'react-native/Libraries/Utilities/dismissKeyboard';
import { Mutation } from 'react-apollo';
import { Button, IconButton, Snackbar } from 'react-native-paper';
import { Transition } from 'react-navigation-fluid-transitions'
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconMaterialdesignicons from 'react-native-vector-icons/MaterialCommunityIcons';
//Todo: Styles
import AppStyle from '../../theme/index';
//Todo: Utils
import { validEmail } from '../../untils/validator';
import { SIGN_IN_FAILDED, SIGN_IN_FORM_INVALID } from '../../untils/contains/formValidateContain';
import { APP_NAME } from '../../untils/contains/mainContain';
//Todo: Components
import { WarningInputText } from '../utils/WarningTextInput';
//Todo: GraphQL
import { SIGN_IN_MUTATION } from '../../graphql/mutations/userMutation';
//Todo: LocalState graphql
import { USER_INFO_MUTATION_STATE } from '../../graphql/localStates/mutation';

const optionalConfigObject = {
    title: 'Xác thực',
    imageColor: 'blue',
    unifiedErrors: false,
    cancelText: 'Hủy bỏ'
};
class SignInForm extends PureComponent {
    constructor(props) {
        super(props);
        this.loginBtnRef = createRef();
        this.handleBackButton = () => {
            Alert.alert('Exit App', 'Do you want to exit?', [
                { text: 'No', onPress: () => console.log('Cancel'), style: 'cancel' },
                { text: 'Yes', onPress: () => BackHandler.exitApp() }
            ]);
            return true;
        }
        this.state = {
            userName: 'longldseatechit@gmail.com',
            passWord: 'longkhanh94',
            userNameTouchID: '',
            passWordTouchID: '',
            formError: '',
            isLoading: false,
            snackBar: {
                errorMessage: '',
                visible: false
            }, touchIDSignIn: false
        }
    }
    _onChangeUserName = (e) => {
        if (validEmail(e)) {
            this.setState({
                userName: e,
                formError: ''
            })
        }
        else {
            this.setState({
                userName: e,
                formError: 'userName'
            })
        }
    }
    _onChangePassWord = (e) => {
        this.setState({
            passWord: e
        })
    }

    _onValidForm = async (action) => {
        dismissKeyboard();
        const { userName, passWord, formError, touchIDSignIn, userNameTouchID, passWordTouchID } = this.state;
        if (touchIDSignIn || (userName !== '' && passWord !== '' && formError === '')) {
            const signInData = {
                email: touchIDSignIn ? userNameTouchID : userName,
                passWord: touchIDSignIn ? passWordTouchID : passWord
            }
            let respone = await action({ variables: { signInData } });
            if (respone.data.signIn != null && respone.data.signIn != '' && respone.data.signIn.isSuccess) {
                const jsontoken = respone.data.signIn.jwt;
                return this._createUserInfo(jsontoken);
            }
            else if (!respone.data.signIn.isSuccess && respone.data.signIn.message) {
                this.setState({
                    touchIDSignIn: false,
                    snackBar: {
                        errorMessage: respone.data.signIn.message,
                        visible: true
                    }
                })
            }
            else {
                this.setState({
                    touchIDSignIn: false,
                    snackBar: {
                        errorMessage: SIGN_IN_FAILDED,
                        visible: true
                    }
                })
            }
        }
        else {
            Alert.alert('Cảnh báo', SIGN_IN_FORM_INVALID)
        }
    }
    _createUserInfo = async (jsontoken) => {
        this.setState({ isLoading: true });
        const userInfoAsync = jwtDecode(jsontoken);
        const setItemAsync = AsyncStorage.setItem('@token', jsontoken);
        const userInfo = await userInfoAsync;
        await setItemAsync;
        userInfo['isAuthen'] = true;
        const res = await this.props.client.mutate({
            variables: { userInfo },
            mutation: USER_INFO_MUTATION_STATE
        });
        this.props.navigation.navigate('Index')
    }
    _onSignInErrorHandler = (error) => {
        this.setState({
            touchIDSignIn: false,
            snackBar: {
                errorMessage: SIGN_IN_FAILDED,
                visible: true
            }
        })
    }
    _onCloseSnackBar = () => {
        this.setState({
            snackBar: {
                errorMessage: '',
                visible: false
            }
        })
    }
    _pressHandler = () => {
        TouchID.authenticate(null, optionalConfigObject)
            .then(success => {
                this.setState({
                    touchIDSignIn: true,
                    userNameTouchID: 'longldseatechit@gmail.com',
                    passWordTouchID: 'longkhanh94',
                }, () => { this.loginBtnRef.current.props.onPress(); })
            })
            .catch(error => {
                //Alert.alert('Authentication Failed');
            });
    }
    async componentDidMount() {
        const result = await AsyncStorage.getItem('@token');
        if (result === 'SIGN_OUT') {
            await AsyncStorage.removeItem('@token');
            this.props.client.resetStore();
        }
    }
    render() {
        const { state } = this;
        return (
            <Mutation mutation={SIGN_IN_MUTATION} onError={(error) => this._onSignInErrorHandler(error)}>
                {(action, { data, loading, error }) => (
                    <View style={AppStyle.StyleMain.flexViewCenter}>
                        {(loading || state.isLoading) && <View style={{
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            top: 0,
                            bottom: 0,
                            backgroundColor: '#00000080',
                            justifyContent: 'center',
                            alignItems: 'center',
                            zIndex: 999999
                        }}>
                            <ActivityIndicator color='white' size='large' />
                        </View>
                        }
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                            <Transition shared='logo'>
                                <Icon name='bubble-chart' size={100} color={AppStyle.styleVariable.mainColor} />
                            </Transition>
                            <Transition appear='scale'>
                                <Text style={AppStyle.StyleLoading.welcomeBigText}>{APP_NAME}</Text>
                            </Transition>
                        </View>
                        <Transition appear='scale'>
                            <View style={AppStyle.StyleSignIn.loginInputForm}>
                                <WarningInputText
                                    style={[AppStyle.StyleSignIn.loginTextInput]}
                                    placeholder='Tên đăng nhập'
                                    keyboardType='email-address'
                                    maxLength={50}
                                    _onChange={e => this._onChangeUserName(e)}
                                    value={this.state.userName}
                                    error={state.formError === 'userName'}
                                />
                                <TextInput style={[AppStyle.StyleSignIn.loginTextInput, { marginBottom: 15 }]}
                                    placeholder='Mật khẩu'
                                    secureTextEntry={true}
                                    maxLength={50}
                                    value={this.state.passWord}
                                    onChangeText={this._onChangePassWord}
                                />
                                {/* <Button mode="contained" color={AppStyle.styleVariable.mainColor}
                                    ref={this.loginBtnRef}
                                    style={AppStyle.StyleSignIn.loginButton}
                                    onPress={() => this._onValidForm(action)}>
                                    Đăng nhập
                            </Button> */}
                                <View style={AppStyle.StyleSignIn.loginForgotView}>
                                    <Text style={{ flex: 1, fontSize: 13, height: 30 }}>Quên mật khẩu?</Text>
                                    <Text style={{ flex: 1, textAlign: 'right', fontSize: 13, height: 30 }}
                                        onPress={() => this.props.navigation.navigate('SignUp')}>Đăng ký</Text>
                                </View>
                                <View style={AppStyle.StyleSignIn.loginSocial}>
                                    <IconButton color='green' style={AppStyle.StyleSignIn.loginFingerprint}
                                        icon='fingerprint' onPress={this._pressHandler} />
                                    <IconButton color='blue' style={AppStyle.StyleSignIn.loginSocialIconFb}
                                        icon={() => <IconMaterialdesignicons name='facebook' size={20} color='blue' />} onPress={() => false} />
                                    <IconButton color={AppStyle.styleVariable.mainColor} style={AppStyle.StyleSignIn.loginSocialIconGg}
                                        icon={() => <IconMaterialdesignicons name='google' size={20} color={AppStyle.styleVariable.mainColor} />} onPress={() => false} />
                                </View>
                                <IconButton
                                    onPress={() => this._onValidForm(action)}
                                    icon={() => <IconMaterialdesignicons
                                        name='login-variant'
                                        size={25} color='white' />}
                                    color={AppStyle.styleVariable.mainColor}
                                    style={{
                                        position: 'absolute', bottom: 10, right: 0,
                                        backgroundColor: AppStyle.styleVariable.mainColor, justifyContent: 'center',
                                        alignItems: 'center', borderRadius: 100, elevation: 2,
                                        borderColor: 'white', borderWidth: .5, width: 50, height: 50
                                    }} />
                            </View>

                        </Transition>
                        <Snackbar
                            duration={15000}
                            visible={this.state.snackBar.visible}
                            style={{ backgroundColor: AppStyle.styleVariable.mainColor }}
                            onDismiss={() => this._onCloseSnackBar()}
                            action={{
                                label: 'Quay lại',
                                onPress: () => { this._onCloseSnackBar() },
                            }}
                        >
                            {this.state.snackBar.errorMessage}
                        </Snackbar>
                    </View>
                )}
            </Mutation>
        )
    }
}
SignInForm.propTypes = {
    navigation: PropTypes.object
}
export default withApollo(SignInForm);
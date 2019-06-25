import React, { Component, PureComponent, createRef, Fragment } from 'react';
import { View, Text, ActivityIndicator, TextInput, BackHandler, Alert } from 'react-native';
import Ripple from 'react-native-material-ripple';
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
//Todo: Native Module
import FingerPrintAuthModule from '../../untils/native_modules/FingerPrintAuthModule'

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
            errorMessage: '',
            isLoading: false,
        }
    }
    _onChangeUserName = (e) => {
        this.setState({
            userName: e,
            formError: this.state.formError === 'userName' ? '' : this.state.formError,
            errorMessage: this.state.formError === 'userName' ? '' : this.state.errorMessage,
        })
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
                    errorMessage: respone.data.signIn.message
                })
            }
            else {
                this.setState({
                    touchIDSignIn: false,
                    errorMessage: SIGN_IN_FAILDED
                })
            }
        }
        else {
            let field;
            if (userName === '') {
                field = 'userName';
            }
            else if (passWord === '') {
                field = 'passWord';
            }
            if (field) {
                return this.setState({
                    formError: field
                })
            }
            return Alert('Cảnh báo', SIGN_IN_FORM_INVALID)
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
            errorMessage: SIGN_IN_FAILDED
        })
    }
    _onFingerPrintAuth = () => {
        FingerPrintAuthModule.getFingerPrintAuth(
            (msg) => {
              Alert.alert(JSON.stringify(msg))
            },
            () => {
                this.setState({
                    touchIDSignIn: true,
                    userNameTouchID: 'longldseatechit@gmail.com',
                    passWordTouchID: 'longkhanh94',
                }, () => { this.loginBtnRef.current.props.onPress(); })
            },
          );
    }
    async componentDidMount() {
        const result = await AsyncStorage.getItem('@token');
        if (result === 'SIGN_OUT') {
            await AsyncStorage.removeItem('@token');
            this.props.client.resetStore();
        }
        else{
            setTimeout(() => {
                this._onFingerPrintAuth();
            },800)
 
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
                            <View style={{backgroundColor:'white',
                            flexDirection:'row',
                            paddingHorizontal:10,
                            paddingVertical:5,
                            alignItems:'center',
                            borderRadius:16}}>
                                <ActivityIndicator 
                                color={AppStyle.styleVariable.mainColor}
                                size={25} 
                                style={{marginRight:5}}/>
                                <Text style={{fontWeight:'bold',
                                fontSize:15,
                                color:AppStyle.styleVariable.mainColor
                                }}>Đăng nhập...</Text>
                            </View>
                        </View>
                        }
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                            <Transition shared='logo'>
                                <Icon name='bubble-chart' size={120} color={AppStyle.styleVariable.mainColor} />
                            </Transition>
                            {/* <Transition appear='scale'>
                                <Text style={AppStyle.StyleLoading.welcomeBigText}>{APP_NAME}</Text>
                            </Transition> */}
                        </View>
                        <Transition appear='scale'>
                            <View style={[AppStyle.StyleSignIn.loginInputForm]}>
                                <WarningInputText
                                    style={[AppStyle.StyleSignIn.loginTextInput]}
                                    placeholder='Tên đăng nhập'
                                    keyboardType='email-address'
                                    maxLength={50}
                                    _onChange={e => this._onChangeUserName(e)}
                                    value={this.state.userName}
                                    error={state.formError === 'userName'}
                                    iconName='at'
                                    marginBottom={15}
                                />
                                <WarningInputText
                                    style={[AppStyle.StyleSignIn.loginTextInput]}
                                    placeholder='Mật khẩu'
                                    secureTextEntry={true}
                                    maxLength={50}
                                    _onChange={e => this._onChangePassWord(e)}
                                    value={this.state.passWord}
                                    error={state.formError === 'passWord'}
                                    iconName='shield-key-outline'
                                />
                                <View style={AppStyle.StyleSignIn.loginForgotView}>
                                    <Text style={{ fontSize: 13 }}>Quên mật khẩu?</Text>
                                    {/* <Text style={{ flex: 1, textAlign: 'right', fontSize: 13, height: 30 }}
                                        onPress={() => this.props.navigation.navigate('SignUp')}>Đăng ký</Text> */}
                                </View>
                                <View style={AppStyle.StyleSignIn.loginSocial}>
                                    <IconButton color='green' style={AppStyle.StyleSignIn.loginFingerprint}
                                        icon='fingerprint' onPress={this._onFingerPrintAuth} />
                                    <IconButton color='blue' style={AppStyle.StyleSignIn.loginSocialIconFb}
                                        icon={() => <IconMaterialdesignicons name='facebook' size={20} color='blue' />} onPress={() => false} />
                                    <IconButton color={AppStyle.styleVariable.mainColor} style={AppStyle.StyleSignIn.loginSocialIconGg}
                                        icon={() => <IconMaterialdesignicons name='google' size={20} color={AppStyle.styleVariable.mainColor} />} onPress={() => false} />
                                </View>
                                {this.state.errorMessage != '' && this.state.errorMessage && <View style={{
                                    flexDirection: 'row',
                                    width: '100%',
                                    flexGrow: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <IconMaterialdesignicons
                                        size={22}
                                        color='red'
                                        style={{ marginRight: 5 }}
                                        name='alert-circle-outline' />
                                    <Text
                                        style={{
                                            color: 'red',
                                            fontSize: 17,
                                            fontWeight: 'bold'
                                        }}>{this.state.errorMessage}</Text>
                                </View>}
                            </View>

                        </Transition>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            width: AppStyle.styleVariable.width100,
                            paddingHorizontal: 15,
                            marginVertical: 15
                        }}>
                            <Ripple
                                rippleColor='#ccc'
                                style={{
                                    paddingVertical: 10,
                                    paddingHorizontal: 15,
                                    borderRadius: 4
                                }}
                                onPress={() => this.props.navigation.navigate('SignUp')}>
                                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Tạo tài khoản</Text>
                            </Ripple>
                            <IconButton
                                ref={this.loginBtnRef}
                                onPress={() => this._onValidForm(action)}
                                icon={() => <IconMaterialdesignicons
                                    name='login-variant'
                                    size={25} color='white' />}
                                color={AppStyle.styleVariable.mainColor}
                                style={{
                                    backgroundColor: AppStyle.styleVariable.mainColor, justifyContent: 'center',
                                    alignItems: 'center', borderRadius: 100, elevation: (loading || state.isLoading)?0:2,
                                    borderColor: 'white', borderWidth: .5, width: 50, height: 50
                                }} />
                        </View>
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
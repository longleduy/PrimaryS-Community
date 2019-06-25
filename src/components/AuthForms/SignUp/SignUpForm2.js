import React, { Component, PureComponent } from 'react';
import { View, Text, TouchableWithoutFeedback, TextInput, BackHandler, Alert, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import { Button, IconButton, RadioButton, Snackbar } from 'react-native-paper';
import { Mutation } from 'react-apollo';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconMaterialdesignicons from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePicker from "react-native-modal-datetime-picker";
import dismissKeyboard from 'react-native/Libraries/Utilities/dismissKeyboard';
//Todo: Styles
import AppStyle from '../../../theme/index';
//Todo: Utils
import { validEmail, passWordRegx, convertDateVN } from '../../../untils/validator';
import { SIGN_UP_FAILDED, SIGN_UP_FORM_INVALID, SIGN_UP_SUCCESS } from '../../../untils/contains/formValidateContain';
import {APP_NAME} from '../../../untils/contains/mainContain';
//Todo: Component
import { WarningInputText } from '../../utils/WarningTextInput';
//Todo: GraphQL
import { SIGN_UP_MUTATION } from '../../../graphql/mutations/userMutation';

class SignUpForm extends PureComponent {
    constructor(props) {
        super(props);
        handleBackButton = () => {
            this.props.navigation.navigate('SignIn');
            return true;
        }
        this.state = {
            firstName: 'Long',
            lastName: 'Khanh',
            userName: 'long@gmail.com',
            passWord: 'longkhanh94',
            repassWord: 'longkhanh94',
            dateOfBirth: '01/01/2001',
            gender: 'Male',
            userNameError: false,
            passWordError: false,
            repassError: false,
            isDateTimePickerVisible: false,
            snackBar: {
                visible: false,
                message: '',
                actionType: 'SIGN_IN',
                actionLabel: 'Đăng nhập',
                color: 'green',
            }

        }
    }
    showDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: true });
    };

    hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
    };

    handleDatePicked = date => {
        this.setState({
            isDateTimePickerVisible: false,
            dateOfBirth: convertDateVN(date)
        })
    };
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    }
    _onChangeUserName = (e) => {
        if (validEmail(e)) {
            this.setState({
                userName: e,
                userNameError: false,
            })
        }
        else {
            this.setState({
                userName: e,
                userNameError: true
            })
        }
    }
    _onChangeFirstName = (e) => {
        this.setState({
            firstName: e
        })

    }
    _onChangeLastName = (e) => {
        this.setState({
            lastName: e
        })

    }
    _onChangePassWord = (passWord) => {
        if (passWord === '' || passWordRegx(passWord)) {
            this.setState({
                passWord,
                passWordError: false
            })
        }
        else {
            this.setState({
                passWord,
                passWordError: true
            })
        }
    }
    _onChangeRePassWord = (repassWord) => {
        if (repassWord === '' || repassWord === this.state.passWord) {
            this.setState({
                repassWord,
                repassError: false
            })
        }
        else {
            this.setState({
                repassWord,
                repassError: true
            })
        }
    }
    _onValidForm = async (action) => {
        dismissKeyboard();
        const { firstName, lastName, 
                userName, passWord,
                repassWord,userNameError,
                passWordError, gender, 
                dateOfBirth,repassError } = this.state;
        if (
            // firstName !== ''
            // && lastName !== ''
             userName !== ''
            && passWord !== ''
            && repassWord !== ''
            && !userNameError
            && !passWordError
            && !repassError) {
            const signUpData = {
                firstName,
                lastName,
                email: userName,
                passWord: passWord,
                gender,
                dateOfBirth
            }
            let respone = await action({ variables: { signUpData } });
            if (respone.data.signUp != null && respone.data.signUp != '' && respone.data.signUp.isSuccess) {
                return this.setState({
                    snackBar: {
                        message: SIGN_UP_SUCCESS,
                        visible: true,
                        actionLabel: 'ĐĂNG NHẬP',
                        actionType: 'SIGN_IN',
                        color: 'green'
                    }
                })
            }
            else if (!respone.data.signUp.isSuccess && respone.data.signUp.message) {
                this.setState({
                    snackBar: {
                        message: respone.data.signUp.message,
                        visible: true,
                        actionLabel: 'Hủy bỏ',
                        actionType: 'CLOSE',
                        color: AppStyle.styleVariable.mainColor
                    }
                })
            }
            else {
                this.setState({
                    snackBar: {
                        message: SIGN_UP_FAILDED,
                        visible: true,
                        actionLabel: 'Hủy bỏ',
                        actionType: 'CLOSE',
                        color: AppStyle.styleVariable.mainColor
                    }
                })
            }
        }
        else {
            this.setState({
                snackBar: {
                    message: SIGN_UP_FORM_INVALID,
                    visible: true,
                    actionLabel: 'Hủy bỏ',
                    actionType: 'CLOSE',
                    color: AppStyle.styleVariable.mainColor
                }
            })
        }
    }
    _onSignUpErrorHandler = (error) => {
        this.setState({
            snackBar: {
                message: SIGN_UP_FAILDED,
                visible: true,
                actionLabel: 'Hủy bỏ',
                actionType: 'CLOSE',
                color: AppStyle.styleVariable.mainColor
            }
        })
    }
    _onSnackBarAction = (actionType) => {
        if (actionType === 'CLOSE') return this.setState({
            snackBar: {
                visible: false
            }
        })
        if (actionType === 'SIGN_IN') return this.props.navigation.navigate('SignIn');
    }
    render() {
        const { state } = this;
        return (
            <Mutation mutation={SIGN_UP_MUTATION} onError={(error) => this._onSignUpErrorHandler(error)}>
                {(action, { data, loading, error }) => (
                    <View style={[AppStyle.StyleMain.flexViewCenter,{marginTop:30}]}>
                        {loading && <View style={{
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            top: 0,
                            bottom: 0,
                            backgroundColor: '#00000080',
                            justifyContent: 'center',
                            alignItems: 'center',
                            zIndex: 999
                        }}>
                            <ActivityIndicator color='white' size='large' />
                        </View>
                        }
                        <DateTimePicker
                            datePickerModeAndroid='spinner'
                            isVisible={this.state.isDateTimePickerVisible}
                            onConfirm={this.handleDatePicked}
                            onCancel={this.hideDateTimePicker}
                        />
                        <Snackbar
                            visible={this.state.snackBar.visible}
                            style={{ backgroundColor: this.state.snackBar.color }}
                            onDismiss={() => this.setState({ snackBar: { visible: false } })}
                            action={{
                                label: `${this.state.snackBar.actionLabel}`,
                                onPress: () => { this._onSnackBarAction(this.state.snackBar.actionType) },
                            }}
                        >
                            {this.state.snackBar.message}
                        </Snackbar>
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <Icon name='bubble-chart' size={100} color={AppStyle.styleVariable.mainColor} />
                            <Text style={AppStyle.StyleLoading.welcomeBigText}>{APP_NAME}</Text>
                        </View>
                        {/* <Transition appear='scale'> */}
                        <View style={AppStyle.StyleSignIn.loginInputForm}>
                            <View style={{flexDirection:'row',marginBottom:10}}>
                                <TextInput
                                    placeholder='Họ'
                                    maxLength={50}
                                    value={state.firstName}
                                    onChangeText={e => this._onChangeFirstName(e)}
                                    style={[AppStyle.StyleSignIn.loginTextInput2,{marginRight:3}]}
                                />
                                <TextInput
                                    placeholder='Tên'
                                    maxLength={50}
                                    value={state.lastName}
                                    onChangeText={e => this._onChangeLastName(e)}
                                    style={[AppStyle.StyleSignIn.loginTextInput2,{marginLeft:3}]}
                                />
                            </View>
                            <WarningInputText style={AppStyle.StyleSignIn.loginTextInput}
                                placeholder='Tên đăng nhập'
                                keyboardType='email-address'
                                maxLength={50}
                                _onChange={e => this._onChangeUserName(e)}
                                value={state.userName}
                                error={state.userNameError}
                            />
                            <WarningInputText style={AppStyle.StyleSignIn.loginTextInput}
                                placeholder='Mật khẩu'
                                secureTextEntry={true}
                                maxLength={50}
                                _onChange={e => this._onChangePassWord(e)}
                                value={state.passWord}
                                error={state.passWordError}
                            />
                            <WarningInputText style={AppStyle.StyleSignIn.loginTextInput}
                                placeholder='Nhập lại mật khẩu'
                                secureTextEntry={true}
                                maxLength={50}
                                _onChange={e => this._onChangeRePassWord(e)}
                                error={state.repassError}
                                value={state.repassWord}
                                editable={!(state.passWord === '') && !state.passWordError}
                            />
                            <View style={{ flexDirection: 'row', alignItems: 'center', width: AppStyle.StyleMain.width100 * 0.9 }}>
                                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={{}}>Ngày sinh:</Text>
                                    <TouchableWithoutFeedback onPress={this.showDateTimePicker}>
                                        <View>
                                            <TextInput
                                                style={{ marginLeft: 10, color: '#666' }}
                                                placeholder='Chọn ngày tháng năm sinh'
                                                value={this.state.dateOfBirth}
                                                editable={false}
                                            />
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View >
                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                        <RadioButton
                                            value="Male"
                                            status={this.state.gender === 'Male' ? 'checked' : 'unchecked'}
                                            onPress={() => { this.setState({ gender: 'Male' }); }}
                                            color='green'
                                        />
                                        <Text>Nam</Text>
                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                        <RadioButton
                                            value="Female"
                                            status={this.state.gender === 'Female' ? 'checked' : 'unchecked'}
                                            onPress={() => { this.setState({ gender: 'Female' }); }}
                                            color='green'
                                        />
                                        <Text>Nữ</Text>
                                    </View>
                                </View>
                            </View>
                            {/* <Button mode="contained" color={AppStyle.styleVariable.mainColor} style={AppStyle.StyleSignIn.loginButton} onPress={() => this._onValidForm(action)}>
                                Đăng ký
                    </Button> */}
                            <View style={AppStyle.StyleSignIn.loginForgotView}>
                                <Text style={{ flex: 1, textAlign: 'right', fontSize: 13, height: 30 }}
                                    onPress={() => this.props.navigation.navigate('SignIn')}>Đăng nhập</Text>
                            </View>
                            <View>
                                <View style={{ flexDirection: 'row', alignContent: 'center' }}>
                                    <Icon name='error' size={20} color='green' />
                                    <Text style={{ color: 'green', fontSize: 14, fontWeight: 'bold', marginLeft: 5 }}>Lưu ý:</Text>
                                </View>
                                <Text style={{ color: 'green', fontSize: 13, marginLeft: 15, marginTop: 5 }}>- Mật khẩu phải có tối thiểu 6 ký tự, bao gồm chữ hoa,chữ thường và số.</Text>
                            </View>
                            <IconButton
                                    onPress={() => this._onValidForm(action)}
                                    icon={() => <IconMaterialdesignicons
                                        name='account-plus'
                                        size={25} color='white' />}
                                    color={AppStyle.styleVariable.mainColor}
                                    style={{
                                        position: 'absolute', bottom: 10, right: 0,
                                        backgroundColor: AppStyle.styleVariable.mainColor, justifyContent: 'center',
                                        alignItems: 'center', borderRadius: 100, elevation: 2,
                                        borderColor: 'white', borderWidth: .5, width: 50, height: 50
                                    }} />
                        </View>
                        {/* </Transition> */}
                    </View>
                )}
            </Mutation>
        )
    }
}
SignUpForm.propTypes = {
    navigation: PropTypes.object
}
export default SignUpForm;
import React, { memo, useState, createContext, useContext } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { Button, IconButton } from 'react-native-paper';
import { Mutation } from 'react-apollo';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconMaterialdesignicons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ripple from 'react-native-material-ripple';
//Todo: Components
import SignInFormStep1 from './SignInFormStep1';
import SignInFormStep2 from './SignInFormStep2';
import SignInFormStep3 from './SignInFormStep3';
//Todo:Styles
import AppStyle from '../../../theme/index';
//Todo: Utils
import {
    validEmail,
    passWordRegx
} from '../../../untils/validator';
//Todo: GraphQL
import { SIGN_UP_MUTATION } from '../../../graphql/mutations/userMutation';

export const SignUpContext = createContext();
const SignUpProvider = memo(props => {
    const [signUpData, setSignUpData] = useState({
        firstName: '',
        lastName: '',
        userName: '',
        passWord: '',
        dateOfBirth: {
            day: '',
            month: '01',
            year: ''
        },
        gender: 'Male',
        errorField: '',
        signUpStatus: null,
        signUpStatusMessage: ''
    });
    const handleFunc = {
        _onChangeText: (text, field) => {
            setSignUpData({
                ...signUpData,
                [field]: text,
                errorField: signUpData.emptyInput === field ? null : signUpData.emptyInput
            })
        },
        _onHandleDateOfBirth: (text, field) => {
            setSignUpData({
                ...signUpData,
                dateOfBirth: {
                    ...signUpData.dateOfBirth,
                    [field]: text
                }
            })
        },
        _onChangeGender: (gender) => {
            setSignUpData({
                ...signUpData,
                gender
            })
        },
        _onSetFormError: errorField => {
            setSignUpData({
                ...signUpData,
                errorField
            })
        },
        _onSetSignUpStatus: (signUpStatus, signUpStatusMessage = '') => {
            if (signUpStatus) {
                return setSignUpData({
                    firstName: '',
                    lastName: '',
                    userName: '',
                    passWord: '',
                    dateOfBirth: {
                        day: '',
                        month: '01',
                        year: ''
                    },
                    gender: 'Male',
                    errorField: '',
                    signUpStatus: true,
                    signUpStatusMessage: ''
                })
            }
            return setSignUpData({
                ...signUpData,
                signUpStatus,
                signUpStatusMessage
            })
        }
    }
    //console.log(ContextData);
    return (
        <SignUpContext.Provider value={{ signUpData, handleFunc }}>
            <SignUpForm navigation={props.navigation} />
        </SignUpContext.Provider>
    )
})
const SignUpForm = memo(props => {
    const { handleFunc, signUpData: { firstName,
        lastName,
        userName,
        passWord,
        dateOfBirth: {
            day,
            month,
            year
        },
        gender,
        signUpStatus
    } } = useContext(SignUpContext);
    const [step, setStep] = useState('STEP1');
    const _onNextStep = (nextStep) => {
        let errorField;
        if (step === 'STEP1' && (firstName === '' || lastName === '')) {
            errorField = firstName === '' ? 'firstName' : 'lastName';
        }
        else if (step === 'STEP2' && (userName === '' || passWord === '')) {
            errorField = userName === '' ? 'userName' : 'passWord';
        }
        else if (step === 'STEP2' && userName !== '' && passWord !== '') {
            if (!validEmail(userName)) {
                errorField = 'userName';
            }
            else if (!passWordRegx(passWord)) {
                errorField = 'passWord';
            }
        }
        if (errorField) return handleFunc._onSetFormError(errorField);
        return setStep(nextStep)
    }
    const _onSignUp = async (action) => {
        let errorField;
        if (day === '' || year === '') {
            errorField = day === '' ? 'day' : 'year';
        }
        if (errorField) return handleFunc._onSetFormError(errorField);
        let signUpData = {
            firstName,
            lastName,
            email: userName,
            passWord: passWord,
            gender,
            dateOfBirth: `${day}/${month}/${year}`
        }
        let { data: { signUp } } = await action({ variables: { signUpData } });
        if (signUp != null && signUp != '' && signUp.isSuccess) {
            return handleFunc._onSetSignUpStatus(true)
        }
        else if (!signUp.isSuccess && signUp.message) {
            return handleFunc._onSetSignUpStatus(false, signUp.message)
        }
    }
    return (
        <Mutation mutation={SIGN_UP_MUTATION} onError={(error) => this._onSignUpErrorHandler(error)}>
            {(action, { loading }) => (
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <View style={{ marginVertical: 15, alignItems: 'center' }}>
                        <Icon name='bubble-chart' size={70} color={AppStyle.styleVariable.mainColor} />
                        <Text style={{ fontSize: 20 }}>
                            {step === 'STEP1' && 'Tên hiển thị'}
                            {step === 'STEP2' && 'Email và mật khẩu'}
                            {step === 'STEP3' && 'Ngày sinh và giới tính'}
                        </Text>
                    </View>
                    {step === 'STEP1' && <SignInFormStep1 />}
                    {step === 'STEP2' && <SignInFormStep2 />}
                    {step === 'STEP3' && <SignInFormStep3 />}
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
                                borderRadius: 4,
                                //position: 'absolute', bottom: 20, left: 0,
                            }}
                            onPress={() => {
                                if (step === 'STEP2') return setStep('STEP1')
                                if (step === 'STEP3' && !signUpStatus) return setStep('STEP2')
                                return props.navigation.navigate('SignIn')
                            }}>
                            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                                {(step === 'STEP1' || signUpStatus) && 'Đăng nhập'}
                                {step !== 'STEP1' && !signUpStatus && 'Quay lại'}
                            </Text>
                        </Ripple>
                        <IconButton
                            onPress={() => {
                                if (step === 'STEP1') return _onNextStep('STEP2')
                                if (step === 'STEP2') return _onNextStep('STEP3')
                                if(signUpStatus) return false;
                                return _onSignUp(action);
                            }}
                            icon={() => <IconMaterialdesignicons
                                name={step !== 'STEP3' ? 'arrow-right' : 'check'}
                                size={25} color='white' />}
                            color={AppStyle.styleVariable.mainColor}
                            style={{
                                backgroundColor: signUpStatus ? 'green' : AppStyle.styleVariable.mainColor,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 100,
                                elevation: 1,
                                borderColor: 'white',
                                borderWidth: .5,
                                width: 50,
                                height: 50
                            }} />
                    </View>
                </View>
            )}
        </Mutation>
    )
})
SignUpForm.propTypes = {
    // item: PropTypes.shape({
    //     userInfo: PropTypes.object.isRequired,
    //     postContent: PropTypes.string.isRequired,
    //     postTag: PropTypes.array.isRequired,
    //     postCreateTime: PropTypes.string.isRequired
    // })
}
export default SignUpProvider;
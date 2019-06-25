import React, { memo, Fragment, useContext } from 'react';
import { View, TextInput, Picker, Text } from 'react-native';
import { RadioButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconMaterialdesignicons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ripple from 'react-native-material-ripple';
//Todo: Components
import { WarningInputText } from '../../utils/WarningTextInput';
import AppStyle from '../../../theme/index';

import { SignUpContext } from './SignUpForm';

const SignInFormStep3 = memo(props => {
    const {
        handleFunc: { _onHandleDateOfBirth },
        signUpData: { dateOfBirth: { day, month, year },
            gender,
            errorField,
            signUpStatus,
            signUpStatusMessage } } = useContext(SignUpContext);
    return <Fragment>
        <View style={[AppStyle.StyleSignIn.loginInputForm, { alignItems: 'flex-start' }]}>
            <View style={{ flexDirection: 'row', marginVertical: 10 }}>
                <TextInput
                    placeholder='Ngày'
                    keyboardType='numeric'
                    value={day}
                    onChangeText={e => _onHandleDateOfBirth(e, 'day')}
                    style={{
                        flex: 1,
                        borderWidth: errorField === 'day' ? 1.5 : .5,
                        borderRadius: 5,
                        borderColor: errorField === 'day' ? 'red' : '#cccc',
                        textAlign: 'center',
                    }} />

                <View style={{
                    flex: 1,
                    marginHorizontal: 5,
                    borderWidth: .5,
                    borderRadius: 5,
                    borderColor: '#cccc',
                }}>
                    <Picker
                        selectedValue={month}
                        style={{ marginLeft: 5 }}
                        onValueChange={(itemValue, itemIndex) => _onHandleDateOfBirth(itemValue, 'month')}
                    >
                        <Picker.Item label="01" value="01" />
                        <Picker.Item label="02" value="02" />
                        <Picker.Item label="03" value="03" />
                        <Picker.Item label="04" value="04" />
                        <Picker.Item label="05" value="05" />
                        <Picker.Item label="06" value="06" />
                        <Picker.Item label="07" value="07" />
                        <Picker.Item label="08" value="08" />
                        <Picker.Item label="09" value="09" />
                        <Picker.Item label="10" value="10" />
                        <Picker.Item label="11" value="11" />
                        <Picker.Item label="12" value="12" />
                    </Picker>
                </View>
                <TextInput
                    placeholder='Năm'
                    keyboardType='numeric'
                    value={year}
                    onChangeText={e => _onHandleDateOfBirth(e, 'year')}
                    style={{
                        flex: 1,
                        borderWidth: errorField === 'year' ? 1.5 : .5,
                        borderRadius: 5,
                        borderColor: errorField === 'year' ? 'red' : '#cccc',
                        textAlign: 'center',
                    }}
                />

            </View>
            <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    <RadioButton
                        value="Male"
                        status={gender === 'Male' ? 'checked' : 'unchecked'}
                        onPress={() => _onChangeGender('Male')}
                        color='green'
                    />
                    <Text>Nam</Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    <RadioButton
                        value="Female"
                        status={gender === 'Female' ? 'checked' : 'unchecked'}
                        onPress={() => _onChangeGender('Female')}
                        color='green'
                    />
                    <Text>Nữ</Text>
                </View>
            </View>
           {signUpStatus === false && <View style={{flexDirection: 'row',
           alignItems:'center',
           justifyContent:'center',
           width:'100%',
           flexGrow:1 }}>
                <IconMaterialdesignicons
                    size={22}
                    style={{ marginRight: 5 }}
                    color='red'
                    name='alert-circle-outline' />
                <Text
                    style={{
                        color: 'red',
                        fontSize: 17,
                        fontWeight:'bold'
                    }}>{signUpStatusMessage}</Text>
            </View>}
        </View>
    </Fragment >
})
export default SignInFormStep3;
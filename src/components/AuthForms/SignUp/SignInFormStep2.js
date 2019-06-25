import React, { memo, Fragment, useContext } from 'react';
import { View, Text } from 'react-native';
import IconMaterialdesignicons from 'react-native-vector-icons/MaterialCommunityIcons';
//Todo: Components
import { WarningInputText } from '../../utils/WarningTextInput';
import AppStyle from '../../../theme/index';

import { SignUpContext } from './SignUpForm';

const SignInFormStep2 = memo(props => {
    const { handleFunc, signUpData } = useContext(SignUpContext);
    return <Fragment>
        <View style={AppStyle.StyleSignIn.loginInputForm}>
            <WarningInputText
                style={[AppStyle.StyleSignIn.loginTextInput]}
                placeholder='Email'
                keyboardType='email-address'
                maxLength={50}
                _onChange={e => handleFunc._onChangeText(e, 'userName')}
                value={signUpData.userName}
                error={signUpData.errorField === 'userName'}
                iconName='at'
                marginBottom={15}
            />
            <WarningInputText
                style={[AppStyle.StyleSignIn.loginTextInput]}
                placeholder='Mật khẩu'
                secureTextEntry={true}
                maxLength={50}
                _onChange={e => handleFunc._onChangeText(e, 'passWord')}
                value={signUpData.passWord}
                error={signUpData.errorField === 'passWord'}
                iconName='shield-key-outline'
                marginBottom={10}
            />
            <View style={{ flexDirection: 'row',paddingHorizontal:5 }}>
                <IconMaterialdesignicons
                    size={15}
                    style={{marginRight:5}}
                    color= 'green'
                    name='alert-circle-outline' />
                <Text
                    style={{
                        color: 'green',
                        fontSize: 13
                    }}>Mật khẩu phải có tối thiểu 6 ký tự, bao gồm chữ hoa,chữ thường và số.</Text>
            </View>
        </View>
    </Fragment>
})
SignInFormStep2.propTypes = {
    // item: PropTypes.shape({
    //     userInfo: PropTypes.object.isRequired,
    //     postContent: PropTypes.string.isRequired,
    //     postTag: PropTypes.array.isRequired,
    //     postCreateTime: PropTypes.string.isRequired
    // })
}
export default SignInFormStep2;
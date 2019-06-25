import React, { memo, Fragment,useContext } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { Button, IconButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconMaterialdesignicons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ripple from 'react-native-material-ripple';
//Todo: Components
import { WarningInputText } from '../../utils/WarningTextInput';
import AppStyle from '../../../theme/index';

import {SignUpContext} from './SignUpForm';

const SignInFormStep1 = memo(props => {
    const {handleFunc,signUpData} = useContext(SignUpContext);
    return <Fragment>
        <View style={AppStyle.StyleSignIn.loginInputForm}>
            <WarningInputText
                style={[AppStyle.StyleSignIn.loginTextInput]}
                placeholder='Họ'
                maxLength={50}
                _onChange={e => handleFunc._onChangeText(e,'firstName')}
                value={signUpData.firstName}
                error={signUpData.errorField === 'firstName'}
                iconName='account-edit'
                marginBottom={15}
            />
            <WarningInputText
                style={[AppStyle.StyleSignIn.loginTextInput]}
                placeholder='Tên'
                maxLength={50}
                _onChange={e => handleFunc._onChangeText(e,'lastName')}
                value={signUpData.lastName}
                error={signUpData.errorField === 'lastName'}
                iconName='account-edit'
                marginBottom={15}
            />
        </View>
    </Fragment>
})
SignInFormStep1.propTypes = {
    // item: PropTypes.shape({
    //     userInfo: PropTypes.object.isRequired,
    //     postContent: PropTypes.string.isRequired,
    //     postTag: PropTypes.array.isRequired,
    //     postCreateTime: PropTypes.string.isRequired
    // })
}
export default SignInFormStep1;
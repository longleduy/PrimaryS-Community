import React, { memo } from 'react';
import SignUpProvider from '../../components/AuthForms/SignUp/SignUpForm'

const SignUpScreen = memo(props => {
    return (
        <SignUpProvider
            navigation={props.navigation}
        />
    )
})
export default SignUpScreen;

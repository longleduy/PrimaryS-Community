import React, { Component, PureComponent } from 'react';
import {BackHandler} from 'react-native'
import {handleBackButton} from '../../untils/validator';
import SignInForm from '../../components/AuthForms/SignInForm'

export default class SignInScreen extends PureComponent {
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    }
    render() {
        return (
            <SignInForm navigation={this.props.navigation}/>
        )
    }
}
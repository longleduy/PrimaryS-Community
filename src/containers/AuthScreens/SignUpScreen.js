import React, { Component, PureComponent } from 'react';
import SignUpForm from '../../components/AuthForms/SignUpForm'

export default class SignUpScreen extends PureComponent {
    render() {
        return (
            <SignUpForm navigation={this.props.navigation}/>
        )
    }
}
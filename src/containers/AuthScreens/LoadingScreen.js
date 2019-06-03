import React, { Component, PureComponent } from 'react';
import LoadingForm from '../../components/AuthForms/LoadingForm'
export default class LoadingScreen extends PureComponent {
    render() {
        return (
            <LoadingForm navigation={this.props.navigation}/>
        )
    }
}
import React, { Component, PureComponent } from 'react';
import SideMenuForm from '../../components/Drawers/SideMenuForm'
export default class SideMenuScreen extends PureComponent {
    render() {
        return (
            <SideMenuForm navigation={this.props.navigation}/>
        )
    }
}
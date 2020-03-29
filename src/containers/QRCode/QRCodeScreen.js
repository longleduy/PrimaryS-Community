import React, { PureComponent } from 'react';
import QRCodeForm from '../../components/QRCode/QRCodeForm';

export default class QRCodeScreen extends PureComponent {
    static navigationOptions = () => {
        return {
            headerTransparent: true
        }
    }
    render() {
        return (
            <QRCodeForm navigation={this.props.navigation}/>
        )
    }
}
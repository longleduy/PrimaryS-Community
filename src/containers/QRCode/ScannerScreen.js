import React, { PureComponent } from 'react';
import {View,Text} from 'react-native';
import ScannerForm from '../../components/QRCode/ScannerForm';
//Todo: 
import AppStyle from '../../theme/index';

export default class ScannerScreen extends PureComponent {
    static navigationOptions = ({ navigation, screenProps }) => {
        return {
            headerTitle: <View style={{ flexDirection: 'row' }}>
                <Text style={{ color: 'white',fontWeight:'bold',fontSize:15 }}>QRCode Scanner</Text>
            </View>,
            headerTintColor: 'white',
            headerTitleStyle: { color: 'white' },
            headerStyle: {
                backgroundColor: AppStyle.styleVariable.mainColor,
                color: 'white'
            }
        }
    }
    render() {
        return (
            <ScannerForm />
        )
    }
}
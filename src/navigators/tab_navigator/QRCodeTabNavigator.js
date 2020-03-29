import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { createMaterialTopTabNavigator } from 'react-navigation';
import { View, Dimensions, Text, Alert } from 'react-native'
import { QRCodeStackNavigator } from '../stack_navigator/QRCodeStackNavigator'
import StyleVariable from '../../theme/StyleVariable'
let width = Dimensions.get('window').width;
export const QRCodeTabNavigator = createMaterialTopTabNavigator({
    QRCodeStack: QRCodeStackNavigator,
    OtherStack: QRCodeStackNavigator
},
    {
        tabBarPosition: 'bottom',
        backBehavior: 'history',
        //swipeEnabled :false,
        lazy: true,
        animationEnabled: true,
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
                let { routeName } = navigation.state;
                let iconName;
                let iconSize = 25;
                let padding = 0;
                if (routeName === 'QRCodeStack') {
                    iconName = focused ?`qrcode-scan`: `qrcode`;
                    tabLabel = 'QR Code'
                } 
                else if (routeName === 'OtherStack') {
                    iconName = focused ?'account-convert':`account-tie`;
                    tabLabel = 'Chức năng khác'
                }
                return <View style={{
                    width: width * 0.25,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Icon name={iconName} size={iconSize} color={tintColor} />
                    <Text style={{ fontSize: 11, color: tintColor, marginBottom: padding, fontWeight: 'bold' }}>{tabLabel}</Text>
                </View>;

            },
            tabBarOptions: {
                
                activeTintColor: StyleVariable.mainColor,
                inactiveTintColor: '#333',
                style: {
                    backgroundColor: 'white',
                    height: 50,
                    justifyContent: 'center',
                    elevation:5,
        top: 1,
                    //alignItems: 'center'
                },
                indicatorStyle: {
                    opacity: 0
                },
                showIcon: true,
                showLabel: false,
                pressColor: '#ff000040'
            }
        })
    });
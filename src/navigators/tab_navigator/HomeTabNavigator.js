import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { createMaterialTopTabNavigator } from 'react-navigation';
import { View, Dimensions, Text, Alert } from 'react-native'
import { HomeStackNavigator } from '../stack_navigator/HomeStackNavigator'
import { MessageStackNavigator } from '../stack_navigator/MessageStackNavigator'
import { RecruitmentNavigator } from '../stack_navigator/RecruitmentNavigator'
import { NotificationStackNavigator } from '../stack_navigator/NotificationStackNavigator'
import StyleVariable from '../../theme/StyleVariable'
let width = Dimensions.get('window').width;
export const HomeTabNavigator = createMaterialTopTabNavigator({
    Home: HomeStackNavigator,
    Recruitments: RecruitmentNavigator,
    Messages: MessageStackNavigator,
    Notifications: NotificationStackNavigator
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
                if (routeName === 'Home') {
                    iconName = focused ?`comment-text-multiple`: `comment-multiple-outline`;
                    tabLabel = 'Thảo luận'
                } 
                else if (routeName === 'Recruitments') {
                    iconName = focused ?'account-convert':`account-tie`;
                    tabLabel = 'Tuyển dụng'
                }
                else if (routeName === 'Messages') {
                    iconName = focused ? `email-mark-as-unread`: 'email';
                    tabLabel = 'Tin nhắn'
                }
                else if (routeName === 'Notifications') {
                    iconName = focused ? `bell-ring-outline`: 'bell-ring';
                    tabLabel = 'Thông báo'
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
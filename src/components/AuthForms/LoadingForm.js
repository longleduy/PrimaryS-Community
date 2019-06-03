import React, { Component, PureComponent } from 'react';
import { TouchableWithoutFeedback, View, Text,Alert } from 'react-native';
import jwtDecode  from 'jwt-decode';
import {withApollo} from 'react-apollo'
import AsyncStorage from '@react-native-community/async-storage';
import PropTypes from 'prop-types';
import { Transition } from 'react-navigation-fluid-transitions'
import Icon from 'react-native-vector-icons/MaterialIcons';
import AppStyle from '../../theme/index';

class LoadingForm extends PureComponent {
    componentDidMount = async() =>{
        const isAuth = await AsyncStorage.getItem('@token');
        setTimeout(() => {
            if(isAuth !== '' && isAuth !== null && isAuth !== 'SIGN_OUT') return this.props.navigation.navigate('Index');
            return this.props.navigation.navigate('Sign')
        }, 300)
        if(isAuth !== '' && isAuth !== null && isAuth !== 'SIGN_OUT'){
              const userInfo = await jwtDecode(isAuth);
              const data = {
                queryUserInfo: {
                  __typename: 'UserInfo',
                  userID: userInfo.userID,
                  isAuthen: true,
                  profileName: userInfo.profileName,
                  email: userInfo.email,
                  avatar: userInfo.avatar,
                  dateOfBirth: userInfo.dateOfBirth,
                  gender: userInfo.gender
                }
              }
              await this.props.client.cache.writeData({ data });
        }
    }
    render() {
        return (
            <View style={AppStyle.StyleMain.flexViewCenter}>
                <TouchableWithoutFeedback
                    onPress={() => this.props.navigation.navigate('SignIn')}>
                    <View style={AppStyle.StyleMain.flexViewCenter}>
                        <Transition shared='logo'>
                                <Icon name='bubble-chart' size={120} color={AppStyle.styleVariable.mainColor}/>
                        </Transition>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        )
    }
}
LoadingForm.propTypes = {
    navigation: PropTypes.object
}
export default withApollo(LoadingForm);
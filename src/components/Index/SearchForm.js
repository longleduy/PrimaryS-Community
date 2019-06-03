import React, { PureComponent } from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AppStyle from '../../theme/index';
export default class SearchForm extends PureComponent {
    render() {
        return (
          <View style={AppStyle.StyleMain.flexViewCenter}>
            <Icon name='search' size={40}/>
          </View>
        )
    }
}
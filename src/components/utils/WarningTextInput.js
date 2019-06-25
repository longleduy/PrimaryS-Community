import React, { memo } from 'react'
import { View, TextInput } from 'react-native';
import { Kohana } from 'react-native-textinput-effects';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AppStyle from '../../theme/index';

export const WarningInputText = memo((props) => {
    _onChange = (e) => {
        props._onChange(e);
    }
    return <View style={{flexDirection: 'row',marginBottom:props.marginBottom }}>
            <Kohana
                label={props.placeholder}
                value={props.value}
                iconClass={Icon}
                iconName={props.iconName}
                iconColor={AppStyle.styleVariable.actionButtonColor}
                inputStyle={{ color: '#666', fontSize: 15 }}
                inputPadding={14}
                style={{
                    borderWidth: props.error ? 1.5 : .5,
                    borderColor: props.error ? 'red' : '#ccc',
                    borderRadius: 5,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
                labelStyle={{ color: props.error ? 'red' : '#aaa', fontSize: 15 }}
                useNativeDriver
                onChangeText={this._onChange}
                secureTextEntry={props.secureTextEntry}
                keyboardType={props.keyboardType}
                maxLength={props.maxLength}
            />
</View>
})
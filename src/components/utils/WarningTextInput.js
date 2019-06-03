import React,{memo} from 'react'
import { View, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AppStyle from '../../theme/index';

export const WarningInputText = memo((props) => {
    _onChange = (e) => {
        props._onChange(e);
    }
    return <View style={{justifyContent:'center',marginBottom:15}}>
        <TextInput
            style={[props.style,props.error?AppStyle.StyleMain.textInputError:{borderWidth:1}]}
            placeholder={props.placeholder}
            keyboardType={props.keyboardType}
            maxLength={props.maxLength}
            onChangeText={this._onChange}
            value={props.value}
            editable = {props.editable !== null?props.editable:true}
            secureTextEntry ={props.secureTextEntry}
        />
        {props.error && <Icon name='warning' size={17} color={AppStyle.styleVariable.mainColor} style={{position:'absolute',right:10}}/>}
    </View>
})
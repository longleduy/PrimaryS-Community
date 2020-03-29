import React, { memo,useEffect,useState } from 'react';
import { View, TextInput, ActivityIndicator } from 'react-native'
import { IconButton } from 'react-native-paper';
import PropTypes from 'prop-types';
//Todo: Styles
import AppStyle from '../../theme/index';

const ChatMessageActionForm = memo(props => {
    if (this.props.isLoading) return <View style={AppStyle.StyleMain.flexViewCenter}>
        <ActivityIndicator size={30} color={AppStyle.styleVariable.mainColor} />
    </View>
    return <View style={{
        alignItems: 'center',
        paddingBottom: 5,
        paddingTop: 5,
        flexDirection: 'row',
        paddingRight: 15,
        borderWidth: 0,
        borderColor: '#ccc'
    }}>
        <View style={{
            flex: 2,
            flexDirection: 'row',
            justifyContent: 'center'
        }}>
            <IconButton
                icon='camera'
                onPress={() => false}
                size={AppStyle.styleVariable.width100 * (2 / 30)}
                color='#4545ff' />
            <IconButton
                icon='tag-faces'
                onPress={() => false}
                size={AppStyle.styleVariable.width100 * (2 / 30)}
                color='#4545ff' />
            <IconButton
                icon='attach-file'
                onPress={() => false}
                size={AppStyle.styleVariable.width100 * (2 / 30)}
                color='#4545ff' />
        </View>
        <TextInput
            style={{ borderWidth: .5, borderColor: '#ccc', flex: 3, borderRadius: 5, paddingLeft: 10 }}
            placeholder='Nhập nội dung tin nhắn...'
            multiline={true} textAlignVertical='top' />
        <IconButton
            icon='send'
            style={{ position: 'absolute', right: 10 }}
            onPress={() => false}
            size={AppStyle.styleVariable.width100 * (2 / 30)}
            color='#4545ff' />
    </View>
})
ChatMessageActionForm.propTypes = {

}
export default ChatMessageActionForm;
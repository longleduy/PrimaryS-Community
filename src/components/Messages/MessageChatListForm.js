import React, { Component, PureComponent } from 'react';
import { View, Text, BackHandler, TextInput, FlatList, ActivityIndicator, Dimensions, } from 'react-native'
import { IconButton } from 'react-native-paper';
import PropTypes from 'prop-types'
import AppStyle from '../../theme/index'
import Icon from 'react-native-vector-icons/MaterialIcons';
import ChatForm from './ChatForm2'
let width = Dimensions.get('window').width;
class MessageChatListForm extends PureComponent {
    render() {
        console.log('1212121');
        if (this.props.isLoading) return <View style={AppStyle.StyleMain.flexViewCenter}>
            <ActivityIndicator size={30} color={AppStyle.styleVariable.mainColor} />
        </View>
        return (
            <View style={{ flex: 1, flexDirection: 'column' }}>
                <FlatList
                    data={this.props.listMessage}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => <ChatForm item={{ ...item }} avatar={this.props.avatar} />
                    }
                    keyExtractor={(item) => item.messageID}
                    style={{ marginTop: 60 }}
                //contentContainerStyle={{paddingBottom:60}}
                />
                <View style={{alignItems:'center', paddingBottom: 5, paddingTop: 5,flexDirection:'row',paddingRight:15,borderWidth:0,borderColor:'#ccc' }}>
                    <View style={{ flex: 2,flexDirection:'row',justifyContent:'center' }}>
                        <IconButton icon='camera' onPress={() => false} size={width*(2/30)} color='#4545ff'/>
                        <IconButton icon='tag-faces' onPress={() => false} size={width*(2/30)} color='#4545ff'/>
                        <IconButton icon='attach-file' onPress={() => false} size={width*(2/30)} color='#4545ff'/>
                    </View>
                    <TextInput
                        style={{borderWidth:.5,borderColor:'#ccc', flex: 3,borderRadius:5,paddingLeft:10 }}
                        placeholder='Nhập nội dung tin nhắn...'
                        multiline={true} textAlignVertical='top' />
                    <IconButton icon='send' style={{position:'absolute',right:10}} onPress={() => false} size={width*(2/30)} color='#4545ff'/>
                </View>
            </View>
        )
    }
}
MessageChatListForm.propTypes = {
    listMessage: PropTypes.array
}
export default MessageChatListForm;
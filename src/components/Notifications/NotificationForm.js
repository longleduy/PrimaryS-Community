import React, { Component, Fragment } from 'react';
import { View, Text, Dimensions } from 'react-native'
import { Avatar, Button, Card, Title, Paragraph, IconButton } from 'react-native-paper';
import AppStyle from '../../theme/index'
import Icon from 'react-native-vector-icons/MaterialIcons';
let width = Dimensions.get('window').width
export default class NotificationForm extends Component {
    shouldComponentUpdate(nextProps, nextState){
        return false
    }
    _getContentNotification = (notification) => {
        if (notification.notiZone === 'O') {
            return <View style={{ flex: 1, flexDirection: 'row' }}>
                <Text>{notification.from.profileName}</Text>
                {notification.role === 'COMMENT' && <Text> đã thêm bình luận trong: {notification.postContent}</Text>}
                {notification.role === 'LIKE' && <Text> đã thích bài viết: {notification.postContent}</Text>}
            </View>
        }
        return <View style={{ flex: 1 }}>
            <Text>{notification.from.profileName}</Text>
            <Text> thông báo: {notification.notiContent}</Text>
        </View>
    }
    render() {
        const { item } = this.props;
        return (
            <View style={{ width, flexDirection: 'row', marginBottom: 5, padding: 10,backgroundColor:item.notiZone !== 'O'?'#fff9ea':null }}>
                {item.isNew && <Text style={{
                                            color:AppStyle.styleVariable.mainColor,
                                            fontWeight:'bold',
                                            fontSize:11,
                                            position:'absolute',left:10}}>Mới</Text>}
                <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                    <Avatar.Image size={width * (2 / 13)}
                        source={{ uri: item.from.avatar }}
                    />
                </View>
                <View style={{ flex: 6 }}>
                    {function () {
                        if (item.notiZone === 'O') {
                            return <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
                                <Text numberOfLines={2}>
                                    <Text style={{ fontWeight: 'bold', color: '#333' }}>{item.from.profileName}</Text>
                                    {item.role === 'COMMENT' &&
                                        <Text > đã thêm bình luận trong:
                                    <Text style={{ color: '#333' }}> {item.postContent}</Text>.
                                    </Text>
                                    }
                                    {item.role === 'LIKE' && <Text> đã thích bài viết:
                                    <Text style={{ color: '#333' }}> {item.postContent}</Text>.
                                    </Text>}
                                </Text>
                            </View>
                        }
                        return <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
                            <Text numberOfLines={2}>
                                <Text style={{ fontWeight: 'bold', color: '#333' }}>
                                    {item.from.profileName}
                                </Text>
                                <Text> thông báo:
                                <Text style={{ color: '#333' }}> {item.notiContent}</Text>
                                    .</Text>
                            </Text>
                        </View>
                    }()}
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                        {item.role === 'COMMENT' && <Icon name='message' color='green' size={14} style={{ marginRight: 5 }} />}
                        {item.role === 'LIKE' && <Icon name='favorite' color={AppStyle.styleVariable.mainColor} size={14} style={{ marginRight: 5 }} />}
                        <Text>{item.notiTime}</Text>
                    </View>
                </View>
            </View>
        )
    }
}
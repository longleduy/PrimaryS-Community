import React, { Component } from 'react';
import { View, Text, Dimensions } from 'react-native'
import { Avatar, Button, Card, Title, Paragraph, IconButton, TouchableRipple } from 'react-native-paper';
import Ripple from 'react-native-material-ripple';
import AppStyle from '../../theme/index'
import Icon from 'react-native-vector-icons/MaterialIcons';
let width = Dimensions.get('window').width
export default class MessageForm extends Component {
    shouldComponentUpdate(nextProps, nextState){
        return false
    }
    render() {
        const { item } = this.props;
        console.log(item.id);
        return (
            <Ripple rippleColor='#ccc' rippleOpacity ={0.5}
                onPress={() => this.props.navigation.navigate('ChatStack', {
                    chatStackFrom: item.from
                })}>
                <View style={{ width, flexDirection: 'row', marginBottom: 5, padding: 10 }}>
                    <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                        <Avatar.Image size={width * (2 / 14)}
                            source={{ uri: item.from.avatar }}
                        />
                    </View>
                    <View style={{ flex: 6 }}>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            {item.from.status === 'ON' && <Icon size={22} color='green' name='bubble-chart' style={{ marginRight: 5 }} />}
                            <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{item.from.profileName}</Text>
                        </View>
                        <View style={{ flex: 15, justifyContent: 'center' }}>
                            <Text>
                                {item.replyStatus ? 'Bạn' : (item.from.profileName).split(' ')[0]}: {item.messageContent}
                            </Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text >{item.sentTime}</Text>
                        </View>
                    </View>
                </View>
            </Ripple>
        )
    }
}
import React, { Component, PureComponent } from 'react';
import { View, Text, Dimensions,Alert } from 'react-native';
import { Avatar, IconButton, Surface } from 'react-native-paper';
import MessageChatListForm from '../../components/Messages/MessageChatListForm';
import AppStyle from '../../theme/index';
import Icon from 'react-native-vector-icons/MaterialIcons'
let width = Dimensions.get('window').width
let data = [
    {   
        messageID: '1',
        from : '1',
        to : '2',
        messageContent: 'Xin chao',
        messageSendTime: '12:18 01/05/2019'
    },
    {   
        messageID: '2',
        from : '2',
        to : '1',
        messageContent: 'header is followed by an',
        messageSendTime: '12 giờ'
    },
    {   
        messageID: '3',
        from : '2',
        to : '1',
        messageContent: 'packet contains a global header',
        messageSendTime: '1 giờ'
    },
    {   
        messageID: '4',
        from : '1',
        to : '2',
        messageContent: 'compactness of the format, fields are stored as array elements, and optional fields are stored in objects. A message packet consists of a global header followed by one',
        messageSendTime: '30 phút'
    },
    {   
        messageID: '5',
        from : '1',
        to : '2',
        messageContent: 'message format schema',
        messageSendTime: '30 phút'
    },
    {   
        messageID: '6',
        from : '1',
        to : '2',
        messageContent: 'The header is followed by an array of session messages',
        messageSendTime: '29 phút'
    },
    {   
        messageID: '7',
        from : '2',
        to : '1',
        messageContent: 'that is submitted by the client framework from an Android native application',
        messageSendTime: '20 phút'
    },
    {   
        messageID: '8',
        from : '1',
        to : '2',
        messageContent: 'message type',
        messageSendTime: '15 phút'
    },
    {   
        messageID: '9',
        from : '2',
        to : '1',
        messageContent: 'IBM TealeafCX UI Capture for AJAX does not send clientEnvironment messages',
        messageSendTime: '14 phút'
    },
    {   
        messageID: '10',
        from : '1',
        to : '2',
        messageContent: 'Client environment data contains session',
        messageSendTime: '10 phút'
    },
    {   
        messageID: '11',
        from : '1',
        to : '2',
        messageContent: 'client environment information',
        messageSendTime: '10 phút'
    },
    {   
        messageID: '12',
        from : '2',
        to : '1',
        messageContent: 'submitted by the client framework',
        messageSendTime: '5 phút'
    },
    {   
        messageID: '13',
        from : '1',
        to : '2',
        messageContent: 'fields are stored as array elements',
        messageSendTime: '2 phút'
    },
    {   
        messageID: '14',
        from : '1',
        to : '2',
        messageContent: 'and optional fields are stored in objects',
        messageSendTime: '1 phút'
    },
    {   
        messageID: '15',
        from : '2',
        to : '1',
        messageContent: 'compactness of the format',
        messageSendTime: 'Vừa xong'
    },
    {   
        messageID: '211',
        from : '1',
        to : '2',
        messageContent: 'Xin chao',
        messageSendTime: '12:18 01/05/2019'
    },
    {   
        messageID: '212',
        from : '2',
        to : '1',
        messageContent: 'header is followed by an',
        messageSendTime: '12 giờ'
    },
    {   
        messageID: '213',
        from : '2',
        to : '1',
        messageContent: 'packet contains a global header',
        messageSendTime: '1 giờ'
    },
    {   
        messageID: '214',
        from : '1',
        to : '2',
        messageContent: 'compactness of the format, fields are stored as array elements, and optional fields are stored in objects. A message packet consists of a global header followed by one',
        messageSendTime: '30 phút'
    },
    {   
        messageID: '215',
        from : '1',
        to : '2',
        messageContent: 'message format schema',
        messageSendTime: '30 phút'
    },
    {   
        messageID: '216',
        from : '1',
        to : '2',
        messageContent: 'The header is followed by an array of session messages',
        messageSendTime: '29 phút'
    },
    {   
        messageID: '217',
        from : '2',
        to : '1',
        messageContent: 'that is submitted by the client framework from an Android native application',
        messageSendTime: '20 phút'
    },
    {   
        messageID: '218',
        from : '1',
        to : '2',
        messageContent: 'message type',
        messageSendTime: '15 phút'
    },
    {   
        messageID: '219',
        from : '2',
        to : '1',
        messageContent: 'IBM TealeafCX UI Capture for AJAX does not send clientEnvironment messages',
        messageSendTime: '14 phút'
    },
    {   
        messageID: '2110',
        from : '1',
        to : '2',
        messageContent: 'Client environment data contains session',
        messageSendTime: '10 phút'
    },
    {   
        messageID: '2111',
        from : '1',
        to : '2',
        messageContent: 'client environment information',
        messageSendTime: '10 phút'
    },
    {   
        messageID: '2112',
        from : '2',
        to : '1',
        messageContent: 'submitted by the client framework',
        messageSendTime: '5 phút'
    },
    {   
        messageID: '2113',
        from : '1',
        to : '2',
        messageContent: 'fields are stored as array elements',
        messageSendTime: '2 phút'
    },
    {   
        messageID: '2114',
        from : '1',
        to : '2',
        messageContent: 'and optional fields are stored in objects',
        messageSendTime: '1 phút'
    },
    {   
        messageID: '2115',
        from : '2',
        to : '1',
        messageContent: 'compactness of the format',
        messageSendTime: 'Vừa xong'
    },
]
export default class ChatScreen extends PureComponent {
    static navigationOptions = ({ navigation, screenProps }) => {
        const formUser = navigation.getParam('chatStackFrom', 'NONE');
        return {
            headerLeft: <View style={[AppStyle.StyleMain.flexViewCenter, { width }]}>
                <IconButton icon='clear' size={width * (1 / 15)} style={{ position: 'absolute', right: 0 }}
                    onPress={() => navigation.goBack()} color='#808080'/>
                <View style={{ position: 'absolute', left: 15, flexDirection: 'row', alignItems: 'center' }}>
                    <Icon name='bubble-chart' style={{ marginRight: 5 }} size={25} color={formUser.status === 'ON' ? 'green' : 'red'} />
                    <Text style={{ fontWeight: 'bold', fontSize: 17 }}>{formUser.profileName}</Text>

                </View>
                <View style={[AppStyle.StyleMain.flexViewCenter, { padding: 5 }]}>
                    <Surface style={{ borderColor: '#ddd', elevation: 0, borderWidth: 2, borderRadius: 100, position: 'absolute', bottom: -width * (1 / 16) }}>
                        <Avatar.Image size={width * (1 / 8)}
                            source={{ uri: formUser.avatar }}
                        />
                    </Surface>
                </View>
            </View>,
            headerTransparent: true
        }
    }
    render() {
        const {avatar} = this.props.navigation.getParam('chatStackFrom', 'NONE');
        return (
            <MessageChatListForm navigation={this.props.navigation} listMessage = {data} avatar ={avatar}/>
        )
    }
}
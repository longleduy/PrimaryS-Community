import React, { memo } from 'react';
import { View, Text } from 'react-native';
import { Avatar } from 'react-native-paper';
import Ripple from 'react-native-material-ripple';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';

import AppStyle from '../../theme/index';

const ChatMessageNotificationItemForm = memo(props => {
    let { item,
        item: {
            chatNotificationID,
            from: {
                userID,
                profileName,
                avatar
            },
            notificationContent,
            userNewNotification,
            userReadNotification,
            createTime
        },navigation } = props;
    const getStatusMessage = () => {
        if (!userReadNotification) {
            return <MaterialCommunityIcons
                name='email-open'
                size={15} 
                style={{marginRight:5}}/>
        }
        if (userReadNotification && userReadNotification !== item.userID) {
            return <MaterialCommunityIcons
            name='reply'
            color='green'
            size={17} 
            style={{marginRight:5}}/>
        }
        return null
    }
    return (
        <Ripple rippleColor='#ccc' rippleOpacity={0.5}
            style={{
                marginVertical: 2,
                paddingVertical: 10,
                width: AppStyle.styleVariable.width100,
                flexDirection: 'row'
            }}
            onPress={() => navigation.navigate('ChatMessageStack', {
                chatStackFrom: item.from
            })}>
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth:2,
                borderColor:'#ddd',
                borderRadius:100,
                marginHorizontal:15
            }}>
                <Avatar.Image
                    size={AppStyle.styleVariable.width100 * (2 / 14)}
                    source={{ uri: avatar }}
                />
            </View>
            <View style={{ flexGrow:1 }}>
                <View style={{
                    flex: 1,
                    flexDirection: 'row'
                }}>
                    <Text style={{
                        fontSize: 15,
                        fontWeight: 'bold',
                        color:item.userID === userReadNotification?'#333':'#777'
                    }}>
                        {profileName}
                    </Text>
                </View>
                <View style={{
                    flex: 15,
                    marginVertical:3,
                    alignItems: 'center',
                    flexDirection:'row',
                    
                }}>
                    {getStatusMessage()}
                    <Text
                    style={{fontWeight:item.userID === userReadNotification?'bold':'normal',
                            color:item.userID === userReadNotification?'#333':'#666'}}>
                        {notificationContent}
                    </Text>
                    {item.userID === userReadNotification && <Avatar.Image
                    size={AppStyle.styleVariable.width100 * (2 / 45)}
                    style={{position:'absolute',
                    right:20}}
                    source={{ uri: avatar }}
                />}
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 12 }}>{createTime}</Text>
                </View>
            </View>
        </Ripple>
    )
})
ChatMessageNotificationItemForm.propTypes = {
    item: PropTypes.shape({
        chatNotificationID: PropTypes.string.isRequired,
        userID: PropTypes.string.isRequired,
        from: PropTypes.shape({
            userID: PropTypes.string.isRequired,
            profileName: PropTypes.string.isRequired,
            avatar: PropTypes.string
        }),
        notificationContent: PropTypes.string,
        userNewNotification: PropTypes.string,
        userReadNotification: PropTypes.string,
        createTime: PropTypes.string.isRequired
    })
}
export default ChatMessageNotificationItemForm;
import React, { memo } from 'react';
import { View, Text } from 'react-native';
import { Avatar } from 'react-native-paper';
import Ripple from 'react-native-material-ripple';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';

import AppStyle from '../../theme/index';

const ChatMessageNotificationItemForm = memo(props => {
    console.log("ChatMessageNotificationItemForm");
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
            userReadedNotification,
            createTime
        }, navigation, currentUserID } = props;
    const getStatusMessage = () => {
        if (!userReadNotification && currentUserID !== userReadedNotification) {
            return <Avatar.Image
                size={AppStyle.styleVariable.width100 * (2 / 60)}
                source={{ uri: avatar }}
                style={{ marginRight: 5 }}
            />
        }
        if (userReadNotification && userReadNotification !== item.userID) {
            return <MaterialCommunityIcons
                name='reply'
                color='green'
                size={17}
                style={{ marginRight: 5 }} />
        }
        return null
    }
    return (
        <Ripple rippleColor='#ccc' rippleOpacity={0.5}
            style={{
                marginVertical: 2,
                paddingVertical: 10,
                flexDirection: 'row',
                marginRight:  10
            }}
            onPress={() => navigation.navigate('ChatMessageStack', {
                chatStackFrom: item.from
            })}>
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 2,
                borderColor: '#ddd',
                borderRadius: 100,
                marginHorizontal: 15
            }}>
                <Avatar.Image
                    size={AppStyle.styleVariable.width100 * (2 / 14)}
                    source={{ uri: avatar }}
                />
            </View>
            <View style={{ flexGrow: 1,width:0}}>
                <View style={{
                    flex: 1,
                    flexDirection: 'row'
                }}>
                    <Text style={{
                        fontSize: 15,
                        fontWeight: 'bold',
                        color: item.userID === userReadNotification ? '#333' : '#777'
                    }}>
                        {profileName}
                    </Text>
                </View>
                <View style={{
                    flex: 15,
                    marginVertical: 3,
                    alignItems: 'center',
                    flexDirection: 'row'

                }}>
                    {getStatusMessage()}
                    <Text
                        numberOfLines={1}
                        style={{
                            fontWeight: item.userID === userReadNotification ? 'bold' : 'normal',
                            color: item.userID === userReadNotification ? '#333' : '#666',
                            flexGrow:1,
                            width:0
                        }}>
                        {notificationContent}
                    </Text>
                    {item.userID === userReadNotification && <Avatar.Image
                        size={AppStyle.styleVariable.width100 * (2 / 45)}
                        style={{
                            position: 'absolute',
                            right: 20
                        }}
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
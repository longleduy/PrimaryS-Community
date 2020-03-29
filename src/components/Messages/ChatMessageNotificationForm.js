import React, { memo, useEffect } from 'react';
import { View, FlatList, ActivityIndicator, Text } from 'react-native';
import PropTypes from 'prop-types';
//Todo: Styles
import AppStyle from '../../theme/index';
//Todo: Components
import ChatMessageNotificationItemForm from './ChatMessageNotificationItemForm';
import ChatMessageNotificationFlatListForm from './ChatMessageNotificationFlatListForm';
//Todo: GraphQL
import { CREATE_CHAT_MESSAGE_NOTIFICATION_SUB } from '../../graphql/subscriptions/chat_notification/chatNotificationSubcription'

const ChatMessageNotificationForm = memo(props => {
    let { data: { getChatMessageNotification }, networkStatus, navigation, refetch, subscribeToMore,loading2 } = props;
    if (networkStatus === 1 || loading2) return <View style={AppStyle.StyleMain.flexViewCenter}>
        <ActivityIndicator size={30} color={AppStyle.styleVariable.mainColor} />
    </View>
    let {data2: { queryUserInfo: {userID} }} = props;
    console.log(userID);
    return (
        <ChatMessageNotificationFlatListForm
            listNotification={getChatMessageNotification}
            refetch={refetch}
            networkStatus={networkStatus}
            currentUserID = {userID}
            navigation={navigation}
            subscribeToMore={subscribeToMore}
        />
    )
})
ChatMessageNotificationForm.propTypes = {
    // item: PropTypes.shape({
    //     userInfo: PropTypes.object.isRequired,
    //     postContent: PropTypes.string.isRequired,
    //     postTag: PropTypes.array.isRequired,
    //     postCreateTime: PropTypes.string.isRequired
    // })
}
export default ChatMessageNotificationForm;
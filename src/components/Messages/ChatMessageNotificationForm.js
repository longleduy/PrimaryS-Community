import React, { memo } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
//Todo: Styles
import AppStyle from '../../theme/index';
//Todo: Components
import ChatMessageNotificationItemForm from './ChatMessageNotificationItemForm';
const ChatMessageNotificationForm = memo(props => {
    let { data: { getChatMessageNotification }, networkStatus, navigation, refetch } = props;
    if (networkStatus === 1) return <View style={AppStyle.StyleMain.flexViewCenter}>
        <ActivityIndicator size={30} color={AppStyle.styleVariable.mainColor} />
    </View>
    return (
        <FlatList
            data={getChatMessageNotification}
            onRefresh={() => refetch()}
            refreshing={networkStatus === 4}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => <ChatMessageNotificationItemForm
                item={item}
                navigation={navigation}
            />
            }
            keyExtractor={(item) => item.chatNotificationID}
            contentContainerStyle={{ paddingBottom: 60 }}
            style={{ paddingTop: 60 }}
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
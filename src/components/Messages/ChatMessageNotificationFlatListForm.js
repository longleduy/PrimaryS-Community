import React, { memo, useEffect } from 'react';
import { FlatList } from 'react-native';
import _ from 'lodash';
import PropTypes from 'prop-types';
//Todo: Styles
import AppStyle from '../../theme/index';
//Todo: Components
import ChatMessageNotificationItemForm from './ChatMessageNotificationItemForm';
//Todo: GraphQL
import { CREATE_CHAT_MESSAGE_NOTIFICATION_SUB } from '../../graphql/subscriptions/chat_notification/chatNotificationSubcription'

const ChatMessageNotificationFlatListForm = memo(props => {
    let { listNotification, networkStatus, navigation, refetch, currentUserID, subscribeToMore } = props;
    useEffect(() => {
        subscribeToMore({
            document: CREATE_CHAT_MESSAGE_NOTIFICATION_SUB,
            variables: { userChatSubData: { userID: currentUserID } },
            updateQuery: (prev, result) => {
                let newChatMessageNotification = { ...result.subscriptionData.data.createChatMessageNotificationSub };
                let { chatNotificationID,userReadNotification } = newChatMessageNotification;
                if (currentUserID === newChatMessageNotification.userID) {
                    newChatMessageNotification.from = newChatMessageNotification.user;
                    delete newChatMessageNotification.user;
                }
                else {
                    newChatMessageNotification.userID = currentUserID;
                    delete newChatMessageNotification.user;
                }
                let newListChatMessageNotification = [...prev.getChatMessageNotification];
                let idx = _.findIndex(newListChatMessageNotification, { chatNotificationID });
                if (idx === -1) {
                    newListChatMessageNotification.unshift(newChatMessageNotification);
                    return { getChatMessageNotification: newListChatMessageNotification }

                }
                else{
                    if(userReadNotification){
                        newListChatMessageNotification.splice(idx, 1);
                        newListChatMessageNotification.unshift(newChatMessageNotification);
                        return { getChatMessageNotification: newListChatMessageNotification }
                    }
                    prev.getChatMessageNotification[idx] = newChatMessageNotification;
                    return { getChatMessageNotification: prev.getChatMessageNotification }
                }
                

                // newListRecruitmentPost.unshift(newRecruitmentPost)
                // try {
                //     return { getListRecruitmentPost: newListRecruitmentPost }
                // } catch (error) { }
            }
        })
    }, [])
    return (
        <FlatList
            data={listNotification}
            onRefresh={() => refetch()}
            refreshing={networkStatus === 4}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => <ChatMessageNotificationItemForm
                item={item}
                navigation={navigation}
                currentUserID={currentUserID}
            />
            }
            keyExtractor={(item) => item.chatNotificationID}
            contentContainerStyle={{ paddingBottom: 60 }}
            style={{ paddingTop: 60 }}
        />
    )
})
ChatMessageNotificationFlatListForm.propTypes = {
    // item: PropTypes.shape({
    //     userInfo: PropTypes.object.isRequired,
    //     postContent: PropTypes.string.isRequired,
    //     postTag: PropTypes.array.isRequired,
    //     postCreateTime: PropTypes.string.isRequired
    // })
}
export default ChatMessageNotificationFlatListForm;
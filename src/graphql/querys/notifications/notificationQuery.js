import gql from 'graphql-tag';

export const GET_CHAT_MESSAGE_NOTIFICATION_QUERY = gql`
    query GetChatMessageNotification($getChatMessageNotificationData: getChatMessageNotificationData){
        getChatMessageNotification(getChatMessageNotificationData: $getChatMessageNotificationData){
            chatNotificationID
            userID
            from{
                userID
                profileName
                avatar
            }
            notificationContent     
            userNewNotification
            userReadNotification
            userReadedNotification
            createTime
        }
    }
`;
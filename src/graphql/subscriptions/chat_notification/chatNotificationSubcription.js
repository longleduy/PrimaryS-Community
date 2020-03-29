import gql from 'graphql-tag';

export const CREATE_CHAT_MESSAGE_NOTIFICATION_SUB = gql`
    subscription CreateChatMessageNotificationSub($userChatSubData: userChatSubData){
        createChatMessageNotificationSub(userChatSubData: $userChatSubData){
            chatNotificationID
            userID
            role
            from{
                userID
                profileName
                avatar
            }
            user{
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
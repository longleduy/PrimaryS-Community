import gql from 'graphql-tag';

export const CREATE_CHAT_MESSAGE_SUB = gql`
    subscription CreateChatMessageSub($chanelIDData: chanelIDData){
        createChatMessageSub(chanelIDData: $chanelIDData){
            from
            to
            messageContent
            messageImage
            chatTime
        }
    }
`;
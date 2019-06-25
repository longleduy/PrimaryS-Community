import gql from 'graphql-tag';

export const CREATE_CHAT_MESSAGE_MUTATION = gql`
    mutation CreateChatMessage($chatMessageData: chatMessageData){
        createChatMessage(chatMessageData: $chatMessageData){
            from
            to
            messageContent
            messageImage
            chatTime
        }
    }
`;
import gql from 'graphql-tag';

export const GET_LIST_CHAT_MESSAGE_QUERY = gql`
    query GetListChatMessage($chanelIDData: chanelIDData){
        getListChatMessage(chanelIDData: $chanelIDData){
            messageID
            userID
            from
            to
            messageContent
            messageImage
            chatTime
        }
        }
`;
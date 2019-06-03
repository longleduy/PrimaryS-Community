import gql from 'graphql-tag';

export const CREATE_DEFAULT_POST_MUTATION = gql`
    mutation CreateDefaultPost($defaultPostData: defaultPostData){
        createDefaultPost(defaultPostData: $defaultPostData){
            isSuccess
            message
        }
    }
`;
export const LIKE_DEFAULT_POST_MUTATION = gql`
    mutation LikeDefaultPost($likeDefaultPostData:likeDefaultPostData){
        likeDefaultPost(likeDefaultPostData:$likeDefaultPostData){
            postID
            count
            liked
        }
    }
`;
export const COMMENT_DEFAULT_POST_MUTATION = gql`
    mutation CommentDefaultPost($commentDefaultPostData:commentDefaultPostData){
        commentDefaultPost(commentDefaultPostData:$commentDefaultPostData){
            commentID
            commentContent
            commentImage
            commentCreateTime
            userInfo{
                userID
                profileName
                avatar
            }
        }
    }
`;
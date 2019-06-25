import gql from 'graphql-tag';

export const GET_LIST_DEFAULT_POST_QUERY = gql`
    query GetListDefaultPost($lastPostID: String){
        getListDefaultPost(lastPostID: $lastPostID){
            userInfo{
            userID
            profileName
            avatar
            }
            isAuthor
            postID
            postContent
            postImage
            postTag
            isComment
            isPublic
            postCreateTime
            interactive{
                liked
                likes
                comments
            }
        }
    }
`;
export const GET_LIST_COMMENT_DEFAULT_POST_QUERY = gql`
    query GetListCommentDefaultPost($getListCommentDefaultPostData: getListCommentDefaultPostData){
        getListCommentDefaultPost(getListCommentDefaultPostData: $getListCommentDefaultPostData){
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
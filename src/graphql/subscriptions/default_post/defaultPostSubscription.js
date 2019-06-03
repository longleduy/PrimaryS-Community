import gql from 'graphql-tag';

export const CREATE_DEFAULT_POST_SUB = gql`
    subscription CreateDefaultPostSub{
        createDefaultPostSub{
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
export const LIKE_DEFAULT_POST_SUB = gql`
    subscription LikeDefaultPostSub{
        likeDefaultPostSub{
            postID
            count
            liked
        }
    }
`;
export const COMMENT_DEFAULT_POST_SUB = gql`
    subscription CommentDefaultPostCountSub{
        commentDefaultPostCountSub{
            postID
            comments
        }
    }
`;
export const COMMENT_DEFAULT_POST_SUB2 = gql`
    subscription CommentDefaultPostSub($postID: String!){
        commentDefaultPostSub(postID:$postID ){
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
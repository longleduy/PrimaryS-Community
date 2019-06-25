import gql from 'graphql-tag';

export const CREATE_RECRUITMENT_POST_SUB = gql`
    subscription CreateRecruitmentPostSub{
        createRecruitmentPostSub{
            postID
            postContent
            postImage
            postTag
            role
            salary
            number
            company
            address
            emailAddress
            phoneNumber
            interactive2{
                attends
                attended
                comments
            }
            postCreateTime
            postStatus
            userInfo{
                userID
                profileName
                avatar
            }
        }
    }
`;
export const ATTEND_RECRUITMENT_POST_SUB = gql`
    subscription AttendRecruitmentPostSub{
        attendRecruitmentPostSub{
            postID
            count
            attended
        }
    }
`;
export const COMMENT_RECRUITMENT_POST_SUB = gql`
    subscription CommentRecruitmentPostCountSub{
        commentRecruitmentPostCountSub{
            postID
        }
    }
`;
export const COMMENT_RECRUITMENT_POST_SUB2 = gql`
    subscription CommentRecruitmentPostSub($postID: String!){
        commentRecruitmentPostSub(postID:$postID ){
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
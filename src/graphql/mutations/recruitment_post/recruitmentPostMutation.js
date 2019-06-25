import gql from 'graphql-tag';

export const CREATE_RECRUITMENT_POST_MUTATION = gql`
    mutation CreateRecruitmentPost($recruitmentPostData: recruitmentPostData){
        createRecruitmentPost(recruitmentPostData: $recruitmentPostData){
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
export const ATTEND_RECRUITMENT_POST_MUTATION = gql`
    mutation AttendRecruitmentPost($attendRecruitmentPostData:attendRecruitmentPostData){
        attendRecruitmentPost(attendRecruitmentPostData:$attendRecruitmentPostData){
            postID
            count
            attended
        }
    }
`;
export const COMMENT_RECRUITMENT_POST_MUTATION = gql`
    mutation CommentRecruitmentPost($commentRecruitmentPostData:commentRecruitmentPostData){
        commentRecruitmentPost(commentRecruitmentPostData:$commentRecruitmentPostData){
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
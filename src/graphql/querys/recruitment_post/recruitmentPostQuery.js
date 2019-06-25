import gql from 'graphql-tag';

export const GET_LIST_RECRUITMENT_POST_QUERY = gql`
    query GetListRecruitmentPost($lastPostID: String){
        getListRecruitmentPost(lastPostID:$lastPostID){
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
export const GET_LIST_COMMENT_RECRUITMENT_POST_QUERY = gql`
    query GetListCommentRecruitmentPost($getListCommentRecruitmentPostData: getListCommentRecruitmentPostData){
        getListCommentRecruitmentPost(getListCommentRecruitmentPostData: $getListCommentRecruitmentPostData){
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
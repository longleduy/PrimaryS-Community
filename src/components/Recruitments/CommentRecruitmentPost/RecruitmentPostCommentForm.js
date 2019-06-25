import React, { memo, useRef } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import ListRecruitmentPostCommentForm from './ListRecruitmentPostCommentForm';
import { Button } from 'react-native-paper';
import IconMaterialdesignicons from 'react-native-vector-icons/MaterialCommunityIcons';
import { IconButton } from 'react-native-paper';
import PropTypes from 'prop-types';
//Todo: Styles
import AppStyle from '../../../theme/index';
//Todo: Components
import RecruitmentPostCommentActionForm from './RecruitmentPostCommentActionForm';

const RecruitmentPostCommentForm = memo(props => {
    console.log("RecruitmentPostCommentForm");
    let { listComment: { getListCommentRecruitmentPost },
        postID,
        loading,
        subscribeToMore,
        fetchMore,
        comments } = props;
    const listCommentFormRef = useRef();
    const _onLoadMoreComment = () => {
        fetchMore({
            variables: { getListCommentRecruitmentPostData: { postID, skipNumber: getListCommentRecruitmentPost.length } },
            updateQuery: (previousResult, { fetchMoreResult }) => {
                const prevPostList = previousResult.getListCommentRecruitmentPost;
                const newListPost = fetchMoreResult.getListCommentRecruitmentPost;
                return {
                    getListCommentRecruitmentPost: [...newListPost, ...prevPostList]
                }
            }
        })
    }
    const scrollToEnd = () => {
        listCommentFormRef.current.scrollToEnd()
    }
    if (loading && !getListCommentRecruitmentPost) return <View style={AppStyle.StyleMain.flexViewCenter}>
        <ActivityIndicator size={30} color={AppStyle.styleVariable.mainColor} />
    </View>
    return <View style={{ flex: 1, justifyContent: 'space-between' }}>
        <ListRecruitmentPostCommentForm
            ref={listCommentFormRef}
            listComment={getListCommentRecruitmentPost}
            fetchMore={fetchMore}
            comments={comments}
            postID={postID} />
        <RecruitmentPostCommentActionForm
            postID={postID}
            scrollToEnd={scrollToEnd}
            subscribeToMore={subscribeToMore}
        />
        {comments > getListCommentRecruitmentPost.length && <IconButton
            onPress={() => { if (loading) return null; return _onLoadMoreComment() }}
            icon={() => loading ? <ActivityIndicator size={15} color='white' /> : <IconMaterialdesignicons
                name='plus'
                size={20} color='white' />}
            color={AppStyle.styleVariable.mainColor}
            style={{
                position: 'absolute', top: 10, right: 10,
                backgroundColor: AppStyle.styleVariable.mainColor, justifyContent: 'center',
                alignItems: 'center', borderRadius: 100, elevation: 2,
                borderColor: 'white', borderWidth: .5, width: 35, height: 35
            }} />}
    </View>
})
RecruitmentPostCommentForm.propTypes = {
    postID: PropTypes.string,
    comments: PropTypes.number,
    loading: PropTypes.bool,
    subscribeToMore: PropTypes.func,
    fetchMore: PropTypes.func
}
export default RecruitmentPostCommentForm;
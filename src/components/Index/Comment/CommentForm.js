import React, { memo, useRef } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import ListCommentForm from './ListCommentForm';
import { Button } from 'react-native-paper';
import IconMaterialdesignicons from 'react-native-vector-icons/MaterialCommunityIcons';
import { IconButton } from 'react-native-paper';
import PropTypes from 'prop-types';
//Todo: Styles
import AppStyle from '../../../theme/index';
//Todo: Components
import CommentActionForm from './CommentActionForm'

const CommentForm = memo(props => {
    console.log("CommentForm");
    let { listComment,listComment: { getListCommentDefaultPost }, postID, loading, subscribeToMore, fetchMore, comments } = props;
    const listCommentFormRef = useRef();
    const _onLoadMoreComment = () => {
        fetchMore({
            variables: { getListCommentDefaultPostData:{postID, skipNumber:getListCommentDefaultPost.length} },
            updateQuery: (previousResult, { fetchMoreResult }) => {
                const prevPostList = previousResult.getListCommentDefaultPost;
                const newListPost = fetchMoreResult.getListCommentDefaultPost;
                return {
                    getListCommentDefaultPost: [...newListPost, ...prevPostList]
                }
            }
        })
    }
    const scrollToEnd = () => {
        listCommentFormRef.current.scrollToEnd()
    }
    if (loading && !getListCommentDefaultPost) return <View style={AppStyle.StyleMain.flexViewCenter}>
        <ActivityIndicator size={30} color={AppStyle.styleVariable.mainColor} />
    </View>
    return <View style={{ flex: 1, justifyContent: 'space-between' }}>
        <ListCommentForm
            ref={listCommentFormRef}
            listComment={getListCommentDefaultPost}
            fetchMore={fetchMore}
            comments={comments}
            postID={postID} />
        <CommentActionForm
            postID={postID}
            scrollToEnd={scrollToEnd}
            subscribeToMore={subscribeToMore}
        />
        {comments > getListCommentDefaultPost.length &&<IconButton
            onPress={() => {if(loading) return null; return _onLoadMoreComment()}}
            icon={() => loading? <ActivityIndicator size={15} color='white' />:<IconMaterialdesignicons
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
CommentForm.propTypes = {
    Comment: PropTypes.object,
    postID: PropTypes.string
}
export default CommentForm;
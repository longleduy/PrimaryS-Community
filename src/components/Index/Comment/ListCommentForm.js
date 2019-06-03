import React, { memo,forwardRef,useImperativeHandle,useRef } from 'react';
import { View, FlatList, ActivityIndicator, Text, Alert } from 'react-native';
import CommentItemForm from './CommentItemForm';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types'
import AppStyle from '../../../theme/index'
const ListCommentForm = memo(forwardRef((props,ref) => {
    console.log("ListCommentForm");
    let { listComment, comments,isLoading } = props;
    const flatListRef = useRef();
    useImperativeHandle(ref, () => ({
        scrollToEnd() {
            flatListRef.current.scrollToEnd({animated: true})
        }
      }));
    if (isLoading) return <View style={AppStyle.StyleMain.flexViewCenter}>
        <ActivityIndicator size={30} color={AppStyle.styleVariable.mainColor} />
    </View>
    if (listComment.length < 1) return <View style={AppStyle.StyleMain.flexViewCenter}>
        <Icon name='comment-processing' size={AppStyle.styleVariable.width100 * 0.2} color='#ddd' />
    </View>
    return (
        <FlatList
            ref = {flatListRef}
            data={listComment}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => <CommentItemForm commentItem={{ ...item }} />
            }
            keyExtractor={(item) => item.commentID}
        />
    )
}))
ListCommentForm.propTypes = {
    listComment: PropTypes.array,
}
export default ListCommentForm;
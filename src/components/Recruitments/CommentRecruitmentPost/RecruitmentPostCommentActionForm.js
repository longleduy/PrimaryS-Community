import React, { memo, useState, useEffect } from 'react';
import { View, TextInput, ActivityIndicator, Image } from 'react-native';
import Ripple from 'react-native-material-ripple';
import { IconButton } from 'react-native-paper';
import PropTypes from 'prop-types';
import ImagePicker from 'react-native-image-picker';
//Todo:Styles
import AppStyle from '../../../theme/index';
//Todo: Graphqls
import { COMMENT_RECRUITMENT_POST_MUTATION } from '../../../graphql/mutations/recruitment_post/recruitmentPostMutation';
import { COMMENT_RECRUITMENT_POST_SUB2 } from '../../../graphql/subscriptions/recruitment_post/recruitmentPostSubscription';
//Todo: RenderProps component
import GraphqlMutationPropRender from '../../utils/HOC_RDP/GraphqlMutationPropRender';

const RecruitmentPostCommentActionForm = memo(props => {
    let { postID, subscribeToMore } = props;
    const [commentRecruitmentPostData, addCommentRecruitmentPost] = useState({
        postID,
        commentContent: '',
        commentImage: null,
        imageInfo: null
    });
    const [formValidate, setFormValidate] = useState({
        isSuccess: null,
        message: null
    })
    const _onChooseImage = () => {
        const options = {
            skipBackup: true,
            path: 'images',
        };
        ImagePicker.launchImageLibrary(options, (response) => {
            if (response.uri) {
                let commentImage = `data:${response.type};base64,${response.data}`;
                addCommentRecruitmentPost({
                    ...commentRecruitmentPostData,
                    commentImage,
                    imageInfo: response
                })
            }
        });
    }
    const _onHandleCommentContent = (comment) => {
        addCommentRecruitmentPost({
            ...commentRecruitmentPostData,
            commentContent: comment
        })
        if (formValidate.isSuccess === false) {
            setFormValidate({
                isSuccess: null,
                message: null
            })
        }
    }
    const _onCancelImage = () => {
        addCommentRecruitmentPost({
            ...commentRecruitmentPostData,
            commentImage: null,
            imageInfo: null
        })
    }
    const _onCommentRecruitmentPost = async (action) => {
        if (commentRecruitmentPostData.commentContent === '' && !commentRecruitmentPostData.commentImage) {
            return setFormValidate({
                isSuccess: false,
                message: 'Yêu cầu nhập bình luận'
            })
        }
        let commentRecruitmentPostDataClone = { ...commentRecruitmentPostData };
        delete commentRecruitmentPostDataClone.imageInfo;
        let result = await action({ variables: { commentRecruitmentPostData: commentRecruitmentPostDataClone } });
        if (result) {
            props.scrollToEnd();
        }
        addCommentRecruitmentPost({
            ...commentRecruitmentPostData,
            commentContent: '',
            commentImage: null,
            imageInfo: null
        })
    }
    useEffect(() => {
        subscribeToMore({
            document: COMMENT_RECRUITMENT_POST_SUB2,
            variables: { postID },
            updateQuery: (prev, result) => {
                let newCommentRecruitmentPost = { ...result.subscriptionData.data.commentRecruitmentPostSub };
                let newListCommentRecruitmentPost = [...prev.getListCommentRecruitmentPost];
                newListCommentRecruitmentPost.push(newCommentRecruitmentPost)
                try {
                    return { getListCommentRecruitmentPost: newListCommentRecruitmentPost }
                } catch (error) { }
            }
        })
    }, [])
    return <GraphqlMutationPropRender mutation={COMMENT_RECRUITMENT_POST_MUTATION}
        graphqlMutationPropRender={(action, { loading }) => (
            <View style={{ paddingBottom: 5, paddingTop: 5, flexDirection: 'column', paddingRight: 15, borderWidth: 0, borderColor: '#ccc' }}>
                <View style={{ alignItems: 'center', paddingBottom: 5, paddingTop: 5, flexDirection: 'row', paddingRight: 15, borderWidth: 0, borderColor: '#ccc' }}>
                    <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'center' }}>
                        <IconButton
                            icon='camera'
                            onPress={_onChooseImage}
                            size={AppStyle.styleVariable.width100 * (2 / 30)}
                            color={AppStyle.styleVariable.actionButtonColor} />
                        <IconButton
                            icon='tag-faces'
                            onPress={() => false}
                            size={AppStyle.styleVariable.width100 * (2 / 30)}
                            color={AppStyle.styleVariable.actionButtonColor} />
                        <IconButton
                            icon='attach-file'
                            onPress={() => false}
                            size={AppStyle.styleVariable.width100 * (2 / 30)}
                            color={AppStyle.styleVariable.actionButtonColor} />
                    </View>
                    <TextInput
                        style={{ borderWidth: formValidate.isSuccess === false ? 1.5 : .5, borderColor: formValidate.isSuccess === false ? 'red' : '#ccc', flex: 3, borderRadius: 5, paddingLeft: 10 }}
                        placeholder={formValidate.isSuccess === false ? formValidate.message : 'Nhập nội dung bình luận...'}
                        placeholderTextColor={formValidate.isSuccess === false ? 'red' : '#aaa'}
                        value={commentRecruitmentPostData.commentContent}
                        onChangeText={e => _onHandleCommentContent(e)}
                        multiline={true} textAlignVertical='top' />
                    {loading ?
                        <ActivityIndicator
                            size={AppStyle.styleVariable.width100 * (2 / 40)}
                            color={AppStyle.styleVariable.mainColor}
                            style={{ position: 'absolute', right: 20 }}
                        /> :
                        <IconButton
                            icon='send'
                            style={{ position: 'absolute', right: 10 }}
                            color={AppStyle.styleVariable.actionButtonColor}
                            size={AppStyle.styleVariable.width100 * (2 / 30)}
                            onPress={() => _onCommentRecruitmentPost(action)}
                        />}
                </View>
                {commentRecruitmentPostData.commentImage && (
                    <Ripple style={{ marginVertical: 5 }} onPress={_onCancelImage}>
                        <Image
                            source={{ uri: commentRecruitmentPostData.commentImage }}
                            style={{
                                marginHorizontal: 15,
                                borderColor: '#ccc', borderWidth: 1, borderRadius: 5,
                                width: commentRecruitmentPostData.imageInfo.height < commentRecruitmentPostData.imageInfo.width ? AppStyle.styleVariable.width100 * 0.5 : AppStyle.styleVariable.width100 * 0.25
                                , height: commentRecruitmentPostData.imageInfo.height < commentRecruitmentPostData.imageInfo.width ? AppStyle.styleVariable.width100 * 0.5 * (commentRecruitmentPostData.imageInfo.height / commentRecruitmentPostData.imageInfo.width) : AppStyle.styleVariable.width100 * 0.25 * (commentRecruitmentPostData.imageInfo.height / commentRecruitmentPostData.imageInfo.width)
                            }}
                        />
                    </Ripple>
                )}
            </View>
        )} />
})
RecruitmentPostCommentActionForm.propTypes = {
    postID: PropTypes.string,
    subscribeToMore: PropTypes.func
}
export default RecruitmentPostCommentActionForm;
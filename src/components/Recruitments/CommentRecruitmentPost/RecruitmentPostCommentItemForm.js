import React, { memo } from 'react';
import { View, Text, Image } from 'react-native';
import { Avatar } from 'react-native-paper';
import AutoHeightImage from 'react-native-auto-height-image';
import PropTypes from 'prop-types';
import AppStyle from '../../../theme/index';
const RecruitmentPostCommentItemForm = memo(props => {
    console.log("RecruitmentPostCommentItemForm");
    let {
        commentContent,
        commentImage,
        commentCreateTime,
        userInfo: { profileName, avatar }
    } = props.commentItem;
    return <View style={{
        flex: 1,
        flexDirection: 'row',
        marginVertical: 5,
        width: AppStyle.styleVariable.width100
    }}>
        <View style={{ alignItems: 'center', marginLeft: 15 }}>
            <Avatar.Image
                size={AppStyle.styleVariable.width100 * (2 / 20)}
                source={{ uri: avatar }}
            />
        </View>
        <View>
            <View style={{
                maxWidth: AppStyle.styleVariable.width100 * (16 / 20),
                backgroundColor: '#eee',
                paddingHorizontal: 10,
                marginHorizontal: 10,
                paddingVertical: 5,
                borderRadius: 20,
                flexWrap: 'wrap'
            }}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{
                        fontSize: 14,
                        fontWeight: 'bold',
                        color: '#333'
                    }}>
                        {profileName}
                    </Text>
                </View>
                <View style={{ justifyContent: 'center', }}>
                    <Text style={{ flexWrap: 'wrap' }}>
                        {commentContent}
                    </Text>
                    {commentImage && commentImage != "null" &&
                        <AutoHeightImage
                            source={{ uri: commentImage }}
                            width={200}
                        />
                    }
                </View>
            </View>
            <Text style={{
                fontSize: 11,
                fontWeight: 'bold',
                paddingHorizontal: 15
            }}>
                {commentCreateTime}
            </Text>
        </View>
    </View>
})
RecruitmentPostCommentItemForm.propTypes = {
    commentItem: PropTypes.object
}
export default RecruitmentPostCommentItemForm;
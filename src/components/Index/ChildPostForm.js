import React, { memo } from 'react';
import { View, Text, Alert } from 'react-native';
import PropTypes from 'prop-types';
import { Avatar, Button, Card, Paragraph, IconButton } from 'react-native-paper';
//Todo: Styles
import AppStyle from '../../theme/index';

const ChildPostForm = memo(props => {
    console.log("ChildPostForm");
    const { item, item: { postID, postTag,interactive:{likes,comments},userInfo:{profileName} }, action,navigation } = props;
    const role = item.interactive.liked ? 'UN_LIKE' : 'LIKE'
    const _onLikeDefaultPost = async (postID, role, action) => {
        let { data } = action({
            variables: {
                likeDefaultPostData: {
                    postID,
                    action: role
                }
            }

        })
    }
    const _onRenderDefaultTag = () => {
        return postTag.map((tag, idx) =>
            <Text style={{
                fontSize: 11,
                marginHorizontal: 3,
                backgroundColor: '#eee',
                paddingVertical: 3,
                paddingHorizontal: 5,
                borderRadius:100
            }} key={idx}>{tag}</Text>
        )
    }
    return (
        <Card style={{ marginBottom: 5 }} elevation={2}>
            <View style={{ position: 'absolute', right: 10, zIndex: 9999 }}>
                <IconButton icon='more-horiz' size={25} onPress={() => Alert.alert('1')} />
            </View>
            <Card.Title title={item.userInfo.profileName} subtitle={`${item.postCreateTime}`}
                left={(props) => <Avatar.Image {...props} source={{ uri: item.userInfo.avatar }} />} />
            <View style={{ flexDirection: 'row', marginBottom: 5, paddingHorizontal: 10 }}>
                {_onRenderDefaultTag()}
            </View>
            {item.postImage && <Card.Cover source={{ uri: item.postImage }} />}
            <Card.Content>
                <Paragraph>{item.postContent}</Paragraph>
            </Card.Content>
            <Card.Actions>
                <Button mode='text'
                    onPress={() => _onLikeDefaultPost(postID, role, action)}
                    uppercase={false}
                    color={item.interactive.liked ? 'green' : AppStyle.styleVariable.mainColor}
                >
                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{item.interactive.liked ? 'Đã thích' : 'Thích'}</Text>
                </Button>
                <Button
                    mode='text'
                    onPress={() => navigation.navigate('CommentStack',{commentStackParams:{
                        postID,likes,profileName,comments
                    }})}
                    uppercase={false}
                    color={AppStyle.styleVariable.mainColor}>
                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{item.interactive.comments} Bình luận</Text>
                </Button>
                <Text style={{ position: 'absolute', bottom: 10, right: 15, fontSize: 12, fontWeight: '500' }}>{item.interactive.likes} lượt thích</Text>
            </Card.Actions>
        </Card>
    )
})
ChildPostForm.propTypes = {
    item: PropTypes.shape({
        userInfo: PropTypes.object.isRequired,
        postContent: PropTypes.string.isRequired,
        postTag: PropTypes.array.isRequired,
        postCreateTime: PropTypes.string.isRequired
    })
}
export default ChildPostForm;
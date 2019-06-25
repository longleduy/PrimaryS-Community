import React, { memo } from 'react';
import { View, Text, Alert } from 'react-native';
import PropTypes from 'prop-types';
import Ripple from 'react-native-material-ripple';
import { Avatar, Button, Card, Paragraph, IconButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
//Todo: Styles
import AppStyle from '../../theme/index';

const ChildPostForm = memo(props => {
    console.log("ChildPostForm");
    const { item, item: { postID, postTag, interactive: { likes, comments, liked }, userInfo: { profileName } }, action, navigation } = props;
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
                borderRadius: 100
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
            <View style={{flexDirection: 'row'}}>
                <View style={{ flexDirection: 'row', marginBottom: 5, paddingHorizontal: 10,flexGrow:1 }}>
                    {_onRenderDefaultTag()}
                </View>
                <Text style={{paddingHorizontal:15,fontSize:12}}>{likes} lượt thích</Text>
            </View>
            {item.postImage && <Card.Cover source={{ uri: item.postImage }} />}
            <Card.Content>
                <Paragraph>{item.postContent}</Paragraph>
            </Card.Content>
            <Card.Actions style={{ justifyContent: 'space-between', marginTop: 5 }}>
                <Ripple
                    rippleDuration={300}
                    rippleColor='green'
                    style={{
                        paddingHorizontal: 10,
                        paddingVertical: 3,
                        justifyContent: 'center',
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}
                    onPress={() => _onLikeDefaultPost(postID, role, action)}>
                    <Icon
                        style={{ marginRight: 5 }}
                        name={liked ? 'star' : 'star-border'}
                        size={AppStyle.styleVariable.width100 * (2 / 35)}
                        color={liked ? 'green' : '#666'} />
                    <Text style={{ fontWeight: 'bold', color: liked ? 'green' : '#666' }}>Thích</Text>
                </Ripple>
                <Ripple
                    rippleDuration={300}
                    rippleColor='green'
                    style={{
                        paddingHorizontal: 10,
                        paddingVertical: 3,
                        flexDirection: 'row',
                        justifyContent: 'center'
                    }}
                    onPress={() => navigation.navigate('CommentStack', {
                        commentStackParams: {
                            postID, likes, profileName, comments
                        }
                    })}>
                    <Text style={{ marginRight: 5, fontWeight: 'bold', color: '#666' }}>{comments}</Text>
                    <MaterialIcon
                        name='comment-text-outline'
                        size={AppStyle.styleVariable.width100 * (2 / 35)}
                        color='#666' />
                </Ripple>
                <Ripple
                    rippleDuration={300}
                    rippleColor='green'
                    style={{
                        paddingHorizontal: 10,
                        paddingVertical: 3,
                        justifyContent: 'center',
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}
                    onPress={() => false}>
                    <MaterialIcon
                        style={{ marginRight: 5 }}
                        name='bell-circle-outline'
                        size={AppStyle.styleVariable.width100 * (2 / 35)}
                        color='#666' />
                    <Text style={{ fontWeight: 'bold', color: '#666' }}>Quan tâm</Text>
                </Ripple>
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
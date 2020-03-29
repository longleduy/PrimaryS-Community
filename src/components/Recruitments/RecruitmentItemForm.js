import React, { memo } from 'react';
import { View, Text } from 'react-native';
import { Avatar, Button, Card, Paragraph, IconButton } from 'react-native-paper';
import Ripple from 'react-native-material-ripple';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
//Todo: Styles
import AppStyle from '../../theme/index';

const RecruitmentItemForm = memo(props => {
    console.log('RecruitmentItemForm');
    const { action, navigation, recruitmentItem: {
        postID,
        postContent,
        postImage,
        postTag,
        role,
        salary,
        number,
        company,
        address,
        emailAddress,
        phoneNumber,
        interactive2: {
            attends,
            attended,
            comments,
        },
        postCreateTime,
        postStatus,
        userInfo: {
            userID,
            profileName,
            avatar,
        }
    } } = props;
    const roleAttend = attended ? 'UN_ATTEND' : 'ATTEND'
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
    const _onRenderRole = () => {
        return role.map((roleItem, idx) =>
            <Text style={{
                fontSize: 12,
                marginHorizontal: 3,
                paddingVertical: 3,
            }} key={idx}>{roleItem}{idx < role.length - 1 ? ',' : ''}</Text>
        )
    }
    const _onAttendPost = async (postID, roleAttend, action) => {
        let { data } = action({
            variables: {
                attendRecruitmentPostData: {
                    postID,
                    action: roleAttend
                }
            }
        })
    }
    return <Card style={{ marginBottom: 10 }} elevation={2}>
        <View style={{
            flex: 1,
            flexDirection: 'row',
            paddingVertical: 5
        }}>
            <View style={{
                flexGrow: 1,
                flexDirection: 'row',
                paddingHorizontal: 15
            }}>
                <Icon
                    name='business-center'
                    size={AppStyle.styleVariable.width100 * (2 / 35)}
                    style={{ marginRight: 5 }}
                    color={AppStyle.styleVariable.mainColor} />
                <View>
                    <Text style={{ color: AppStyle.styleVariable.mainColor }}>
                        {company}
                    </Text>
                    <Text style={{ fontSize: 10 }}>
                        {postCreateTime}
                    </Text>
                </View>
            </View>
            <View style={{
                flexDirection: 'row',
                paddingHorizontal: 10,
                justifyContent: 'flex-end'
            }}>
                <Avatar.Image size={AppStyle.styleVariable.width100 * (2 / 35)}
                    source={{ uri: avatar }}
                    style={{ marginRight: 5 }}
                />
                <Text style={{ fontSize: 12 }}>
                    {profileName}
                </Text>
            </View>
        </View>
        <View style={{ flexDirection: 'row' }}>
            <View style={{
                flexDirection: 'row',
                marginBottom: 5,
                paddingHorizontal: 10,
                flexGrow: 1
            }}>
                {_onRenderDefaultTag()}
            </View>
        </View>
        <View style={{
            flexGrow: 1,
            flexDirection: 'row',
            paddingHorizontal: 15,
            paddingVertical: 3
        }}>
            <View style={{
                flexDirection: 'row',
                flexGrow: 1,
                width:0,flexWrap: 'wrap'
            }}>
                <Text style={{ fontWeight: 'bold' }}>
                    Vị trí:
                    </Text>
                {_onRenderRole()}
            </View>
            <View>
                <Text style={{ color: AppStyle.styleVariable.mainColor }}>{salary}</Text>
            </View>
        </View>
        <View style={{ flexGrow: 1, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, paddingVertical: 3 }}>
            <Text style={{ fontWeight: 'bold' }}>Số lượng: </Text>
            <Text style={{ fontSize: 12 }}>{number}</Text>
        </View>
        <View style={{ flexGrow: 1, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, paddingVertical: 3 }}>
            <Text style={{ fontWeight: 'bold' }}>Địa chỉ: </Text>
            <Text style={{ fontSize: 12 }}>{address}</Text>
        </View>
        {postImage && <Card.Cover source={{ uri: postImage }} />}
        <Card.Content style={{ marginTop: 10 }}>
            <Text>{postContent}</Text>
        </Card.Content>
        <View style={{ flex: 1, flexDirection: 'row', marginTop: 20, paddingHorizontal: 15, }}>
            <View style={{ flex: 2, flexDirection: 'row' }}>
                <Icon
                    name='mail-outline'
                    size={AppStyle.styleVariable.width100 * (2 / 40)}
                    style={{ marginRight: 5 }}
                />
                <Text style={{ fontSize: 12 }}>{emailAddress}</Text>
            </View>
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <Icon
                    name='call'
                    size={AppStyle.styleVariable.width100 * (2 / 40)}
                    style={{ marginRight: 5 }}
                />
                <Text style={{ fontSize: 12 }}>{phoneNumber}</Text>
            </View>
        </View>
        <Card.Actions style={{ justifyContent: 'space-between', marginTop: 5 }}>
            <Ripple
                rippleDuration={300}
                style={{
                    flex: 4,
                    paddingHorizontal: 10,
                    paddingVertical: 3,
                    justifyContent: 'center',
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: postStatus === "Y"?'#f7f6f6':'rgba(228, 40, 101, .1)',
                    borderRadius: 5
                }}
                onPress={() => false}>
                {postStatus === "Y" && <MaterialIcon
                    style={{ marginRight: 5 }}
                    name='file-document-edit-outline'
                    size={AppStyle.styleVariable.width100 * (2 / 40)}
                />}
                <Text style={{ fontWeight: 'bold',color:postStatus === "Y" ?'#666':AppStyle.styleVariable.mainColor }}>{postStatus === "Y" ? "Tạo CV" : "Hết hạn"}</Text>
            </Ripple>
            <Ripple
                rippleDuration={300}
                rippleColor={attended ? 'green' : '#666'}
                style={{
                    flex: 1,
                    paddingHorizontal: 10,
                    paddingVertical: 3,
                    justifyContent: 'center',
                    flexDirection: 'row',
                    alignItems: 'center'
                }}
                onPress={() => _onAttendPost(postID, roleAttend, action)}>
                <Text style={{ marginRight: 5, fontWeight: 'bold', color: attended ? 'green' : '#666' }}>{attends}</Text>
                <MaterialIcon
                    style={{ marginRight: 5 }}
                    name={attended ? 'thumb-up' : 'thumb-up-outline'}
                    size={AppStyle.styleVariable.width100 * (2 / 42)}
                    color={attended ? 'green' : '#666'} />
            </Ripple>
            <Ripple
                rippleDuration={300}
                rippleColor='green'
                style={{
                    flex: 1,
                    paddingHorizontal: 10,
                    paddingVertical: 3,
                    flexDirection: 'row',
                    justifyContent: 'center'
                }}
                onPress={() => navigation.navigate('RecruitmentCommentStack', {
                    recruitmentcommentStackParams: {
                        postID, company, comments, attends
                    }
                })}>
                <Text style={{ marginRight: 5, fontWeight: 'bold', color: '#666' }}>{comments}</Text>
                <MaterialIcon
                    name='comment-text-outline'
                    size={AppStyle.styleVariable.width100 * (2 / 40)}
                    color='#666' />
            </Ripple>
        </Card.Actions>
    </Card>
})
RecruitmentItemForm.propTypes = {
    action: PropTypes.func
}
export default RecruitmentItemForm;
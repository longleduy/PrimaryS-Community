import React, { PureComponent } from 'react';
import { IconButton, Surface } from 'react-native-paper'
import { View, Text, TextInput, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
//Todo: Component
import CommentForm from '../../components/Index/Comment/CommentForm';
//Todo: 
import AppStyle from '../../theme/index';
//Todo: Graphqls
import { GET_LIST_COMMENT_DEFAULT_POST_QUERY } from '../../graphql/querys/default_post/defaultPostQuery';
//Todo: RenderProps component
import GraphqlQueryPropRender from '../../components/utils/HOC_RDP/GraphqlQueryPropRender';

// let listComment = [
//     {
//         commentID: "1559010659649",
//         commentContent: "Question: How do you style the back button?",
//         commentImage: null,
//         commentCreateTime: "2 giờ",
//         userInfo: {
//             userID: "5ccfa1bbb8ff872ef0a2713c",
//             profileName: "Duy Long",
//             avatar: "https://res.cloudinary.com/seatechit/image/upload/v1557370393/g75ni2vbjm0jkdc0ccu7.jpg"
//         }
//     },
//     {
//         commentID: "1559010686647",
//         commentContent: "be as native as possible",
//         commentImage: "https://d2mn9dr0jv4622.cloudfront.net/wp-content/uploads/2018/11/04224608/Flutter-vs-RN-02.png",
//         commentCreateTime: "2 giờ",
//         userInfo: {
//             userID: "5ccfa1bbb8ff872ef0a2713c",
//             profileName: "Khanh Lâm",
//             avatar: "https://res.cloudinary.com/seatechit/image/upload/v1553588356/oqyvdgpoyeebdcjosxtr.jpg"
//         }
//     },
//     {
//         commentID: "1559010699033",
//         commentContent: "Can you set the tintColor and style as a default, instead of redefining for each Screen via,Can you set the tintColor and style as a default, instead of redefining for each Screen viaCan you set the tintColor and style as a default, instead of redefining for each Screen viaCan you set the tintColor and style as a default, instead of redefining for each Screen via ",
//         commentImage: null,
//         commentCreateTime: "2 giờ",
//         userInfo: {
//             userID: "5ccfa1bbb8ff872ef0a2713c",
//             profileName: "Thảo Nguyễn",
//             avatar: null
//         }
//     },
//     {
//         commentID: "1559010979419",
//         commentContent: "@leesolway",
//         commentImage: null,
//         commentCreateTime: "2 giờ",
//         userInfo: {
//             userID: "5ccfa1bbb8ff872ef0a2713c",
//             profileName: "Văn Lâm",
//             avatar: "https://res.cloudinary.com/seatechit/image/upload/v1557462630/y8epxrb4dz1i7qcijl7x.png"
//         }
//     },
//     {
//         commentID: "1559011678280",
//         commentContent: "does the trick to change it",
//         commentImage: null,
//         commentCreateTime: "2 giờ",
//         userInfo: {
//             userID: "5ccfa1bbb8ff872ef0a2713c",
//             profileName: "Duy Long",
//             avatar: "https://res.cloudinary.com/seatechit/image/upload/v1557370393/g75ni2vbjm0jkdc0ccu7.jpg"
//         }
//     },
//     {
//         commentID: "11559010659649",
//         commentContent: "Question: How do you style the back button?",
//         commentImage: null,
//         commentCreateTime: "2 giờ",
//         userInfo: {
//             userID: "5ccfa1bbb8ff872ef0a2713c",
//             profileName: "Duy Long",
//             avatar: "https://res.cloudinary.com/seatechit/image/upload/v1557370393/g75ni2vbjm0jkdc0ccu7.jpg"
//         }
//     },
//     {
//         commentID: "11559010686647",
//         commentContent: "be as native as possible",
//         commentImage: null,
//         commentCreateTime: "2 giờ",
//         userInfo: {
//             userID: "5ccfa1bbb8ff872ef0a2713c",
//             profileName: "Khanh Lâm",
//             avatar: "https://res.cloudinary.com/seatechit/image/upload/v1553588356/oqyvdgpoyeebdcjosxtr.jpg"
//         }
//     },
//     {
//         commentID: "11559010699033",
//         commentContent: "Can you set the tintColor and style as a default, instead of redefining for each Screen via,Can you set the tintColor and style as a default, instead of redefining for each Screen viaCan you set the tintColor and style as a default, instead of redefining for each Screen viaCan you set the tintColor and style as a default, instead of redefining for each Screen via ",
//         commentImage: null,
//         commentCreateTime: "2 giờ",
//         userInfo: {
//             userID: "5ccfa1bbb8ff872ef0a2713c",
//             profileName: "Thảo Nguyễn",
//             avatar: null
//         }
//     },
//     {
//         commentID: "11559010979419",
//         commentContent: "@leesolway",
//         commentImage: null,
//         commentCreateTime: "2 giờ",
//         userInfo: {
//             userID: "5ccfa1bbb8ff872ef0a2713c",
//             profileName: "Văn Lâm",
//             avatar: "https://res.cloudinary.com/seatechit/image/upload/v1557462630/y8epxrb4dz1i7qcijl7x.png"
//         }
//     },
//     {
//         commentID: "11559011678280",
//         commentContent: "does the trick to change it",
//         commentImage: null,
//         commentCreateTime: "2 giờ",
//         userInfo: {
//             userID: "5ccfa1bbb8ff872ef0a2713c",
//             profileName: "Duy Long",
//             avatar: "https://res.cloudinary.com/seatechit/image/upload/v1557370393/g75ni2vbjm0jkdc0ccu7.jpg"
//         }
//     }
// ]
class CommentScreen extends PureComponent {
    static navigationOptions = ({ navigation, screenProps }) => {
        let postInfo = navigation.getParam('commentStackParams', 'NONE');
        return {
            headerTitle: <View style={{ flexDirection: 'row' }}>
                <Text style={{ color: 'white' }}>Bài viết của </Text>
                <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold' }}>{postInfo.profileName}</Text>
            </View>,
            headerRight: <View style={{ paddingRight: 15 }}>
                <Text style={{ color: 'white', fontSize: 12 }}>{postInfo.likes} lượt thích</Text>
            </View>,
            headerTintColor: 'white',
            headerTitleStyle: { color: 'white' },
            headerStyle: {
                backgroundColor: AppStyle.styleVariable.mainColor,
                color: 'white'
            }
        }
    }
    render() {
        let postInfo = this.props.navigation.getParam('commentStackParams', 'NONE');
        return (<GraphqlQueryPropRender
            navigation={this.props.navigation}
            variables={{getListCommentDefaultPostData:{postID:postInfo.postID}}}
            query={GET_LIST_COMMENT_DEFAULT_POST_QUERY}
            queryPropRender={({ loading, data,fetchMore, subscribeToMore }) => {
                return <CommentForm
                    listComment={data}
                    postID={postInfo.postID}
                    subscribeToMore={subscribeToMore}
                    fetchMore={fetchMore}
                    loading={loading}
                    comments={postInfo.comments}
                />
            }} />
        )
    }
}
export default CommentScreen
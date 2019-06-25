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
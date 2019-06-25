import React, { PureComponent } from 'react';
import { View, Text, TextInput, Alert } from 'react-native'
//Todo: Component
import RecruitmentPostCommentForm from '../../components/Recruitments/CommentRecruitmentPost/RecruitmentPostCommentForm';
//Todo: 
import AppStyle from '../../theme/index';
//Todo: Graphqls
import { GET_LIST_COMMENT_RECRUITMENT_POST_QUERY } from '../../graphql/querys/recruitment_post/recruitmentPostQuery';
//Todo: RenderProps component
import GraphqlQueryPropRender from '../../components/utils/HOC_RDP/GraphqlQueryPropRender';

class CommentRecruitmentPostScreen extends PureComponent {
    static navigationOptions = ({ navigation }) => {
        let postInfo = navigation.getParam('recruitmentcommentStackParams', 'NONE');
        return {
            headerTitle: <View style={{ flexDirection: 'row',alignItems:'flex-end' }}>
                <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold' }}>{postInfo.company} </Text>
                <Text style={{ color: 'white' }}>tuyển dụng</Text>
            </View>,
            headerRight: <View style={{ paddingRight: 15 }}>
                <Text style={{ color: 'white', fontSize: 12 }}>{postInfo.attends} người quan tâm</Text>
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
        let postInfo = this.props.navigation.getParam('recruitmentcommentStackParams', 'NONE');
        return (<GraphqlQueryPropRender
            navigation={this.props.navigation}
            variables={{ getListCommentRecruitmentPostData: { postID: postInfo.postID } }}
            query={GET_LIST_COMMENT_RECRUITMENT_POST_QUERY}
            queryPropRender={({ loading, data, fetchMore, subscribeToMore }) => {
                return <RecruitmentPostCommentForm
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
export default CommentRecruitmentPostScreen;
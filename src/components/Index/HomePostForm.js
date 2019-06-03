import React, { PureComponent } from 'react';
import { FlatList, Animated } from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';
//Todo: Component
import ChildPostForm from '../../components/Index/ChildPostForm';
//Todo: GraphQl
import {
    CREATE_DEFAULT_POST_SUB,
    LIKE_DEFAULT_POST_SUB,
    COMMENT_DEFAULT_POST_SUB
} from '../../graphql/subscriptions/default_post/defaultPostSubscription';
import { LIKE_DEFAULT_POST_MUTATION } from '../../graphql/mutations/default_post/defaultPostMutation';
//Todo: PropsRnder
import GraphqlMutationPropRender from '../utils/HOC_RDP/GraphqlMutationPropRender';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
class HomePostForm extends PureComponent {
    componentDidMount() {
        this.props.subscribeToMore({
            document: CREATE_DEFAULT_POST_SUB,
            updateQuery: (prev, result) => {
                let newDefaultPost = { ...result.subscriptionData.data.createDefaultPostSub };
                let newListDefaultPost = [...prev.getListDefaultPost];
                newListDefaultPost.unshift(newDefaultPost)
                try {
                    return { getListDefaultPost: newListDefaultPost }
                } catch (error) { }
            }
        })
        this.props.subscribeToMore({
            document: COMMENT_DEFAULT_POST_SUB,
            updateQuery: (prev, result) => {
                let {postID,comments} = result.subscriptionData.data.commentDefaultPostCountSub
                let defaultPost = _.filter(prev.getListDefaultPost,{postID});
                defaultPost[0].interactive.comments += 1;
                try {
                    return { getListDefaultPost: prev.getListDefaultPost }
                } catch (error) { }
            }
        })
        this.props.subscribeToMore({
            document: LIKE_DEFAULT_POST_SUB,
            updateQuery: (prev, result) => {
                let {postID,count,liked} = result.subscriptionData.data.likeDefaultPostSub
                let defaultPost = _.filter(prev.getListDefaultPost,{postID});
                defaultPost[0].interactive.likes = count;
                defaultPost[0].interactive.liked = liked;
                try {
                    return { getListDefaultPost: prev.getListDefaultPost }
                } catch (error) { }
            }
        })
    }
    render() {
        console.log('HomePostForm');
        const { listDefaultPost,networkStatus,navigation, refetch, collapsible: { paddingHeight, onScroll } } = this.props;
        console.log(networkStatus)
        return (
            <GraphqlMutationPropRender mutation={LIKE_DEFAULT_POST_MUTATION}
                graphqlMutationPropRender={(action) => (
                    <AnimatedFlatList
                        data={listDefaultPost}
                        onRefresh={() => refetch()}
                        refreshing={networkStatus !== 7}
                        showsVerticalScrollIndicator={false}
                        onScroll={onScroll}
                        renderItem={({ item }) => <ChildPostForm
                            item={item}
                            navigation={navigation}
                            likes={item.interactive.likes}
                            action={action} 
                            comments={item.interactive.comments}/>
                        }
                        keyExtractor={(item) => item.postID}
                    />
                )} />
        )
    }
}
HomePostForm.propTypes = {
    listDefaultPost: PropTypes.array
}
export default HomePostForm;

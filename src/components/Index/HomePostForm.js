import React, { PureComponent } from 'react';
import { FlatList, Animated,ActivityIndicator,View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
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

import AppStyle from '../../theme/index';

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
    _onLoadMorePost = () => {
        let lastPostID = (this.props.listDefaultPost[this.props.listDefaultPost.length -1]).postID;
        this.props.fetchMore({
            variables: { lastPostID},
            updateQuery: (previousResult, { fetchMoreResult }) => {
                const prevPostList = previousResult.getListDefaultPost;
                const newListPost = fetchMoreResult.getListDefaultPost;
                return {
                    getListDefaultPost: [...prevPostList,...newListPost]
                }
            }
        })
    }
    _onShowFooter = () => {
        if(this.props.networkStatus === 3){
            return <View style={{height:20,flex:1,justifyContent:'center'}}>
            <ActivityIndicator size={20} color={AppStyle.styleVariable.mainColor} />
          </View>
        }
        return <View style={{height:20,flex:1,alignItems:'center'}}>
            <Icon name='more-horiz' size={20}/>
      </View>;
    }
    render() {
        console.log('HomePostForm');
        const { listDefaultPost,networkStatus,navigation, refetch, collapsible: { paddingHeight, onScroll } } = this.props;
        return (
            <GraphqlMutationPropRender mutation={LIKE_DEFAULT_POST_MUTATION}
                graphqlMutationPropRender={(action) => (
                    <AnimatedFlatList
                        data={listDefaultPost}
                        onRefresh={() => refetch()}
                        refreshing={networkStatus === 4}
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
                        onEndReached={this._onLoadMorePost}
                        onEndReachedThreshold={0.7}
                        ListFooterComponent={this._onShowFooter}
                    />
                )} />
        )
    }
}
HomePostForm.propTypes = {
    listDefaultPost: PropTypes.array
}
export default HomePostForm;

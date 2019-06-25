import React, { memo, useEffect } from 'react';
import { FlatList,ActivityIndicator,View,Text } from 'react-native';
import _ from 'lodash';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import RecruitmentItemForm from './RecruitmentItemForm';
import GraphqlMutationPropRender from '../utils/HOC_RDP/GraphqlMutationPropRender';
import AppStyle from '../../theme/index';
//Todo: GraplQl
import { ATTEND_RECRUITMENT_POST_MUTATION } from '../../graphql/mutations/recruitment_post/recruitmentPostMutation';
//Todo: GraphQl
import { CREATE_RECRUITMENT_POST_SUB, 
    ATTEND_RECRUITMENT_POST_SUB,
    COMMENT_RECRUITMENT_POST_SUB } from '../../graphql/subscriptions/recruitment_post/recruitmentPostSubscription'
const ListRecruitmentForm = memo(props => {
    console.log("ListRecruitmentForm");

    const { listRecruitmentPost, refetch, networkStatus, subscribeToMore, navigation,fetchMore } = props;
    console.log(networkStatus);
    useEffect(() => {
        subscribeToMore({
            document: CREATE_RECRUITMENT_POST_SUB,
            updateQuery: (prev, result) => {
                let newRecruitmentPost = { ...result.subscriptionData.data.createRecruitmentPostSub };
                let newListRecruitmentPost = [...prev.getListRecruitmentPost];
                newListRecruitmentPost.unshift(newRecruitmentPost)
                try {
                    return { getListRecruitmentPost: newListRecruitmentPost }
                } catch (error) { }
            }
        })

        subscribeToMore({
            document: COMMENT_RECRUITMENT_POST_SUB,
            updateQuery: (prev, result) => {
                let { postID } = result.subscriptionData.data.commentRecruitmentPostCountSub
                let recruitmentPost = _.filter(prev.getListRecruitmentPost, { postID });
                recruitmentPost[0].interactive2.comments += 1;
                try {
                    return { getListRecruitmentPost: prev.getListRecruitmentPost }
                } catch (error) { }
            }
        })

        subscribeToMore({
            document: ATTEND_RECRUITMENT_POST_SUB,
            updateQuery: (prev, result) => {
                let { postID, count, attended } = result.subscriptionData.data.attendRecruitmentPostSub
                let recruitmentPost = _.filter(prev.getListRecruitmentPost, { postID });
                recruitmentPost[0].interactive2.attends = count;
                recruitmentPost[0].interactive2.attended = attended;
                try {
                    return { getListRecruitmentPost: prev.getListRecruitmentPost }
                } catch (error) { }
            }
        })
    }, []);
    const _onLoadMorePost = () => {
        let lastPostID = (listRecruitmentPost[listRecruitmentPost.length -1]).postID;
        fetchMore({
            variables: { lastPostID},
            updateQuery: (previousResult, { fetchMoreResult }) => {
                const prevPostList = previousResult.getListRecruitmentPost;
                const newListPost = fetchMoreResult.getListRecruitmentPost;
                return {
                    getListRecruitmentPost: [...prevPostList,...newListPost]
                }
            }
        })
    }
    const _onShowFooter = () => {
        if(networkStatus === 3){
            return <View style={{height:20,flex:1,justifyContent:'center'}}>
            <ActivityIndicator size={20} color={AppStyle.styleVariable.mainColor} />
          </View>
        }
        return <View style={{height:20,flex:1,alignItems:'center'}}>
            <Icon name='more-horiz' size={20}/>
      </View>;
    }
    return (<GraphqlMutationPropRender mutation={ATTEND_RECRUITMENT_POST_MUTATION}
        graphqlMutationPropRender={(action) => (
            <FlatList
                onRefresh={() => refetch()}
                refreshing={networkStatus === 4}
                data={listRecruitmentPost}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => <RecruitmentItemForm
                    recruitmentItem={item}
                    action={action}
                    attends={item.interactive2.attends}
                    comments={item.interactive2.comments}
                    navigation={navigation} />
                }
                onEndReached={_onLoadMorePost}
                onEndReachedThreshold={0.7}
                keyExtractor={(item) => item.postID}
                ListFooterComponent={_onShowFooter}
            />
        )} />
    )
})
ListRecruitmentForm.propTypes = {
    listRecruitmentPost: PropTypes.array,
    refetch: PropTypes.func,
}
export default ListRecruitmentForm;
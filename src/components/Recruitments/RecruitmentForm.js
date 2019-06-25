import React, { memo, useEffect, PureComponent } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import _ from 'lodash';
import { Surface, IconButton } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';
//Todo: Components
import ListRecruitmentForm from './ListRecruitmentForm';
//Todo: Styles
import AppStyle from '../../theme/index';
//Todo: GraphQl
import { CREATE_RECRUITMENT_POST_SUB, ATTEND_RECRUITMENT_POST_SUB } from '../../graphql/subscriptions/recruitment_post/recruitmentPostSubscription'
const RecruitmentForm = memo(props => {
  console.log("RecruitmentForm");
  const { data, isLoading, networkStatus, navigation, subscribeToMore, refetch,fetchMore } = props;
  if (networkStatus === 1) return <View style={AppStyle.StyleMain.flexViewCenter}>
    <ActivityIndicator size={30} color={AppStyle.styleVariable.mainColor} />
  </View>
  return (
    <View style={{ flex: 1 }}>
      <IconButton
        onPress={() => navigation.navigate('CreateRecruitmentPostStack')}
        icon={() => <Icon
          name='file-document-edit-outline'
          size={25}
          color='white' />}
        color={AppStyle.styleVariable.mainColor}
        style={{
          position: 'absolute', bottom: 10, right: 10, zIndex: 99,
          backgroundColor: AppStyle.styleVariable.mainColor, justifyContent: 'center',
          alignItems: 'center', borderRadius: 100, elevation: 5,
          borderColor: 'white', borderWidth: .5, width: 45, height: 45
        }} />
      <ListRecruitmentForm
        listRecruitmentPost={data.getListRecruitmentPost}
        networkStatus={networkStatus}
        navigation={navigation}
        refetch={refetch}
        subscribeToMore={subscribeToMore}
        fetchMore={fetchMore}
      />
    </View>

  )
})
RecruitmentForm.propTypes = {
  navigation: PropTypes.object,
  data: PropTypes.object,
  isLoading: PropTypes.bool,
}
export default RecruitmentForm;

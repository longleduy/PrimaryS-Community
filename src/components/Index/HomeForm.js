import React, { memo, useEffect } from 'react';
import { View, Text, ActivityIndicator, TouchableWithoutFeedback } from 'react-native';
import { Surface, IconButton } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';
import HomePostForm from './HomePostForm';
import AppStyle from '../../theme/index';
const HomeForm = memo(props => {
  console.log("HomeForm");
  const { data,
    loading,
    networkStatus,
    collapsible,
    navigation,
    subscribeToMore,
    refetch, 
    fetchMore,
    collapsible: { paddingHeight, onScroll } } = props;
  if (networkStatus === 1) return <View style={AppStyle.StyleMain.flexViewCenter}>
    <ActivityIndicator size={30} color={AppStyle.styleVariable.mainColor} />
  </View>
  return (
    <View style={{ flex: 1 }}>
      <IconButton
        onPress={() => navigation.navigate('CreatePost')}
        icon={() => <Icon name='file-document-edit-outline' size={25} color='white' />} color={AppStyle.styleVariable.mainColor} style={{
          position: 'absolute', bottom: 10, right: 10, zIndex: 99,
          backgroundColor: AppStyle.styleVariable.mainColor, justifyContent: 'center',
          alignItems: 'center', borderRadius: 100, elevation: 5,
          borderColor: 'white', borderWidth: .5, width: 45, height: 45
        }} />
      <Surface style={{
        elevation: 2,
        height: paddingHeight,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: AppStyle.styleVariable.mainColor
      }}>
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>Thảo luận</Text>
      </Surface>
      <HomePostForm
        collapsible={collapsible}
        networkStatus={networkStatus}
        navigation={navigation}
        refetch={refetch}
        listDefaultPost={data.getListDefaultPost}
        subscribeToMore={subscribeToMore} 
        fetchMore={fetchMore}/>
    </View>
  )
})
HomeForm.propTypes = {
  navigation: PropTypes.object,
  collapsible: PropTypes.object,
  data: PropTypes.object,
  isLoading: PropTypes.bool
}
export default HomeForm;

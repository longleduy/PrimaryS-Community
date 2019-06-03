import React, { PureComponent,Component } from 'react';
import { View, ActivityIndicator, BackHandler, Text, Dimensions, TextInput, TouchableWithoutFeedback } from 'react-native';
import { withNavigation } from 'react-navigation';
import { withApollo } from 'react-apollo';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { withCollapsible } from 'react-navigation-collapsible';
import { Avatar } from 'react-native-paper';
import HomeForm from '../../components/Index/HomeForm';
import { handleBackButton } from '../../untils/validator';
import AppStyle from '../../theme/index';
//Todo: Graphqls
import { GET_LIST_DEFAULT_POST_QUERY } from '../../graphql/querys/default_post/defaultPostQuery';
//Todo: LocalState GraphQL
import { QUERY_USER_INFO } from '../../graphql/localStates/query';
//Todo: RenderProps component
import GraphqlQueryPropRender from '../../components/utils/HOC_RDP/GraphqlQueryPropRender';

let width = Dimensions.get('window').width
class HomeScreen extends PureComponent {
  _didFocus;
  _didBlur;
  state = {
    isLoading: false
  }
  static navigationOptions = ({ navigation, screenProps }) => {
    let userInfo;
    let client;
    try {
      client = navigation.state.params;
      userInfo = navigation.state.params.userInfo;
    } catch (error) { }
    return {
      headerTitle: <View
        style={AppStyle.StyleHeader.headerView}>
        <View style={{ flex: 1 }}>
          <Icon name='bubble-chart' size={40} color={AppStyle.styleVariable.mainColor} />
        </View>
        <TouchableWithoutFeedback onPress={() => navigation.navigate('HomeSearch')}>
          <View style={AppStyle.StyleHeader.headerSearchView}>
            <TextInput placeholder='Tìm kiếm'
              editable={false}
              placeholderTextColor='#777'
              style={AppStyle.StyleHeader.headerSearchTextInput} />
            <Icon name='search' size={width * (1 / 13)}
              style={AppStyle.StyleHeader.headerSearchIcon} />
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => navigation.navigate("UserProfileStack", {
          profileData:
          {
            userInfo: userInfo.data.queryUserInfo,
            client
          }
        })} >
          <View style={AppStyle.StyleHeader.headerSearchAvatar}>
            <Avatar.Image size={width * (1 / 12)}
              source={userInfo && userInfo.data ? { uri: userInfo.data.queryUserInfo.avatar } : { uri: null }}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>,
      headerStyle: {
        backgroundColor: 'white',
        elevation: 2
      }
    }
  }
  constructor(props) {
    super(props);
  }
  componentWillMount = async () => {
    this.props.navigation.setParams({ client: this.props.client });
    const userInfo = await this.props.client.query({
      query: QUERY_USER_INFO
    })
    this.props.navigation.setParams({ userInfo })

  }
  componentDidMount() {
    this._didFocus = this.props.navigation.addListener('didFocus', () => {
      BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    });
    this._didBlur = this.props.navigation.addListener('didBlur', () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    })
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    this._didFocus.remove();
    this._didBlur.remove();
  }
  render() {
    console.log('HomeScreen');
    let isLoading = true;
    if (this.props.navigation.state.params && this.props.navigation.state.params.headerHeight) {
      isLoading = false;
    }
    if (isLoading) return <View style={AppStyle.StyleMain.flexViewCenter}>
      <ActivityIndicator size={30} color={AppStyle.styleVariable.mainColor} />
    </View>
    return (
      <GraphqlQueryPropRender
        navigation={this.props.navigation}
        query={GET_LIST_DEFAULT_POST_QUERY}
        queryPropRender={({ loading, data,networkStatus, refetch,subscribeToMore }) => {
          return <HomeForm
            navigation={this.props.navigation}
            networkStatus={networkStatus}
            refetch={refetch}
            collapsible={this.props.collapsible}
            data={data}
            isLoading={loading} 
            subscribeToMore={subscribeToMore}/>
        }} />
    )
  }
}
export default withApollo(withNavigation(withCollapsible(HomeScreen)));
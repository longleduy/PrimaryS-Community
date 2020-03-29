import React, { PureComponent } from 'react';
import {Surface} from 'react-native-paper'
import { View,TextInput} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
//Todo: Components
import ChatMessageNotificationForm from '../../components/Messages/ChatMessageNotificationForm';
import GraphqlMutilQueryPropRender from '../../components/utils/HOC_RDP/GraphqlMutilQueryPropRender';
//Todo: Styles
import AppStyle from '../../theme/index';
//Todo: GraphQLs
import {GET_CHAT_MESSAGE_NOTIFICATION_QUERY} from '../../graphql/querys/notifications/notificationQuery';
//Todo: LocalState GraphQL
import { QUERY_USER_INFO } from '../../graphql/localStates/query';

class ChatMessageNotificationScreen extends PureComponent {
    static navigationOptions = ({ navigation, screenProps }) => {
        return {
            headerTitle: 
            <View style={AppStyle.StyleMain.flexViewCenter}><Surface
                style={[AppStyle.StyleHeader.headerSearch2]}>
                <TextInput placeholder='Tìm kiếm'
                    placeholderTextColor='#777'
                    style={[AppStyle.StyleHeader.headerSearch3TextInput]} />
                <Icon name='search' size={AppStyle.styleVariable.width100 * (1 / 14)}
                    style={AppStyle.StyleHeader.headerSearch2Icon} />
            </Surface></View>,
            headerStyle: {
                borderBottomWidth: 0,
                elevation: 0,
                backgroundColor:'transparent'
              },
              //headerTransparent:true
        }
    }
    render() {
        return (
            <GraphqlMutilQueryPropRender
                navigation={this.props.navigation}
                query1={GET_CHAT_MESSAGE_NOTIFICATION_QUERY}
                query2={QUERY_USER_INFO}
                queryPropRender={({ loading1, data1,loading2,data2, networkStatus, refetch, subscribeToMore, fetchMore }) => {
                    return <ChatMessageNotificationForm
                        navigation={this.props.navigation}
                        networkStatus={networkStatus}
                        refetch={refetch}
                        data={data1}
                        data2={data2}
                        loading={loading1}
                        loading2 = {loading2}
                        subscribeToMore={subscribeToMore}
                        fetchMore={fetchMore} />
                }} />
        )
    }
}
export default ChatMessageNotificationScreen
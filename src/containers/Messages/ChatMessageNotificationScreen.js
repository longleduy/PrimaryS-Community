import React, { PureComponent } from 'react';
import {Surface} from 'react-native-paper'
import { View,TextInput} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
//Todo: Components
import ChatMessageNotificationForm from '../../components/Messages/ChatMessageNotificationForm';
import GraphqlQueryPropRender from '../../components/utils/HOC_RDP/GraphqlQueryPropRender';
//Todo: Styles
import AppStyle from '../../theme/index';
//Todo: GraphQLs
import {GET_CHAT_MESSAGE_NOTIFICATION_QUERY} from '../../graphql/querys/notifications/notificationQuery';

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
            <GraphqlQueryPropRender
                navigation={this.props.navigation}
                query={GET_CHAT_MESSAGE_NOTIFICATION_QUERY}
                queryPropRender={({ loading, data, networkStatus, refetch, subscribeToMore, fetchMore }) => {
                    return <ChatMessageNotificationForm
                        navigation={this.props.navigation}
                        networkStatus={networkStatus}
                        refetch={refetch}
                        data={data}
                        loading={loading}
                        subscribeToMore={subscribeToMore}
                        fetchMore={fetchMore} />
                }} />
        )
    }
}
export default ChatMessageNotificationScreen
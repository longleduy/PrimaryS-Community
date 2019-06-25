import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import { Avatar, IconButton, Surface } from 'react-native-paper';
//Todo: Components
import ChatMessageForm from '../../components/Messages/ChatMessageForm';
import GraphqlQueryPropRender from '../../components/utils/HOC_RDP/GraphqlQueryPropRender';
//Todo: Styles
import AppStyle from '../../theme/index';
//Todo: GraphQLs
import {GET_LIST_CHAT_MESSAGE_QUERY} from '../../graphql/querys/chat_message/chatMessageQuery';



export default class ChatMessageScreen extends PureComponent {
    static navigationOptions = ({ navigation }) => {
        const formUser = navigation.getParam('chatStackFrom', 'NONE');
        return {
            headerLeft: <View style={[AppStyle.StyleMain.flexViewCenter, { width:AppStyle.styleVariable.width100 }]}>
                <IconButton
                    icon='clear'
                    size={AppStyle.styleVariable.width100 * (1 / 15)}
                    style={{ position: 'absolute', right: 0 }}
                    onPress={() => navigation.goBack()} color='#808080' />
                <View style={{
                    position: 'absolute',
                    left: 15, flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 17 }}>{formUser.profileName}</Text>

                </View>
                <View style={[AppStyle.StyleMain.flexViewCenter, { padding: 5 }]}>
                    <Surface style={{
                        borderColor: '#ddd',
                        elevation: 0,
                        borderWidth: 2,
                        borderRadius: 100,
                        position: 'absolute',
                        bottom: -AppStyle.styleVariable.width100 * (1 / 16)
                    }}>
                        <Avatar.Image size={AppStyle.styleVariable.width100 * (1 / 8)}
                            source={{ uri: formUser.avatar }}
                        />
                    </Surface>
                </View>
            </View>,
            headerTransparent: true
        }
    }
    render() {
        const { avatar,userID } = this.props.navigation.getParam('chatStackFrom', 'NONE');
        return (
            <GraphqlQueryPropRender
                navigation={this.props.navigation}
                query={GET_LIST_CHAT_MESSAGE_QUERY}
                variables={{chanelIDData:{to:userID}}}
                queryPropRender={({ loading, data, subscribeToMore, fetchMore }) => {
                    return <ChatMessageForm
                        avatar={avatar}
                        navigation={this.props.navigation}
                        data={data}
                        loading={loading}
                        subscribeToMore={subscribeToMore}
                        fetchMore={fetchMore} />
                }} />
        )
    }
}
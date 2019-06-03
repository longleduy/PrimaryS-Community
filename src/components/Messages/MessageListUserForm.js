import React, { Component, PureComponent } from 'react';
import { View, Text, BackHandler, Alert, FlatList, ActivityIndicator, Dimensions } from 'react-native'
import { Avatar, Button, Card, Title, Paragraph, IconButton } from 'react-native-paper';
import PropTypes from 'prop-types'
import AppStyle from '../../theme/index'
import Icon from 'react-native-vector-icons/MaterialIcons';
import MessageForm from './MessageForm'
let width = Dimensions.get('window').width;
class MessageListUserForm extends PureComponent {
    render() {
        if (this.props.isLoading) return <View style={AppStyle.StyleMain.flexViewCenter}>
            <ActivityIndicator size={30} color={AppStyle.styleVariable.mainColor} />
        </View>
        return (
            <FlatList
                data={this.props.listMessageUser}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => <MessageForm item={{ ...item }} navigation = {this.props.navigation}/>
                }
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingBottom: 60 }}
                style={{ paddingTop: 60 }}
            />
        )
    }
}
MessageListUserForm.propTypes = {
    listMessageUser: PropTypes.array
}
export default MessageListUserForm;
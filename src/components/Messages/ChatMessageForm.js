import React, { memo } from 'react';
import { View, FlatList, ActivityIndicator, Text } from 'react-native';
import PropTypes from 'prop-types';
//Todo: Styles
import AppStyle from '../../theme/index';
//Todo: Components
import ChatMessageItemForm from './ChatMessageItemForm';

const ChatMessageForm = memo(props => {
    let { data: { getListChatMessage }, loading, avatar, networkStatus, loadingOne } = props;
    if (networkStatus === 1 || loadingOne) return <View style={AppStyle.StyleMain.flexViewCenter}>
        <ActivityIndicator size={30} color={AppStyle.styleVariable.mainColor} />
    </View>
    return (
            <FlatList
                data={getListChatMessage}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => <ChatMessageItemForm
                    item={item}
                    avatar={avatar}
                    preItemFormID={index !== 0 ? getListChatMessage[index - 1].from : 0}
                    nextItemFormID={index === getListChatMessage.length - 1 ? 9999 : getListChatMessage[index + 1].from}
                />
                }
                keyExtractor={(item) => item.messageID}
                style={{ marginTop: 100 }}
            //contentContainerStyle={{paddingBottom:60}}
            />
    )
})
ChatMessageForm.propTypes = {
    loading: PropTypes.bool,
    avatar: PropTypes.string
}
export default ChatMessageForm;
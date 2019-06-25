import React, { memo } from 'react';
import { View, Text } from 'react-native';
import Ripple from 'react-native-material-ripple';
import PropTypes from 'prop-types';
import { Avatar } from 'react-native-paper';

import AppStyle from '../../theme/index';

const ChatMessageItemForm = memo(props => {
    let { item: { userID, from, to, messageContent, messageImage, chatTime }, avatar, preItemFormID, nextItemFormID } = props;
    let isGroup = preItemFormID === 0 || (preItemFormID !== 0 && preItemFormID !== from);
    let isShowLastTime = nextItemFormID === 9999 || nextItemFormID !== from;
    return <View>
        {userID !== from
            ?
            <View
                style={{
                    marginBottom: 2,
                    marginTop: isGroup && preItemFormID !== 0 ? 30 : 5,
                    paddingLeft: 15,
                    flexDirection: 'row'
                }}
                onPress={this._onShowTime}>
                {isGroup &&
                    <Avatar.Image
                        source={{ uri: avatar }}
                        size={20} />
                }
                <View
                    style={{
                        maxWidth: AppStyle.StyleMain.width100 * 0.8,
                        marginLeft: isGroup ? 10 : 30,

                    }}>
                    <Ripple style={{ backgroundColor: '#eee', borderRadius: 5 }}>
                        <Text style={{ padding: 5 }}>
                            {messageContent}
                        </Text>
                    </Ripple>
                    {(nextItemFormID === 9999 || nextItemFormID !== from) && <Text style={{
                        paddingLeft: 5,
                        paddingRight: 5,
                        fontSize: 11,
                        fontWeight: 'bold'
                    }}>
                        {chatTime}
                    </Text>}
                </View>
            </View>
            :
            <View style={{
                justifyContent: 'flex-end',
                marginBottom: 2,
                marginTop: 2,
                paddingRight: 15,
                flexDirection: 'row'
            }}>
                <View
                    style={{
                        maxWidth: AppStyle.StyleMain.width100 * 0.8,
                    }}>
                    <Ripple style={{ backgroundColor: '#4545ff', borderRadius: 5 }}>
                        <Text style={{ padding: 5, color: 'white' }}>
                            {messageContent}
                        </Text>
                    </Ripple>
                    {isShowLastTime && <Text style={{
                        paddingLeft: 5,
                        paddingRight: 5,
                        fontSize: 11,
                        fontWeight: 'bold',
                        color:'#4545ff',
                        textAlign:'right'
                    }}>
                        {chatTime}
                    </Text>}
                </View>
            </View>}
    </View>
})
ChatMessageItemForm.propTypes = {
    // item: PropTypes.shape({
    //     userInfo: PropTypes.object.isRequired,
    //     postContent: PropTypes.string.isRequired,
    //     postTag: PropTypes.array.isRequired,
    //     postCreateTime: PropTypes.string.isRequired
    // })
}
export default ChatMessageItemForm;
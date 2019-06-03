import React, { PureComponent } from 'react';
import { View, FlatList, ActivityIndicator, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import AppStyle from '../../theme/index';
import FriendForm from './FriendForm';

class FriendListForm extends PureComponent {
    render() {
        if (this.props.isLoading) return <View style={AppStyle.StyleMain.flexViewCenter}>
            <ActivityIndicator size={30} color={AppStyle.styleVariable.mainColor} />
        </View>
        return (
            <FlatList
                data={this.props.listFriend}
                showsVerticalScrollIndicator={false}
                numColumns={2}
                renderItem={({ item,index }) => <FriendForm item={{ ...item }} />
                }
                keyExtractor={(item) => item.userId}
                key={(item) => item.userId}
                contentContainerStyle={{ paddingBottom: 60 }}
                style={{ paddingTop: 60 }}
            />
        )
    }
}
FriendListForm.propTypes = {
    listFriend: PropTypes.array
}
export default FriendListForm;
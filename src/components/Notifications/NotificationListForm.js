import React, { Component, PureComponent } from 'react';
import { View, Text, BackHandler, Alert, FlatList, ActivityIndicator, Dimensions } from 'react-native'
import { Button } from 'react-native-paper';
import PropTypes from 'prop-types'
import AppStyle from '../../theme/index'
import Icon from 'react-native-vector-icons/MaterialIcons';
import NotificationForm from './NotificationForm'
let width = Dimensions.get('window').width;
class NotificationListForm extends PureComponent {
    state = {
        status: 'checked',
    };
    renderHeader = () => {
        return <View style={{flexDirection:'row'}}>
            <Button mode="text" onPress={() => console.log('Pressed')}>
                Tất cả
            </Button>
            <Button mode="text" onPress={() => console.log('Pressed')}>
                Tất cả
            </Button>
            <Button mode="text" onPress={() => console.log('Pressed')}>
                Tất cả
            </Button>
        </View>
    }
    render() {
        if (this.props.isLoading) return <View style={AppStyle.StyleMain.flexViewCenter}>
            <ActivityIndicator size={30} color={AppStyle.styleVariable.mainColor} />
        </View>
        return (
            <View>
                {/* <View style={{ backgroundColor: 'red' }}>
                    <Button mode="text" onPress={() => console.log('Pressed')}>
                        Press me
                    </Button>
                </View> */}
                <FlatList
                    data={this.props.listNotification}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => <NotificationForm item={{ ...item }} />
                    }
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={{ paddingBottom: 10 }}
                    style={{ paddingTop: 10 }}
                    ListHeaderComponent={() => <View style={{flexDirection:'row',
                    justifyContent:'center',
                    borderBottomColor:'#ccc',
                    paddingBottom:5,
                    marginBottom:5,
                    borderBottomWidth:.5}}>
                    <Button mode="text" color='green' style={{backgroundColor:'#00800057',paddingLeft:2,paddingRight:2}} onPress={() => console.log('Pressed')}>
                        Tất cả
                    </Button>
                    <Button mode="text" color='#666' style={{paddingLeft:2,paddingRight:2}} onPress={() => console.log('Pressed')}>
                        Trường học
                    </Button>
                    <Button mode="text" color='#666' style={{paddingLeft:2,paddingRight:2}} onPress={() => console.log('Pressed')}>
                        Lớp học
                    </Button>
                    <Button mode="text" color='#666' style={{paddingLeft:2,paddingRight:2}} onPress={() => console.log('Pressed')}>
                        Khác
                    </Button>
                </View>}
                />
            </View>
        )
    }
}
NotificationListForm.propTypes = {
    listNotification: PropTypes.array
}
export default NotificationListForm;
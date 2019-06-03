import React, { Component, PureComponent } from 'react';
import { View, Text, Alert,Button } from 'react-native';
import Ripple from 'react-native-material-ripple';
import { Avatar } from 'react-native-paper';
import AppStyle from '../../theme/index'
let group = null;
export default class ChatForm extends Component {
    state = {
        isShowTime : false
    }
    shouldComponentUpdate(nextProps, nextState){
        if(this.state != nextState) return true
        return false
    }
    _onShowTime = () => {
        this.setState ({
            isShowTime: true
        })
    }
    render() {
        const {item} = this.props;
        if(!this.state.isShowTime){
            if(item.from === '1'){
                if(group == null || group % 2 == 0){
                    group = 1
                }
                else if(group != null && group % 2 != 0){
                    group = group + 2
                }
            }
            else{
                if(group == null || group % 2 != 0){
                    group = 2
                }
                else if(group != null && group % 2 == 0){
                    group = group + 2
                }
            }
        }
        return (
            <View>
              {item.from === '1' ? <View style={{marginBottom:2,marginTop:group == 1?15:2,paddingLeft:15,flexDirection:'row'}} onPress = {this._onShowTime}>
              {group == 1 && <Avatar.Image source={{ uri: this.props.avatar }} size={20}/>}
                    <View style={{ backgroundColor: '#eee',maxWidth: AppStyle.StyleMain.width100 * 0.8,borderRadius:5,marginLeft:group == 1?5:25 }}>
                    <Ripple onPress={this._onShowTime}><Text style={{padding:5}}>{item.messageContent}</Text></Ripple>
                        {this.state.isShowTime && <Text style={{paddingLeft:5,paddingRight:5,fontSize:12,paddingBottom:5,fontWeight:'bold'}}>{item.messageSendTime}</Text>}
                    </View>
                    
                </View>:
                <View style={{ justifyContent: 'flex-end',marginBottom:2,marginTop:group == 2?15:2,paddingRight:15,flexDirection:'row' }}>
                    <View style={{ backgroundColor: '#4545ff',maxWidth: AppStyle.StyleMain.width100 * 0.8,borderRadius:5 }}>
                        <Text style={{padding:5,color:'white'}}>{item.messageContent}</Text>
                    </View>
                </View>}
            </View>
        )
    }
}
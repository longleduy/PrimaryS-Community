import React, { PureComponent } from 'react';
import { View, Text, ScrollView } from 'react-native';
import {withApollo} from 'react-apollo';
import Ripple from 'react-native-material-ripple';
import { MainDefaultPostForm } from './CreatePostDefault/MainDefaultPostForm';
import { RecruitmentPostForm } from './RecruitmentPost/RecruitmentPostForm'
import AppStyle from '../../../theme/index';
import {CreatePostContext} from './CreatePostProvider';

class CreatePostForm extends PureComponent {
    //static contextType = CreatePostContext;
    state = {
        roleForm: ''
    };
    _onCreatePost = () => {
        const {postDefaultData} = this.context;
        let imageBase64;
        if(postDefaultData.postImage){
            imageBase64 = `data:${postDefaultData.postImage.type};base64,${postDefaultData.postImage.data}`;
        }
        const postData = {
            ...postDefaultData,
            postImage: imageBase64
        }
        console.log(postData);
    }
    componentDidMount = () => {
        setTimeout(() => {
            this.setState({
                roleForm: 'TL'
            })
        },1)

        this.props.navigation.setParams({ _onCreatePost: this._onCreatePost });
    }
    _onSwitchRolePostForm = (role) => {
        this.setState({
            roleForm: role
        })
    }
    render() {
        if(this.state.roleForm === '') return <View></View>
        return (
            <ScrollView style={{ flex: 1}} showsVerticalScrollIndicator={false}>
            <View style={{paddingVertical:15}}>
                <View style={{ paddingLeft: 15 }}>
                    <View style={AppStyle.StyleCreatePost.postRoleView}>
                        <Ripple
                            rippleColor='green'
                            disabled={this.state.roleForm === 'TL'}
                            style={this.state.roleForm === 'TL' ? AppStyle.StyleCreatePost.postRoleButtonActive : AppStyle.StyleCreatePost.postRoleButtonNotActive}
                            onPress={() => this._onSwitchRolePostForm('TL')}>
                            <Text style={this.state.roleForm === 'TL' ? AppStyle.StyleCreatePost.postRoleButtonTextActv : AppStyle.StyleCreatePost.postRoleButtonText}>Tạo cuộc thảo luận</Text>
                        </Ripple>
                        <Ripple
                            rippleColor='green'
                            disabled={this.state.roleForm === 'TD'}
                            style={this.state.roleForm === 'TD' ? AppStyle.StyleCreatePost.postRoleButtonActive : AppStyle.StyleCreatePost.postRoleButtonNotActive}
                            onPress={() => this._onSwitchRolePostForm('TD')}
                        >
                            <Text style={this.state.roleForm === 'TD' ? AppStyle.StyleCreatePost.postRoleButtonTextActv : AppStyle.StyleCreatePost.postRoleButtonText}>Đăng tin tuyển dụng</Text>
                        </Ripple>
                    </View>
                </View>
                {this.state.roleForm === 'TL' && <MainDefaultPostForm />}
                {this.state.roleForm === 'TD' && <RecruitmentPostForm />}
                </View>
            </ScrollView>
        )
    }
}
CreatePostForm.contextType = CreatePostContext;

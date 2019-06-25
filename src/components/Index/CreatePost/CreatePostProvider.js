import React, { PureComponent, createContext, Fragment } from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { withApollo } from 'react-apollo';
import { IconButton } from 'react-native-paper'
import dismissKeyboard from 'react-native/Libraries/Utilities/dismissKeyboard';
import { MainDefaultPostForm } from './CreatePostDefault/MainDefaultPostForm';
import AppStyle from '../../../theme/index';
//Todo: Componet
import { MySnackBar } from '../../utils/MySnackbar';
//Todo: Contains
import { POST_CONTENT_EMPTY, POST_TAG_EMPTY } from '../../../untils/contains/defaultPostContain';
//Todo: GraphQl
import { CREATE_DEFAULT_POST_MUTATION } from '../../../graphql/mutations/default_post/defaultPostMutation'

export const CreatePostContext = createContext()
export default class CreatePostProvider extends PureComponent {
    state = {
        postDefaultData: {
            postContent: null,
            isComment: true,
            isPublic: true,
            postImage: null,
            postTag: ['React Native']
        },
        _onChangeCheckBox: (role) => {
            if (role === 'CK') {
                this.setState({
                    postDefaultData: {
                        ...this.state.postDefaultData,
                        isPublic: !this.state.postDefaultData.isPublic
                    }

                })
            }
            else if (role === 'BL') {
                this.setState({
                    postDefaultData: {
                        ...this.state.postDefaultData,
                        isComment: !this.state.postDefaultData.isComment
                    }
                })
            }
        },
        _onHandlePostContent: text => {
            this.setState({
                postDefaultData: {
                    ...this.state.postDefaultData,
                    postContent: text
                }
            })
        },
        _onSetPostImage: (data) => {
            this.setState({
                postDefaultData: {
                    ...this.state.postDefaultData,
                    postImage: data
                }
            })
        },
        _onSetPostTag: (selectedItems) => {
            this.setState({
                postDefaultData: {
                    ...this.state.postDefaultData,
                    postTag: selectedItems
                }
            })
        }
    }
    render() {
        return <CreatePostContext.Provider value={this.state}>
            <CreatePostFormHOC navigation={this.props.navigation} />
        </CreatePostContext.Provider>
    }
}
class CreatePostForm extends PureComponent {
    //static contextType = CreatePostContext;
    state = {
        roleForm: '',
        isLoading: false,
        snackBar: {
            visible: false,
            color: AppStyle.styleVariable.mainColor,
            actionLabel: 'Hủy',
            message: ''
        }
    };
    componentDidMount = () => {
        setTimeout(() => {
            this.setState({
                roleForm: 'TL'
            })
        }, 10)
    }
    _onSwitchRolePostForm = (role) => {
        this.setState({
            roleForm: role
        })
    }
    _onDismissSnackBar = () => {
        this._onHandleSnackBar();
    }
    _onSnackBarAction = () => {
        this._onHandleSnackBar();
    }
    _onHandleSnackBar = (visible = false, color = AppStyle.styleVariable.mainColor, actionLabel = 'Hủy', message = null) => {
        this.setState({
            snackBar: {
                visible,
                color,
                actionLabel,
                message
            }
        })
    }
    _onCreatePost = async () => {
        dismissKeyboard();
        const { postDefaultData } = this.context;
        if (!postDefaultData.postContent) return this._onHandleSnackBar(true, AppStyle.styleVariable.mainColor, 'Hủy', POST_CONTENT_EMPTY);
        if (postDefaultData.postTag.length === 0) return this._onHandleSnackBar(true, AppStyle.styleVariable.mainColor, 'Hủy', POST_TAG_EMPTY);
        let imageBase64;
        if (postDefaultData.postImage) {
            imageBase64 = `data:${postDefaultData.postImage.type};base64,${postDefaultData.postImage.data}`;
        }
        const defaultPostData = {
            ...postDefaultData,
            postImage: imageBase64
        }
        this.props.navigation.setParams({ _isHiddenHeaderBar: true });
        let { data } = await this.props.client.mutate({
            variables: { defaultPostData },
            mutation: CREATE_DEFAULT_POST_MUTATION
        })
        this.props.navigation.goBack();
    }
    render() {
        const { isLoading, roleForm, snackBar: { visible, color, actionLabel, message } } = this.state;
        if (roleForm === '') return <View></View>
        return (
            <Fragment>
                {visible && <MySnackBar
                    color={color}
                    visible={visible}
                    actionLabel={actionLabel}
                    message={message}
                    _onDismissSnackBar={this._onDismissSnackBar}
                    _onSnackBarAction={this._onSnackBarAction}
                />}
                {isLoading && <View style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                    backgroundColor: '#00000080',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 9999999
                }}>
                    <ActivityIndicator color='white' size='large' />
                </View>
                }
                <IconButton
                    onPress={this._onCreatePost}
                    icon='done' color='white' size={25} style={{
                        position: 'absolute', bottom: 15, right: 15, zIndex: 99,
                        backgroundColor: AppStyle.styleVariable.mainColor, justifyContent: 'center',
                        alignItems: 'center', borderRadius: 100, elevation: 5,
                        borderColor: 'white', borderWidth: .5, width: 45, height: 45
                    }} />
                <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                    <View style={{ paddingVertical: 15 }}>
                        {this.state.roleForm === 'TL' && <MainDefaultPostForm />}
                    </View>
                </ScrollView>
            </Fragment>
        )
    }
}
CreatePostForm.contextType = CreatePostContext;
const CreatePostFormHOC = withApollo(CreatePostForm);


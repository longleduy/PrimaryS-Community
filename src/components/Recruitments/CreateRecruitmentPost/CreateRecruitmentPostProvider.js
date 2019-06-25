import React, { PureComponent, createContext, Fragment } from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { withApollo } from 'react-apollo';
import { IconButton } from 'react-native-paper'
import Ripple from 'react-native-material-ripple';
import dismissKeyboard from 'react-native/Libraries/Utilities/dismissKeyboard';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RecruitmentPostForm } from './RecruitmentPostStep1Form';
import { RecruitmentPostForm2 } from './RecruitmentPostStep2Form';
import { RecruitmentPostForm3 } from './RecruitmentPostStep3Form';
import { RecruitmentPostForm4 } from './RecruitmentPostStep4Form';
import AppStyle from '../../../theme/index';
//Todo: Componet
import { MySnackBar } from '../../utils/MySnackbar';
import GraphqlMutationPropRender from '../../../components/utils/HOC_RDP/GraphqlMutationPropRender';
//Todo: GraphQl
import { CREATE_RECRUITMENT_POST_MUTATION } from '../../../graphql/mutations/recruitment_post/recruitmentPostMutation';

export const CreateRecruitmentPostContext = createContext()
export default class CreateRecruitmentPostProvider extends PureComponent {
    state = {
        recruitmentPostData: {
            postContent: 'Flow Technology Group cung cấp các lời giải đáp bằng công nghệ cho những bài toán khó trong kinh doanh, vận hành, quản lý. Qua đó giúp những doanh nghiệp, tổ chức trong và ngoài nước phát triển một cách bền vững.',
            postImage: null,
            postTag: ['React Native'],
            role: ['FullStack Dev'],
            salary: {
                from: '800',
                to: '1500',
                currency: 'USD'
            },
            number: '5',
            company: 'SeatechIT',
            address: '98A, Ngụy Như, Thanh Xuân, Hà Nội',
            emailAddress: 'longldseatechit@gmail.com',
            phoneNumber: '0363219295'
        },
        emptyInput: null,
        _onHandlePostContent: text => {
            this.setState({
                recruitmentPostData: {
                    ...this.state.recruitmentPostData,
                    postContent: text
                }
            })
        },
        _onHandleTextInput: (key, value) => {
            this.setState({
                recruitmentPostData: {
                    ...this.state.recruitmentPostData,
                    [key]: value
                },
                emptyInput: this.state.emptyInput === key ? null : this.state.emptyInput
            })
        }
        ,
        _onSetPostImage: (data) => {
            this.setState({
                recruitmentPostData: {
                    ...this.state.recruitmentPostData,
                    postImage: data
                }
            })
        },
        _onSetPostTag: (selectedItems) => {
            this.setState({
                recruitmentPostData: {
                    ...this.state.recruitmentPostData,
                    postTag: selectedItems
                }
            })
        },
        _onSetRole: (selectedItems) => {
            this.setState({
                recruitmentPostData: {
                    ...this.state.recruitmentPostData,
                    role: selectedItems
                }
            })
        },
        _onHandleSalary: (status, text) => {
            this.setState({
                recruitmentPostData: {
                    ...this.state.recruitmentPostData,
                    salary: {
                        ...this.state.recruitmentPostData.salary,
                        [status]: text
                    }
                }
            })
        },
        _onSetInputEmpty: (fiedld) => {
            this.setState({
                emptyInput: fiedld
            })
        }
    }
    render() {
        console.log(this.state);
        return <CreateRecruitmentPostContext.Provider value={this.state}>
            <CreateRecruitmentPostFormHOC navigation={this.props.navigation} />
        </CreateRecruitmentPostContext.Provider>
    }
}
class CreateRecruitmentPostForm extends PureComponent {
    state = {
        roleForm: 'STEP1',
        isLoading: false,
        snackBar: {
            visible: false,
            color: AppStyle.styleVariable.mainColor,
            actionLabel: 'Hủy',
            message: ''
        }
    };
    // componentDidMount = () => {
    //     setTimeout(() => {
    //         this.setState({
    //             roleForm: 'STEP1'
    //         })
    //     }, 10)
    // }
    _onSwitchRolePostForm = (role) => {
        const { recruitmentPostData: { company, address, number, salary: { from, to } }, _onSetInputEmpty } = this.context;
        if (role === 'STEP1' && (company === '' || address === '')) {
            let field = company === '' ? 'company' : 'address';
            return _onSetInputEmpty(field)
        }
        if (role === 'STEP4' && (number === '' || from === '' || to === '')) {
            let field;
            if (number === '') {
                field = 'number'
            }
            else if (from === '') {
                field = 'from'
            }
            else {
                field = 'to'
            }
            return _onSetInputEmpty(field)
        }
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
    _onCreatePost = async (action) => {
        dismissKeyboard();
        const { recruitmentPostData, _onSetInputEmpty } = this.context;
        if (this.state.roleForm === 'STEP4' &&
            (recruitmentPostData.emailAddress === '' ||
                recruitmentPostData.postContent === '' ||
                recruitmentPostData.phoneNumber === '')) {
            let field;
            if (recruitmentPostData.postContent === '') {
                field = 'postContent'
            }
            else if (recruitmentPostData.emailAddress === '') {
                field = 'emailAddress'
            }
            else {
                field = 'phoneNumber'
            }
            return _onSetInputEmpty(field)
        }
        let imageBase64;
        if (recruitmentPostData.postImage) {
            imageBase64 = `data:${recruitmentPostData.postImage.type};base64,${recruitmentPostData.postImage.data}`;
        }
        const salary = `${recruitmentPostData.salary.from} - ${recruitmentPostData.salary.to} ${recruitmentPostData.salary.currency}`
        const postData = {
            ...recruitmentPostData,
            salary,
            postImage: imageBase64
        }
        let { data } = await action({
            variables: {
                recruitmentPostData: postData
            }

        })
        this.props.navigation.goBack();
    }
    render() {
        const { isLoading, roleForm, snackBar: { visible, color, actionLabel, message } } = this.state;
        if (roleForm === '') return <View style={AppStyle.StyleMain.flexViewCenter}>

        </View>
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
                <GraphqlMutationPropRender mutation={CREATE_RECRUITMENT_POST_MUTATION}
                    graphqlMutationPropRender={(action, { loading }) => (
                        <IconButton
                            onPress={() => {
                                if (roleForm === 'STEP1') return this._onSwitchRolePostForm('STEP2')
                                else if (roleForm === 'STEP2') return this._onSwitchRolePostForm('STEP3')
                                else if (roleForm === 'STEP3') return this._onSwitchRolePostForm('STEP4')
                                return this._onCreatePost(action);
                            }}
                            disabled={loading}
                            icon={roleForm !== 'STEP4' ? 'arrow-forward' : 'done'} color='white' size={25} style={{
                                position: 'absolute', bottom: 15, right: 15, zIndex: 99,
                                backgroundColor: AppStyle.styleVariable.mainColor, justifyContent: 'center',
                                alignItems: 'center', borderRadius: 100, elevation: 5,
                                borderColor: 'white', borderWidth: .5, width: 45, height: 45
                            }} />
                    )} />
                {roleForm !== 'STEP1' && <IconButton
                    onPress={() => {
                        if (roleForm === 'STEP2') return this._onSwitchRolePostForm('STEP1')
                        else if (roleForm === 'STEP3') return this._onSwitchRolePostForm('STEP2')
                        else if (roleForm === 'STEP4') return this._onSwitchRolePostForm('STEP3')
                    }}
                    icon='arrow-back' color='white' size={25} style={{
                        position: 'absolute', bottom: 15, left: 15, zIndex: 99,
                        backgroundColor: AppStyle.styleVariable.mainColor, justifyContent: 'center',
                        alignItems: 'center', borderRadius: 100, elevation: 5,
                        borderColor: 'white', borderWidth: .5, width: 45, height: 45
                    }} />}
                <View style={{ flex: 1 }}>
                    {roleForm === 'STEP1' && <RecruitmentPostForm />}
                    {roleForm === 'STEP2' && <RecruitmentPostForm2 />}
                    {roleForm === 'STEP3' && <RecruitmentPostForm3 />}
                    {roleForm === 'STEP4' && <RecruitmentPostForm4 />}

                </View>
            </Fragment>
        )
    }
}
CreateRecruitmentPostForm.contextType = CreateRecruitmentPostContext;
const CreateRecruitmentPostFormHOC = withApollo(CreateRecruitmentPostForm);


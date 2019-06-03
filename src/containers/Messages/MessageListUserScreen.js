import React, { PureComponent } from 'react';
import {IconButton,Surface} from 'react-native-paper'
import { View, Dimensions, TextInput,Text ,Alert} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import MessageListUserForm from '../../components/Messages/MessageListUserForm'
import AppStyle from '../../theme/index'
let width = Dimensions.get('window').width
const data = [
    {
        id: '1',
        from: {
            userId: '10',
            profileName: 'Thùy Dương',
            avatar: 'https://res.cloudinary.com/seatechit/image/upload/v1553588536/ndobruoq4odpuktjjncw.jpg',
            status: 'OFF'
        },
        replyStatus: true,
        sentTime:'5 phút',
        messageContent: 'Well organized and easy to understand',
        messageImage: null,
        role:'Chủ nhiệm 3B'
    },
    {
        id: '2',
        from: {
            userId: '11',
            profileName: 'Duy Khánh',
            avatar: 'https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=835171463347258&height=500&width=500&ext=1556455704&hash=AeQgZxQxyOUKRAWD',
            status: 'ON'
        },
        replyStatus: false,
        sentTime:'7 giờ',
        messageContent: 'Web building tutorials',
        messageImage: null,
        role:'Phụ huynh 4A'
    },
    {
        id: '3',
        from: {
            userId: '12',
            profileName: 'Lâm Nguyễn',
            avatar: 'https://res.cloudinary.com/seatechit/image/upload/v1553588682/qkn3p0pednpzmamvi8z8.jpg',
            status: 'ON'
        },
        replyStatus: false,
        sentTime:'12 giờ',
        messageContent: 'lots of examples',
        messageImage: null,
        role:'Phụ huynh 4A',
    },
    {
        id: '4',
        from: {
            userId: '13',
            profileName: 'Trâm Anh',
            avatar: 'https://res.cloudinary.com/seatechit/image/upload/v1553588609/kedwz1ya8s2zrzcfpbui.jpg',
            status: 'OFF'
        },
        replyStatus: true,
        sentTime:'2 ngày',
        messageContent: 'building tutorials with lots of examples',
        role:'Phụ huynh 1D',
        messageImage: null
    },
    {
        id: '5',
        from: {
            userId: '14',
            profileName: 'Thảo Nguyễn',
            avatar: 'https://res.cloudinary.com/seatechit/image/upload/v1553370747/wj7iaftg4keppzcqklr5.jpg',
            status: 'ON'
        },
        replyStatus: true,
        sentTime:'3 ngày',
        messageContent: 'HTML, CSS, JavaScript, SQL, PHP',
        role:'Chủ nhiệm 4B',
        messageImage: null
    },
    {
        id: '11',
        from: {
            userId: '10',
            profileName: 'Thùy Dương',
            avatar: 'https://res.cloudinary.com/seatechit/image/upload/v1553588536/ndobruoq4odpuktjjncw.jpg',
            status: 'ON'
        },
        replyStatus: true,
        sentTime:'5 phút',
        messageContent: 'Well organized and easy to understand',
        messageImage: null,
        role:'Chủ nhiệm 3B'
    },
    {
        id: '12',
        from: {
            userId: '11',
            profileName: 'Duy Khánh',
            avatar: 'https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=835171463347258&height=500&width=500&ext=1556455704&hash=AeQgZxQxyOUKRAWD',
            status: 'OFF'
        },
        replyStatus: false,
        sentTime:'7 giờ',
        messageContent: 'Web building tutorials',
        messageImage: null,
        role:'Phụ huynh 4A'
    },
    {
        id: '13',
        from: {
            userId: '12',
            profileName: 'Lâm Nguyễn',
            avatar: 'https://res.cloudinary.com/seatechit/image/upload/v1553588682/qkn3p0pednpzmamvi8z8.jpg',
            status: 'ON'
        },
        replyStatus: false,
        sentTime:'12 giờ',
        messageContent: 'lots of examples',
        messageImage: null,
        role:'Phụ huynh 4A',
    },
    {
        id: '14',
        from: {
            userId: '13',
            profileName: 'Trâm Anh',
            avatar: 'https://res.cloudinary.com/seatechit/image/upload/v1553588609/kedwz1ya8s2zrzcfpbui.jpg',
            status: 'OFF'
        },
        replyStatus: true,
        sentTime:'2 ngày',
        messageContent: 'building tutorials with lots of examples',
        role:'Phụ huynh 1D',
        messageImage: null
    },
    {
        id: '15',
        from: {
            userId: '14',
            profileName: 'Thảo Nguyễn',
            avatar: 'https://res.cloudinary.com/seatechit/image/upload/v1553370747/wj7iaftg4keppzcqklr5.jpg',
            status: 'OFF'
        },
        replyStatus: true,
        sentTime:'3 ngày',
        messageContent: 'HTML, CSS, JavaScript, SQL, PHP',
        role:'Chủ nhiệm 4B',
        messageImage: null
    },
    {
        id: '16',
        from: {
            userId: '15',
            profileName: 'Thùy Dương',
            avatar: 'https://res.cloudinary.com/seatechit/image/upload/v1553588356/oqyvdgpoyeebdcjosxtr.jpg',
            status: 'ON'
        },
        replyStatus: false,
        sentTime:'5 ngày',
        messageContent: 'how to use',
        role:'Phụ huynh 5D',
        messageImage: null
    }
];
class MessageListUserScreen extends PureComponent {
    static navigationOptions = ({ navigation, screenProps }) => {
        return {
            headerTitle: 
            <View style={AppStyle.StyleMain.flexViewCenter}><Surface
                style={[AppStyle.StyleHeader.headerSearch2]}>
                <TextInput placeholder='Tìm kiếm'
                    placeholderTextColor='#777'
                    style={[AppStyle.StyleHeader.headerSearch3TextInput]} />
                <Icon name='search' size={width * (1 / 14)}
                    style={AppStyle.StyleHeader.headerSearch2Icon} />
            </Surface></View>,
            headerStyle: {
                borderBottomWidth: 0,
                elevation: 0,
                backgroundColor:'transparent'
              },
              headerTransparent:true
        }
    }
    state={
        isLoading:true
      }
    componentDidMount(){
        setTimeout(() => {
            if(this.state.isLoading){
              this.setState({isLoading:false})
            }
          },500)
    }
    render() {
        return (
            <MessageListUserForm isLoading={this.state.isLoading} listMessageUser = {[...data]} navigation = {this.props.navigation}/>
        )
    }
}
export default MessageListUserScreen
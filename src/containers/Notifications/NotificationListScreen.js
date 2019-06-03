import React, { PureComponent } from 'react';
import {IconButton,Surface} from 'react-native-paper'
import { View, Dimensions, TextInput,Text ,Alert} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import NotificationListForm from '../../components/Notifications/NotificationListForm'
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
        notiTime:'5 phút',
        postContent: 'Well organized and easy to understand',
        role:'COMMENT',
        notiZone: 'O',
        isNew: true
    },
    {
        id: '101',
        from: {
            userId: '101',
            profileName: 'Chủ nhiệm 4A',
            avatar: null,
            status: 'OFF'
        },
        notiTime:'5 phút',
        notiContent: 'Start from scratch and build a fully-featured Hackernews clone with one of the detailed step-by-step tutorials',
        notiZone: 'C',
        isNew: true
    },
    {
        id: '102',
        from: {
            userId: '102',
            profileName: 'Nhà trường',
            avatar: null,
            status: 'OFF'
        },
        notiTime:'15 phút',
        notiContent: 'Clone with one of the detailed step-by-step tutorials',
        notiZone: 'S',
        isNew: true
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
        notiTime:'7 giờ',
        postContent: 'Web building tutorials',
        notiZone: 'O',
        role:'LIKE',
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
        notiTime:'12 giờ',
        postContent: 'lots of examples',
        notiZone: 'O',
        role:'LIKE',
    },
    {
        id: '103',
        from: {
            userId: '103',
            profileName: 'Hội phụ huynh học sinh',
            avatar: null,
            status: 'OFF'
        },
        notiTime:'15 phút',
        notiContent: 'How to GraphQL was created by Prisma and many amazing contributors. Its open-source and free of charge',
        notiZone: 'S'
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
        notiTime:'2 ngày',
        postContent: 'building tutorials with lots of examples',
        notiZone: 'O',
        role:'COMMENT',
        
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
        notiTime:'3 ngày',
        postContent: 'HTML, CSS, JavaScript, SQL, PHP',
        role:'LIKE',
        notiZone: 'O'
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
        notiTime:'5 phút',
        postContent: 'Well organized and easy to understand',
        notiZone: 'O',
        role:'COMMENT'
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
        notiTime:'7 giờ',
        postContent: 'Web building tutorials',
        notiZone: 'O',
        role:'COMMENT'
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
        notiTime:'12 giờ',
        postContent: 'lots of examples',
        notiZone: 'O',
        role:'COMMENT',
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
        notiTime:'2 ngày',
        postContent: 'building tutorials with lots of examples',
        role:'LIKE',
        notiZone: 'O',
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
        notiTime:'3 ngày',
        postContent: 'HTML, CSS, JavaScript, SQL, PHP',
        role:'COMMENT',
        notiZone: 'O',
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
        notiTime:'5 ngày',
        postContent: 'how to use',
        role:'COMMENT',
        notiZone: 'O',
    }
];
class NotificationListScreen extends PureComponent {
    static navigationOptions = ({ navigation, screenProps }) => {
        return {
              header:null
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
          },1000)
    }
    render() {
        return (
            <NotificationListForm isLoading={this.state.isLoading} listNotification = {[...data]}/>
        )
    }
}
export default NotificationListScreen
import { Alert, BackHandler } from 'react-native'
export const validEmail = (email) => {
    let emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    if (!emailReg.test(email)) return false
    return true
}
export const passWordRegx = (passWord) => {
    //Todo: Ít nhất 6 ký tự, chữ hoa, thường và số
    let regx = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})");
    if (regx.test(passWord)) return true;
    return false;
}
export const handleBackButton = () => {
    Alert.alert('Exit App', 'Do you want to exit?', [
        { text: 'No', onPress: () => console.log('Cancel'), style: 'cancel' },
        { text: 'Yes', onPress: () => BackHandler.exitApp() }
    ]);
    return true;
}
export const convertDateVN = (dateTime) => {
    let day = '01'
    let month = '01';
    let year = '2001';
    dayTemp = dateTime.getDate();
    day = dayTemp < 10 ?'0'+dayTemp:dayTemp;
    monthTemp = dateTime.getMonth() + 1;
    month = monthTemp < 10 ?'0'+monthTemp:monthTemp;
    year = dateTime.getFullYear();
    return `${day}/${month}/${year}`
}
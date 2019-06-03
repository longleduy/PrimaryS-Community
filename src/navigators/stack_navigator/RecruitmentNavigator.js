import {createStackNavigator} from 'react-navigation';
import RecruitmentScreen from '../../containers/Recruitments/RecruitmentScreen';

export const RecruitmentNavigator = createStackNavigator({
    RecruitmentStack: RecruitmentScreen
})
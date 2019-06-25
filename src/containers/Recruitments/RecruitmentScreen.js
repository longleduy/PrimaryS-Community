import React, { PureComponent } from 'react';
import { Surface } from 'react-native-paper'
import { View, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
//Todo: Components
import RecruitmentForm from '../../components/Recruitments/RecruitmentForm';
import GraphqlQueryPropRender from '../../components/utils/HOC_RDP/GraphqlQueryPropRender';
//Todo: Styles
import AppStyle from '../../theme/index';
//Todo: GraphQl
import { GET_LIST_RECRUITMENT_POST_QUERY } from '../../graphql/querys/recruitment_post/recruitmentPostQuery'

class RecruitmentScreen extends PureComponent {
    static navigationOptions = ({ navigation, screenProps }) => {
        return {
            headerTitle:
                <View style={AppStyle.StyleMain.flexViewCenter}>
                    <Surface
                        style={[AppStyle.StyleHeader.headerSearch2]}>
                        <TextInput placeholder='Tìm kiếm'
                            placeholderTextColor='#777'
                            style={[AppStyle.StyleHeader.headerSearch3TextInput]} />
                        <Icon name='search' size={AppStyle.styleVariable.width100 * (1 / 14)}
                            style={AppStyle.StyleHeader.headerSearch2Icon} />
                    </Surface>
                </View>,
            headerStyle: {
                borderBottomWidth: 0,
                elevation: 0,
                backgroundColor: 'transparent'
            },
            //headerTransparent: true
        }
    }
    render() {
        console.log("RecruitmentScreen");
        return (
            <GraphqlQueryPropRender
                navigation={this.props.navigation}
                query={GET_LIST_RECRUITMENT_POST_QUERY}
                queryPropRender={({ loading, data, networkStatus, refetch, subscribeToMore, fetchMore }) => {
                    return <RecruitmentForm
                        navigation={this.props.navigation}
                        networkStatus={networkStatus}
                        refetch={refetch}
                        data={data}
                        isLoading={loading}
                        subscribeToMore={subscribeToMore}
                        fetchMore={fetchMore} />
                }} />

        )
    }
}
export default RecruitmentScreen
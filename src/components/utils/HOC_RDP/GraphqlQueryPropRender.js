import React, { Component, Fragment } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import PropTypes from 'prop-types';
import { withApollo, Query } from "react-apollo";
//Todo: Contains
import {ERROR} from '../../../untils/contains/mainContain'

class GraphqlQueryPropRender extends Component {
    constructor(props) {
        super(props);
    }
    _errorHandlerAuthen = async (error, client) => {
        await AsyncStorage.setItem('@token', 'SIGN_OUT');
        return  navigation.navigate('Sign');
    }
    render() {
        console.log('123');
        const { query, client, variables, pollInterval, fetchPolicy } = this.props;
        return <Query notifyOnNetworkStatusChange={true} query={query} variables={variables} fetchPolicy={fetchPolicy ? fetchPolicy : "network-only"} onError={(error) => { this._errorHandlerAuthen(error, client) }}>
            {({ loading, error, data,networkStatus, fetchMore, subscribeToMore, refetch }) => {
                return (<Fragment>{this.props.queryPropRender({ loading, error, data,networkStatus, fetchMore, subscribeToMore, refetch })}</Fragment>)
            }}
        </Query>
    }
}
GraphqlQueryPropRender.propTypes = {
    query: PropTypes.object.isRequired,
    client: PropTypes.object,
    variables: PropTypes.object,
    pollInterval: PropTypes.number,
    fetchPolicy: PropTypes.string
}
export default withApollo(GraphqlQueryPropRender);
import React, { Component, Fragment } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import PropTypes from 'prop-types';
import { withApollo, Query } from "react-apollo";
//Todo: Contains
import { ERROR } from '../../../untils/contains/mainContain'

class GraphqlMutilQueryPropRender extends Component {
    constructor(props) {
        super(props);
    }
    _errorHandlerAuthen = async (error, client) => {
        await AsyncStorage.setItem('@token', 'SIGN_OUT');
        return navigation.navigate('Sign');
    }
    render() {
        const { query1,query2, client, variables1,variables2, pollInterval, fetchPolicy } = this.props;
          return  <Query
                notifyOnNetworkStatusChange={true}
                query={query1}
                variables={variables1}
                fetchPolicy={fetchPolicy ? fetchPolicy : "network-only"}
                onError={(error) => { this._errorHandlerAuthen(error, client) }}>
                {({ loading: loading1, error, data: data1, networkStatus, fetchMore, subscribeToMore, refetch }) => (
                    <Query query={query2}>
                        {({ loading: loading2, data: data2 }) => {
                            return (<Fragment>{this.props.queryPropRender({ loading1, error, data1, networkStatus, fetchMore, subscribeToMore, refetch,loading2,data2 })}</Fragment>)
                        }}
                    </Query>
                )}
            </Query>
    }
}
GraphqlMutilQueryPropRender.propTypes = {
    query1: PropTypes.object.isRequired,
    query2: PropTypes.object.isRequired,
    client: PropTypes.object,
    variables1: PropTypes.object,
    variables2: PropTypes.object,
    pollInterval: PropTypes.number,
    fetchPolicy: PropTypes.string
}
export default withApollo(GraphqlMutilQueryPropRender);
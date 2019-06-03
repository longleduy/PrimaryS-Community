import React, { Fragment, Component, PureComponent } from 'react';
import { Alert } from 'react-native';
import { Mutation } from "react-apollo";

class GraphqlMutationPropRender extends PureComponent {
    constructor(props) {
        super(props);
    }
    errorHandlerAuthen = (error) => {
        console.error(error);
        Alert.alert('Xảy ra lỗi! Thử lại sau');
    }
    render() {
        const { mutation } = this.props;
        return <Mutation mutation={mutation}
            onError={error => this.errorHandlerAuthen(error)}>
            {(action, { loading, error, data }) => {
                return (<Fragment>{this.props.graphqlMutationPropRender(action, { loading, error, data })}</Fragment>)
            }}
        </Mutation>
    }
}
export default GraphqlMutationPropRender;
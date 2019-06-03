import gql from 'graphql-tag';

export const USER_INFO_MUTATION_STATE = gql`        
mutation MutationUserInfo($userInfo: obj){
    mutationUserInfo(userInfo:$userInfo) @client {
		isAuthen
	}
}
`;
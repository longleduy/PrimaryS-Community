import gql from 'graphql-tag';

export const QUERY_USER_INFO = gql`
query QueryUserInfo{
	queryUserInfo @client {
		userID
		avatar
		profileName
		dateOfBirth
		gender
	}
}`;
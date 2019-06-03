import gql from 'graphql-tag'

export const SIGN_IN_MUTATION = gql`        
    mutation SignIn($signInData: signInData){
        signIn(signInData:$signInData){
			isSuccess
            message
            jwt
	}
}`
export const SIGN_UP_MUTATION = gql`        
mutation SignUp($signUpData: signUpData){
    signUp(signUpData:$signUpData){
        isSuccess
        message
    }
}`


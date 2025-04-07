import {gql} from 'apollo-angular'

const GET_ALL = gql`
    query GetEmployees {
        getAll {
            _id
            first_name
            last_name
            designation
            department
        }
    }
`

export { GET_ALL }
import {gql} from 'apollo-angular'

const GET_ALL = gql`
    query GetEmployees {
        getAll {
            _id
            first_name
            last_name
            email
            gender
            designation
            salary
            date_of_joining
            department
            employee_photo
            created_at
            updated_at
        }
    }
`

export { GET_ALL }
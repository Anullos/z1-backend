import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { GET_ALL_USERS } from './queries/user-queries';
import { CREATE_USER, DELETE_USER, UPDATE_NAME } from './mutations/user-mutations';


const rootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        get_all_users: GET_ALL_USERS
    }
});

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        createUser: CREATE_USER,
        deleteUser: DELETE_USER,
        updateName: UPDATE_NAME
    }
});

export const schema = new GraphQLSchema({
    query: rootQuery,
    mutation: mutation
});
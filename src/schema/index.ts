import { GraphQLObjectType, GraphQLSchema } from 'graphql';
// Queries
import { GET_ALL_USERS } from './queries/user-queries';
import { GET_ALL_LEVELS } from './queries/level-queries';
import { GET_ALL_LESSONS } from './queries/lesson-queries';
import { GET_ALL_TEXTS } from './queries/text-queries';
// Mutations
import { CREATE_USER, DELETE_USER, UPDATE_NAME } from './mutations/user-mutations';
import { CREATE_LEVEL, DELETE_LEVEL, UPDATE_LEVEL } from './mutations/level-mutations';
import { CREATE_LESSON, DELETE_LESSON, UPDATE_LESSON } from './mutations/lesson-mutations';
import { CREATE_TEXT, DELETE_TEXT, UPDATE_TEXT } from './mutations/text-mutations';


const rootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        get_all_users: GET_ALL_USERS,
        get_all_level: GET_ALL_LEVELS,
        get_all_lessons: GET_ALL_LESSONS,
        get_all_texts: GET_ALL_TEXTS,
    }
});

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        createUser: CREATE_USER,
        deleteUser: DELETE_USER,
        updateName: UPDATE_NAME,
        createLevel: CREATE_LEVEL,
        deleteLevel: DELETE_LEVEL,
        updateLevel: UPDATE_LEVEL,
        createLesson: CREATE_LESSON,
        updateLesson: UPDATE_LESSON,
        deleteLesson: DELETE_LESSON,
        createText: CREATE_TEXT,
        updateText: UPDATE_TEXT,
        deleteText: DELETE_TEXT,
    }
});

export const schema = new GraphQLSchema({
    query: rootQuery,
    mutation: mutation
});
import { GraphQLObjectType, GraphQLSchema } from 'graphql';
// Queries
import { GET_ALL_USERS } from './queries/user-queries';
import { GET_ALL_LEVELS } from './queries/level-queries';
import { GET_ALL_LESSONS } from './queries/lesson-queries';
import { GET_ALL_TEXTS } from './queries/text-queries';
import { GET_QUIZ } from './queries/quiz-queries';
import { GET_ANSWER_USER_FROM_CONTENT } from './queries/contentloguser-queries';
import { GET_CONTENTS_USER } from './queries/content-queries';
// Mutations
import { DELETE_USER } from './mutations/user-mutations';
import { CREATE_LEVEL, DELETE_LEVEL, UPDATE_LEVEL } from './mutations/level-mutations';
import { CREATE_LESSON, DELETE_LESSON, UPDATE_LESSON } from './mutations/lesson-mutations';
import { CREATE_TEXT, DELETE_TEXT, UPDATE_TEXT } from './mutations/text-mutations';
import { CREATE_QUIZ, DELETE_QUIZ, UPDATE_QUIZ } from './mutations/quiz-mutations';
import { CREATE_CONTENTLOGUSER, DELETE_CONTENT_LOG_USER } from './mutations/contentloguser-mutations';


const rootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        get_all_users: GET_ALL_USERS,
        get_all_level: GET_ALL_LEVELS,
        get_all_lessons: GET_ALL_LESSONS,
        get_all_texts: GET_ALL_TEXTS,
        get_quiz: GET_QUIZ,
        get_answer_user_from_content: GET_ANSWER_USER_FROM_CONTENT,
        get_contents_user: GET_CONTENTS_USER,
    }
});

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        deleteUser: DELETE_USER,
        createLevel: CREATE_LEVEL,
        deleteLevel: DELETE_LEVEL,
        updateLevel: UPDATE_LEVEL,
        createLesson: CREATE_LESSON,
        updateLesson: UPDATE_LESSON,
        deleteLesson: DELETE_LESSON,
        createText: CREATE_TEXT,
        updateText: UPDATE_TEXT,
        deleteText: DELETE_TEXT,
        createQuiz: CREATE_QUIZ,
        updateQuiz: UPDATE_QUIZ,
        deleteQuiz: DELETE_QUIZ,
        createContentLogUpser: CREATE_CONTENTLOGUSER,
        deleteContentLogUser: DELETE_CONTENT_LOG_USER,
        
    }
});

export const schema = new GraphQLSchema({
    query: rootQuery,
    mutation: mutation
});
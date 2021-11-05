import { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList } from "graphql";

const userType = new GraphQLObjectType({
    name: "User",
    fields: {
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        roleType: { type: GraphQLString },
    }
});

const contentTextType = new GraphQLObjectType({
    name: "Content",
    fields: {
        id: { type: GraphQLInt },
        text: { type: GraphQLString },
    }
});

const contentQuizzType = new GraphQLObjectType({
    name: "ContentQuizzModel",
    fields: {
        id: { type: GraphQLInt },
        question: { type: GraphQLString },
        answer: { type: new GraphQLList(GraphQLString) },
        correctAnswer: { type: new GraphQLList(GraphQLInt) },
        type: { type: GraphQLString },
    }
});

const answerUserType = new GraphQLObjectType({
    name: "AnswerUser",
    fields: {
        id: { type: GraphQLInt },
        user: { type: userType },
        quizz: { type: contentQuizzType },
        answer: { type: new GraphQLList(GraphQLString) },
        date: { type: GraphQLString },
    }
});

const contentResultType = new GraphQLObjectType({
    name: "ContentResult",
    fields: {
        id: { type: GraphQLInt },
        contentText: { type: contentTextType },
        quizzs: { type: new GraphQLList(contentQuizzType) },
    }
});



const levelType = new GraphQLObjectType({
    name: "Level",
    fields: {
        id: { type: GraphQLInt },
        title: { type: GraphQLString },
        description: { type: GraphQLString }
    }
});

const lessonType = new GraphQLObjectType({
    name: "Lesson",
    fields: {
        id: { type: GraphQLInt },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        contentResult: { type: contentResultType },
        level: { type: new GraphQLList(levelType) }
    },
});
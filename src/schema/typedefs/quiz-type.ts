import { GraphQLObjectType, GraphQLID, GraphQLList, GraphQLString, GraphQLInputObjectType } from "graphql";

export const QuizType = new GraphQLObjectType({
    name: "Quiz",
    fields: () => ({
        id: { type: GraphQLID },
        questions:{ type: new GraphQLList(QuestionType) }
    })
});

export const QuestionType = new GraphQLObjectType({
    name: "Question",
    fields: () => ({
        id: { type: GraphQLID },
        question: { type: GraphQLString },
        type: { type: GraphQLString },
        answers: { type: new GraphQLList(AnswersType) }
    })
});

export const AnswersType = new GraphQLObjectType({
    name: "Answers",
    fields: () => ({
        id: { type: GraphQLID },
        answer: { type: GraphQLString }
    })
});

export const QuestionInputType = new GraphQLInputObjectType({
    name: "QuestionInput",
    fields: () => ({
        id: { type: GraphQLID },
        question: { type: GraphQLString },
        type: { type: GraphQLString },
        answers: { type: new GraphQLList(GraphQLString) }
    })
});
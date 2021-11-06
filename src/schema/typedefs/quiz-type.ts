import { GraphQLObjectType, GraphQLID, GraphQLList, GraphQLString } from "graphql";

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
        answers: { type: new GraphQLList(GraphQLString) }
    })
});
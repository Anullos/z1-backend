import { GraphQLObjectType, GraphQLID, GraphQLList, GraphQLInt } from "graphql";
import { TextType } from './text-type';
import { QuizType } from './quiz-type';

export const ContentType = new GraphQLObjectType({
    name: "Content",
    fields: () => ({
        id: { type: GraphQLID },
        order: { type: GraphQLInt },
        text: { type: TextType },
        quiz: { type: QuizType }
    })
});
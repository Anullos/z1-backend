import { GraphQLObjectType, GraphQLID, GraphQLList } from "graphql";
import { TextType } from './text-type';
import { QuizType } from './quiz-type';

export const ContentType = new GraphQLObjectType({
    name: "Content",
    fields: () => ({
        id: { type: GraphQLID },
        text: { type: TextType },
        quiz: { type: QuizType }
    })
});
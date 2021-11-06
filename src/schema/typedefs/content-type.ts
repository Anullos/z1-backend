import { GraphQLObjectType, GraphQLID, GraphQLList } from "graphql";
import { TextType } from './text-type';

export const ContentType = new GraphQLObjectType({
    name: "Content",
    fields: () => ({
        id: { type: GraphQLID },
        texts: { type: new GraphQLList(TextType) },
        quizs: { type: new GraphQLList(TextType) }
    })
});
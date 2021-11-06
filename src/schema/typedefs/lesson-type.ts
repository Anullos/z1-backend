import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList } from "graphql";
import { TextType } from './text-type';

export const LessonType = new GraphQLObjectType({
    name: "Lesson",
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        texts: { type: new GraphQLList(TextType) }
    })
});
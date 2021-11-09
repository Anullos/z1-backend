import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList, GraphQLInt } from "graphql";
import { ContentType } from './content-type';

export const LessonType = new GraphQLObjectType({
    name: "Lesson",
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        order: { type: GraphQLInt },
        contents: { type: new GraphQLList(ContentType) }
    })
});
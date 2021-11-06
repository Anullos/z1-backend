import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList } from "graphql";
import { ContentType } from './content-type';

export const LessonType = new GraphQLObjectType({
    name: "Lesson",
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        contents: { type: new GraphQLList(ContentType) }
    })
});
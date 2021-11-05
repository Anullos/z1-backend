import { GraphQLObjectType, GraphQLID, GraphQLString } from "graphql";

export const LessonType = new GraphQLObjectType({
    name: "Lesson",
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        
    })
});
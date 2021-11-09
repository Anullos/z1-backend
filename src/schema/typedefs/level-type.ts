import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList, GraphQLInt } from 'graphql';
import { LessonType } from './lesson-type';

export const LevelType = new GraphQLObjectType({
    name: "Level",
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        order: { type: GraphQLInt },
        lessons: { type: new GraphQLList(LessonType) }
    })
});
import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList } from "graphql";
import { ContentType } from './content-type';
import { LessonType } from "./lesson-type";
import { UserType2 } from './user-type';

export const ContentLogUserType = new GraphQLObjectType({
    name: "ContentLogUser",
    fields: () => ({
        id: { type: GraphQLID },
        lesson: { type: LessonType },
        content: { type: ContentType },
        user: { type: UserType2 },
        answersUser: { type: new GraphQLList(GraphQLString) }
    })
});
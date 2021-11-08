import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList } from "graphql";
import { ContentType } from './content-type';
import { UserType } from './user-type';

export const ContentLogUserType = new GraphQLObjectType({
    name: "ContentLogUser",
    fields: () => ({
        id: { type: GraphQLID },
        content: { type: ContentType },
        user: { type: UserType },
        answersUser: { type: new GraphQLList(GraphQLString) }
    })
});
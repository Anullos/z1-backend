import { GraphQLObjectType, GraphQLID, GraphQLString } from "graphql";

export const TextType = new GraphQLObjectType({
    name: "Text",
    fields: () => ({
        id: { type: GraphQLID },
        text: { type: GraphQLString },
    })
});
import { GraphQLID, GraphQLList, GraphQLNonNull } from 'graphql';
import { existLesson } from '../../lib/tools/checks';
import { TextEntity } from '../../entities/text_entity';
import { TextType } from '../typedefs/text-type';

export const GET_ALL_TEXTS = {
    type: new GraphQLList(TextType),
    args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
    },
    async resolve(root: any, args: any) {
        const { id } = args;
        await existLesson(id);
        const result = await TextEntity.find({ lessonId: id });
        if (!result) {
            return [];
        }
        return result;
    }
}
import { GraphQLID, GraphQLList, GraphQLNonNull } from 'graphql';
import { existLesson } from '../../lib/tools/checks';
import { ContentEntity } from '../../entities/content_entity';
import { ContentType } from '../typedefs/content-type';

export const GET_ALL_TEXTS = {
    type: new GraphQLList(ContentType),
    args: {
        lesson_id: { type: new GraphQLNonNull(GraphQLID) },
    },
    async resolve(req: any, args: any) {
        const { lesson_id } = args;
        await existLesson(lesson_id);
        const result = await ContentEntity.find({ relations: ['text'], where: { lessonId: lesson_id } });
        if (!result) {
            return [];
        }
        return result;
    }
}
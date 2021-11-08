import { GraphQLID, GraphQLList, GraphQLNonNull } from 'graphql';
import { existLesson, existUser } from '../../lib/tools/checks';
import { ContentEntity } from '../../entities/content_entity';
import { ContentType } from '../typedefs/content-type';
import { isProfesor } from '../../lib/tools/security';

export const GET_ALL_TEXTS = {
    type: new GraphQLList(ContentType),
    args: {
        lesson_id: { type: new GraphQLNonNull(GraphQLID) },
    },
    async resolve(req: any, args: any) {
        const { user_id } = req;
        const userId = parseInt(user_id);
        const userReq = await existUser(userId);
        isProfesor(userReq.role);
        const { lesson_id } = args;
        await existLesson(lesson_id);
        const result = await ContentEntity.find({ relations: ['text'], where: { lessonId: lesson_id } });
        if (!result) {
            return [];
        }
        return result;
    }
}
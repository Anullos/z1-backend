import { GraphQLID, GraphQLList, GraphQLNonNull } from 'graphql';
import { existLesson, existUser } from '../../lib/tools/checks';
import { isEstudiante, isProfesor } from '../../lib/tools/security';
import { ContentType } from '../typedefs/content-type';
import { ContentEntity } from '../../entities/content_entity';

export const GET_CONTENTS_USER = {
    type: new GraphQLList(ContentType),
    args: {
        lessonId: { type: new GraphQLNonNull(GraphQLID) },
    },
    async resolve(req: any, args: any) {
        const { user_id } = req;
        const idParse = parseInt(user_id);
        const userReq = await existUser(idParse);
        isProfesor(userReq.role);
        const { lessonId } = args;
        await existLesson(lessonId);
        // TODO: Filter with contentLogUser too
        const result = await ContentEntity.find({
            relations: ['text', 'quiz', 'quiz.questions', 'quiz.questions.answers'],
            where: {
                lessonId: lessonId,
            },
            order: {
                order: 'ASC',
            },
        });
        if (!result) {
            return [];
        }
        return result;
    }
}
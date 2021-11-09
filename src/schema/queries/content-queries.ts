import { GraphQLID, GraphQLList, GraphQLNonNull } from 'graphql';
import { existLesson, existUser } from '../../lib/tools/checks';
import { isEstudiante } from '../../lib/tools/security';
import { ContentType } from '../typedefs/content-type';
import { ContentEntity } from '../../entities/content_entity';
import { ContentLogUserEntity } from '../../entities/content_log_user';

export const GET_CONTENTS_USER = {
    type: new GraphQLList(ContentType),
    args: {
        lessonId: { type: new GraphQLNonNull(GraphQLID) },
    },
    async resolve(req: any, args: any) {
        const { user_id } = req;
        const idParse = parseInt(user_id);
        const userReq = await existUser(idParse);
        isEstudiante(userReq.role);
        const { lessonId } = args;
        await existLesson(lessonId);
        const contentsLogs = await ContentLogUserEntity.find({
            where: {
                userId: idParse,
                lessonId: lessonId,
            },
        });
        const sizeLogs = contentsLogs.length;
        const result = await ContentEntity.find({
            relations: ['text', 'quiz', 'quiz.questions', 'quiz.questions.answers'],
            where: {
                lessonId: lessonId,
            },
            order: {
                order: 'ASC',
            },
            take: sizeLogs + 1,
        });
        if (!result) {
            return [];
        }
        return result;
    }
}
import { GraphQLID, GraphQLList, GraphQLNonNull } from 'graphql';
import { LessonType } from '../typedefs/lesson-type';
import { LessonEntity } from '../../entities/lesson_entity';
import { existLevel, existUser } from '../../lib/tools/checks';
import { isProfesor } from '../../lib/tools/security';

export const GET_ALL_LESSONS = {
    type: new GraphQLList(LessonType),
    args: {
        levelId: { type: new GraphQLNonNull(GraphQLID) },
    },
    async resolve(req: any, args: any) {
        const { user_id } = req;
        const userId = parseInt(user_id);
        const userReq = await existUser(userId);
        const { levelId } = args;
        await existLevel(levelId);
        if (userReq.role == "Profesor") {
            const result = await LessonEntity.find({
                relations: ['contents', 'contents.text', 'contents.quiz', 'contents.quiz.questions', 'contents.quiz.questions.answers'],
                where: {
                    levelId: levelId,
                },
            });
            if (!result) {
                return [];
            }
            return result;
        } else {
            
        }

    }
}
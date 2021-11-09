import { GraphQLID, GraphQLList, GraphQLNonNull } from 'graphql';
import { LessonType } from '../typedefs/lesson-type';
import { LessonEntity } from '../../entities/lesson_entity';
import { existLevel, existUser } from '../../lib/tools/checks';
import { ContentEntity } from '../../entities/content_entity';
import { ContentLogUserEntity } from '../../entities/content_log_user';

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
                order: {
                    order: "ASC"
                }
            });
            if (!result) {
                return [];
            }
            return result;
        } else {
            const lessons = await LessonEntity.find({
                relations: ['contents'],
                where: {
                    levelId: levelId,
                },
                order: {
                    order: "ASC"
                }
            });
            if (!lessons) {
                return [];
            }
            var counter = 0;
            var counterLastContentsLog = 0;
            for (const lesson of lessons) {
                const contents = await ContentEntity.find({
                    where: {
                        lessonId: lesson.id,
                    },
                });
                const contentsLogs = await ContentLogUserEntity.find({
                    where: {
                        userId: userId,
                        lessonId: lesson.id,
                    },
                });
                counterLastContentsLog = contentsLogs.length;
                counter++;
                if (contents.length !== contentsLogs.length) {
                    break;
                }
            }
            const result = await LessonEntity.find({
                where: {
                    levelId: levelId,
                },
                order: {
                    order: "ASC"
                },
                take: counter,
            });
            return result;
        }

    }
}
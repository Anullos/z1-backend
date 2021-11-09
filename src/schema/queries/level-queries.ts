import { GraphQLList } from 'graphql';
import { LevelType } from '../typedefs/level-type';
import { LevelEntity } from '../../entities/level_entity';
import { existUser } from '../../lib/tools/checks';
import { isProfesor } from '../../lib/tools/security';
import { ContentEntity } from '../../entities/content_entity';
import { LessonEntity } from '../../entities/lesson_entity';
import { ContentLogUserEntity } from '../../entities/content_log_user';

export const GET_ALL_LEVELS = {
    type: new GraphQLList(LevelType),
    async resolve(req: any) {
        const { user_id } = req;
        const userId = parseInt(user_id);
        const userReq = await existUser(userId);
        if (userReq.role === 'profesor') {
            const result = await LevelEntity.find({
                relations: ['lessons', 'lessons.contents.text', 'lessons.contents.quiz', 'lessons.contents.quiz.questions', 'lessons.contents.quiz.questions.answers'],
                order: {
                    order: 'ASC'
                }
            }
            );
            if (!result) {
                return [];
            }
            return result;
        } else {
            const levels = await LevelEntity.find({
                order: {
                    order: 'ASC'
                }
            }
            );
            if (!levels) {
                return [];
            }
            var counterLevel = 0;
            for (const level of levels) {
                const lessons = await LessonEntity.find({
                    relations: ['contents'],
                    where: {
                        levelId: level.id,
                    },
                    order: {
                        order: "ASC"
                    }
                });
                if (!lessons) {
                    return [];
                }
                var counter = 0;
                var counterLesson = 0;
                var counterLastContentsLog = 0; // counter for last contents log
                // check if the user has already seen the lesson
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
                    counterLesson++;
                }
                counterLevel++;
                if (lessons.length !== counterLesson) {
                    break;
                }
            }
            // return lessons that the user has seen and not end to see
            const result = await LevelEntity.find({
                relations: ['lessons', 'lessons.contents', 'lessons.contents.text', 'lessons.contents.quiz', 'lessons.contents.quiz.questions', 'lessons.contents.quiz.questions.answers'],
                order: {
                    order: "ASC"
                },
                take: counterLevel,
            });
            return result;
        }
    }
}
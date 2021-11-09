import { GraphQLNonNull, GraphQLString, GraphQLID, GraphQLList } from 'graphql';
import { existContent, existUser } from '../../lib/tools/checks';
import { isEstudiante, isProfesor } from '../../lib/tools/security';
import { ContentLogUserType } from '../typedefs/contentloguser-type';
import { ContentLogUserEntity } from '../../entities/content_log_user';
import { ContentEntity } from '../../entities/content_entity';


export const CREATE_CONTENTLOGUSER = {
    type: ContentLogUserType,
    args: {
        contentId: { type: new GraphQLNonNull(GraphQLID) },
        answersUser: { type: new GraphQLNonNull(new GraphQLList(GraphQLString)) },
    },
    async resolve(req: any, args: any) {
        const { user_id } = req;
        const idParse = parseInt(user_id);
        const userReq = await existUser(idParse);
        isEstudiante(userReq.role);
        const { contentId, answersUser } = args;
        const content = await existContent(contentId);
        const content_quiz = await ContentEntity.find({ relations: ['text', 'quiz', 'quiz.questions', 'quiz.questions.answers'], where: { id: contentId } });
        if (content_quiz[0].quiz != null) {
            const questions = content_quiz[0].quiz.questions;
            // Check if the number of correct answers is the same as the answers from user
            var counter = 0;
            var answer_correct = 0;
            for (const question of questions) {
                if (question.type != 'Libre') {
                    for (const answer of question.answers) {
                        const correct = answer.answer.includes('*');
                        if (correct == true) {
                            counter++;
                        }
                        const answerCorrect = answer.answer.slice(1);
                        console.log(answerCorrect);
                        for (const answerUser of answersUser) {
                            if (answerUser == answerCorrect) {
                                answer_correct++;
                            }
                        }
                    }
                }
            }
            if (counter != answer_correct) {
                throw new Error('The number of correct answers is not the same as the answers from user, please try again');
            }
        }
        const insertContentLog = await ContentLogUserEntity.insert({ lessonId: content.lessonId, contentId: contentId, userId: idParse, answersUser: answersUser });
        const result = await ContentLogUserEntity.findOne({ relations: ['user', 'lesson', 'content', 'content.text', 'content.quiz', 'content.quiz.questions', 'content.quiz.questions.answers'], where: { id: insertContentLog.raw.insertId } });
        return result;
    }
}

export const DELETE_CONTENT_LOG_USER = {
    type: ContentLogUserType,
    args: {
        contentLogUserId: { type: new GraphQLNonNull(GraphQLID) }
    },
    async resolve(req: any, args: any) {
        const { user_id } = req;
        const userId = parseInt(user_id);
        const userReq = await existUser(userId);
        isProfesor(userReq.role);
        const { contentLogUserId } = args;
        await ContentLogUserEntity.delete(contentLogUserId);
    }
}

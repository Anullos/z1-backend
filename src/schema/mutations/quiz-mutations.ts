import { GraphQLNonNull, GraphQLString, GraphQLID, GraphQLList } from 'graphql';
import { existLesson, existText, existUser } from '../../lib/tools/checks';
import { TextEntity } from '../../entities/text_entity';
import { ContentEntity } from '../../entities/content_entity';
import { isProfesor } from '../../lib/tools/security';
import { QuizType, QuestionType, QuestionInputType } from '../typedefs/quiz-type';
import { QuizEntity } from '../../entities/quiz_entity';
import { QuestionEntity } from '../../entities/question_entity';
import { QuestionAnswersEntity } from '../../entities/question_answers_entity';
import { ContentType } from '../typedefs/content-type';
import { TextType } from '../typedefs/text-type';




export const CREATE_QUIZ = {
    type: ContentType,
    args: {
        lesson_id: { type: new GraphQLNonNull(GraphQLID) },
        questions: { type: new GraphQLNonNull(new GraphQLList(QuestionInputType)) },
    },
    async resolve(req: any, args: any) {
        const { user_id } = req;
        const userId = parseInt(user_id);
        const userReq = await existUser(userId);
        isProfesor(userReq.role);
        const { lesson_id, questions } = args;
        await existLesson(lesson_id);
        const insertContent = await ContentEntity.insert({ lessonId: lesson_id });
        const result = await ContentEntity.find({ relations: ['quiz', 'quiz.questions'], where: { id: insertContent.raw.insertId } });
        const insert = await QuizEntity.insert({ contentId: insertContent.raw.insertId });
        for (const question of questions) {
            const insertQuestion = await QuestionEntity.insert({ quizId: insert.raw.insertId, question: question.question, type: question.type });
            for (const answer of question.answers) {
                await QuestionAnswersEntity.insert({ questionId: insertQuestion.raw.insertId, answer: answer });
            }
        }
        return result;
    }
}

export const DELETE_QUIZ = {
    type: QuizType,
    args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
    },
    async resolve(req: any, args: any) {
        const { user_id } = req;
        const userId = parseInt(user_id);
        const userReq = await existUser(userId);
        isProfesor(userReq.role);
        const { id } = args;
        const text = await existText(id);
        await TextEntity.delete(id);
        await ContentEntity.delete(text.contentId);
    }
}

export const UPDATE_QUIZ = {
    type: QuizType,
    args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        text: { type: new GraphQLNonNull(GraphQLString) },
    },
    async resolve(req: any, args: any) {
        const { user_id } = req;
        const userId = parseInt(user_id);
        const userReq = await existUser(userId);
        isProfesor(userReq.role);
        const { id, text } = args;
        await existText(id);
        await TextEntity.update(id, { text: text });
        const result = await TextEntity.findOne({ id: id });
        return result;
    }
}
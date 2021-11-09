import { GraphQLNonNull, GraphQLID, GraphQLList, GraphQLInt } from 'graphql';
import { existLesson, existQuiz, existUser } from '../../lib/tools/checks';
import { ContentEntity } from '../../entities/content_entity';
import { isProfesor } from '../../lib/tools/security';
import { QuizType, QuestionInputType } from '../typedefs/quiz-type';
import { QuizEntity } from '../../entities/quiz_entity';
import { QuestionEntity } from '../../entities/question_entity';
import { QuestionAnswersEntity } from '../../entities/question_answers_entity';
import { ContentType } from '../typedefs/content-type';


export const CREATE_QUIZ = {
    type: ContentType,
    args: {
        lesson_id: { type: new GraphQLNonNull(GraphQLID) },
        questions: { type: new GraphQLNonNull(new GraphQLList(QuestionInputType)) },
        order: { type: new GraphQLNonNull(GraphQLInt) },
    },
    async resolve(req: any, args: any) {
        const { user_id } = req;
        const userId = parseInt(user_id);
        const userReq = await existUser(userId);
        isProfesor(userReq.role);
        const { lesson_id, questions, order } = args;
        await existLesson(lesson_id);
        // check if question is good request
        for (const question of questions) {
            if (question.type !== "Simple" && question.type !== "Multiple" && question.type !== "Libre") {
                throw new Error("Invalid question type, must to be: Simple, Multiple or Libre");
            }
            if (question.type === "Libre" && question.answers.length > 0) {
                throw new Error("Type Libre must to be empty answers");
            }
            if (question.type === "Multiple" && question.answers.length < 3) {
                throw new Error("Type Multiple must to have at least 2 answers");
            }
            if (question.type === "Simple" && question.answers.length !== 2) {
                throw new Error("Type Simple must to have 2 answers");
            }
            var counterCorrect = 0;
            for (const answer of question.answers) {
                const correct = answer.answer.includes('*');
                if (correct === true) {
                    counterCorrect++;
                }
            }
            if (question.type === "Simple" && counterCorrect !== 1) {
                throw new Error("Type Simple must to have only one correct answer");
            }
            if (question.type === "Multiple" && counterCorrect < 2) {
                throw new Error("Type Multiple must to have more of one correct answer");
            }
        }
        // insert quiz
        const insertContent = await ContentEntity.insert({ lessonId: lesson_id, order: order });
        const insert = await QuizEntity.insert({ contentId: insertContent.raw.insertId });
        // insert question
        for (const question of questions) {
            const insertQuestion = await QuestionEntity.insert({ quizId: insert.raw.insertId, question: question.question, type: question.type });
            for (const answer of question.answers) {
                await QuestionAnswersEntity.insert({ questionId: insertQuestion.raw.insertId, answer: answer });
            }
        }
        const result = await ContentEntity.findOne({ relations: ['quiz', 'quiz.questions', 'quiz.questions.answers'], where: { id: insertContent.raw.insertId } });
        return result;
    }
}

export const DELETE_QUIZ = {
    type: QuizType,
    args: {
        quizId: { type: new GraphQLNonNull(GraphQLID) }
    },
    async resolve(req: any, args: any) {
        const { user_id } = req;
        const userId = parseInt(user_id);
        const userReq = await existUser(userId);
        isProfesor(userReq.role);
        const { quizId } = args;
        const quiz = await existQuiz(quizId);
        await ContentEntity.delete(quiz.contentId);
    }
}

export const UPDATE_QUIZ = {
    type: QuizType,
    args: {
        quizId: { type: new GraphQLNonNull(GraphQLID) },
        questions: { type: new GraphQLNonNull(new GraphQLList(QuestionInputType)) },
        order: { type: new GraphQLNonNull(GraphQLInt) },
    },
    async resolve(req: any, args: any) {
        const { user_id } = req;
        const userId = parseInt(user_id);
        const userReq = await existUser(userId);
        isProfesor(userReq.role);
        const { quizId, questions, order } = args;
        const quiz = await existQuiz(quizId);
        // TODO: Do Update quiz
        //await QuestionEntity.update();
        return quiz;
    }
}
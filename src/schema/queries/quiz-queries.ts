import { GraphQLID, GraphQLList, GraphQLNonNull } from 'graphql';
import { existQuiz, existUser } from '../../lib/tools/checks';
import { ContentType } from '../typedefs/content-type';
import { QuizEntity } from '../../entities/quiz_entity';
import { ContentEntity } from '../../entities/content_entity';
import { isProfesor } from '../../lib/tools/security';

export const GET_QUIZ = {
    type: ContentType,
    args: {
        quiz_id: { type: new GraphQLNonNull(GraphQLID) },
    },
    async resolve(req: any, args: any) {
        const { user_id } = req;
        const userId = parseInt(user_id);
        const userReq = await existUser(userId);
        isProfesor(userReq.role);
        const { quiz_id } = args;
        await existQuiz(quiz_id);
        const result = await QuizEntity.findOne({ id: quiz_id });
        if (!result) {
            return [];
        }
        const result2 = await ContentEntity.findOne({ relations: ['quiz', 'quiz.questions', 'quiz.questions.answers'], where: { id: result['contentId'] } });
        return result2;
    }
}
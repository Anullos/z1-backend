import { GraphQLID, GraphQLList, GraphQLNonNull } from 'graphql';
import { existQuiz } from '../../lib/tools/checks';
import { ContentType } from '../typedefs/content-type';
import { QuizEntity } from '../../entities/quiz_entity';
import { ContentEntity } from '../../entities/content_entity';

export const GET_QUIZ = {
    type: ContentType,
    args: {
        quiz_id: { type: new GraphQLNonNull(GraphQLID) },
    },
    async resolve(req: any, args: any) {
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
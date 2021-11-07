import { GraphQLID, GraphQLList, GraphQLNonNull } from 'graphql';
import { LessonType } from '../typedefs/lesson-type';
import { LessonEntity } from '../../entities/lesson_entity';
import { existLevel } from '../../lib/tools/checks';

export const GET_ALL_LESSONS = {
    type: new GraphQLList(LessonType),
    args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
    },
    async resolve(req: any, args: any) {
        const { id } = args;
        await existLevel(id);
        const result = await LessonEntity.find({
            relations: ['contents.texts'],
            where: {
                levelId: id,
            },
        });
        if (!result) {
            return [];
        }
        return result;
    }
}
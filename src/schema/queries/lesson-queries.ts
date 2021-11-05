import { GraphQLList } from 'graphql';
import { LessonType } from '../typedefs/lesson-type';
import { LessonEntity } from '../../entities/lesson_entity';

export const GET_ALL_LESSONS = {
    type: new GraphQLList(LessonType),
    async resolve(root: any, args: any) {
        const { id } = args;
        return await LessonEntity.findOne({ levelID: id });
    }
}
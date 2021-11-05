import { GraphQLNonNull, GraphQLString, GraphQLID } from 'graphql';
import { LessonType } from '../typedefs/lesson-type';
import { LessonEntity } from '../../entities/lesson_entity';
import { existLesson, existLevel } from '../../lib/tools/checks';


export const CREATE_LESSON = {
    type: LessonType,
    args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        level_id: { type: new GraphQLNonNull(GraphQLID) },
    },
    async resolve(root: any, args: any) {
        // TODO: Validate user input
        const { title, description, level_id } = args;
        await existLevel(level_id);
        const insertLesson = await LessonEntity.insert({ title: title, description: description, levelId: level_id });
        const lesson = await LessonEntity.findOne({ id: insertLesson.raw.insertId });
        return lesson;

    }
}

export const DELETE_LESSON = {
    type: LessonType,
    args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
    },
    async resolve(root: any, args: any) {
        // TODO: Validate user input
        const { id } = args;
        await existLesson(id);
        await LessonEntity.delete(id);
    }
}

export const UPDATE_LESSON = {
    type: LessonType,
    args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        title: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
    },
    async resolve(root: any, args: any) {
        // TODO: Validate user input
        const { id, title, description } = args;
        await existLesson(id);
        await LessonEntity.update(id, { title: title, description: description });
        const result = await LessonEntity.findOne({ id: id });
        return result;
    }
}
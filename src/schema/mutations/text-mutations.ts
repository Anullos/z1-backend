import { GraphQLNonNull, GraphQLString, GraphQLID } from 'graphql';
import { existLesson, existText } from '../../lib/tools/checks';
import { TextEntity } from '../../entities/text_entity';
import { TextType } from '../typedefs/text-type';


export const CREATE_TEXT = {
    type: TextType,
    args: {
        text: { type: new GraphQLNonNull(GraphQLString) },
        lesson_id: { type: new GraphQLNonNull(GraphQLID) },
    },
    async resolve(root: any, args: any) {
        // TODO: Validate user input
        const { text, lesson_id } = args;
        await existLesson(lesson_id);
        const insert = await TextEntity.insert({ text: text, lessonId: lesson_id });
        const result = await TextEntity.findOne({ id: insert.raw.insertId });
        return result;
    }
}

export const DELETE_TEXT = {
    type: TextType,
    args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
    },
    async resolve(root: any, args: any) {
        // TODO: Validate user input
        const { id } = args;
        await existText(id);
        await TextEntity.delete(id);
    }
}

export const UPDATE_TEXT = {
    type: TextType,
    args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        text: { type: new GraphQLNonNull(GraphQLString) },
    },
    async resolve(root: any, args: any) {
        // TODO: Validate user input
        const { id, text } = args;
        await existText(id);
        await TextEntity.update(id, { text: text });
        const result = await TextEntity.findOne({ id: id });
        return result;
    }
}
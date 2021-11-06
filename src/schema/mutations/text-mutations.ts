import { GraphQLNonNull, GraphQLString, GraphQLID } from 'graphql';
import { existContent, existLesson, existText } from '../../lib/tools/checks';
import { TextEntity } from '../../entities/text_entity';
import { TextType } from '../typedefs/text-type';
import { ContentEntity } from '../../entities/content_entity';


export const CREATE_TEXT = {
    type: TextType,
    args: {
        text: { type: new GraphQLNonNull(GraphQLString) },
        content_id: { type: new GraphQLNonNull(GraphQLID) },
    },
    async resolve(root: any, args: any) {
        // TODO: Validate user input
        const { text, lesson_id } = args;
        await existLesson(lesson_id);
        const insertContent = await ContentEntity.insert({ lessonId: lesson_id });
        const insert = await TextEntity.insert({ text: text, contentId: insertContent.raw.insertId });
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
        const text = await existText(id);
        await TextEntity.delete(id);
        await ContentEntity.delete(text.contentId);
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
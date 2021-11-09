import { GraphQLNonNull, GraphQLString, GraphQLID, GraphQLInt } from 'graphql';
import { existLesson, existText, existUser } from '../../lib/tools/checks';
import { TextEntity } from '../../entities/text_entity';
import { TextType } from '../typedefs/text-type';
import { ContentEntity } from '../../entities/content_entity';
import { isProfesor } from '../../lib/tools/security';
import { ContentType } from '../typedefs/content-type';

export const CREATE_TEXT = {
    type: ContentType,
    args: {
        text: { type: new GraphQLNonNull(GraphQLString) },
        lesson_id: { type: new GraphQLNonNull(GraphQLID) },
        order: { type: new GraphQLNonNull(GraphQLInt) },
    },
    async resolve(req: any, args: any) {
        const { user_id } = req;
        const userId = parseInt(user_id);
        const userReq = await existUser(userId);
        isProfesor(userReq.role);
        const { text, lesson_id, order } = args;
        await existLesson(lesson_id);
        const insertContent = await ContentEntity.insert({ lessonId: lesson_id, order: order });
        await TextEntity.insert({ text: text, contentId: insertContent.raw.insertId });
        const result = await ContentEntity.findOne({ relations: ['text'], where: { id: insertContent.raw.insertId } });
        return result;
    }
}

export const DELETE_TEXT = {
    type: TextType,
    args: {
        textId: { type: new GraphQLNonNull(GraphQLID) }
    },
    async resolve(req: any, args: any) {
        const { user_id } = req;
        const userId = parseInt(user_id);
        const userReq = await existUser(userId);
        isProfesor(userReq.role);
        const { textId } = args;
        const text = await existText(textId);
        await ContentEntity.delete(text.contentId);
    }
}

export const UPDATE_TEXT = {
    type: TextType,
    args: {
        textId: { type: new GraphQLNonNull(GraphQLID) },
        text: { type: new GraphQLNonNull(GraphQLString) },
        order: { type: new GraphQLNonNull(GraphQLInt) },
    },
    async resolve(req: any, args: any) {
        const { user_id } = req;
        const userId = parseInt(user_id);
        const userReq = await existUser(userId);
        isProfesor(userReq.role);
        const { textId, text, order } = args;
        const textData: TextEntity = await existText(textId);
        await ContentEntity.update( textData.contentId, { order: order });
        await TextEntity.update(textId, { text: text });
        const result = await TextEntity.findOne({ id: textId });
        return result;
    }
}
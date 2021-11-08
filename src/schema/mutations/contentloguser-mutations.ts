import { GraphQLNonNull, GraphQLString, GraphQLID, GraphQLList } from 'graphql';
import { existContent, existUser } from '../../lib/tools/checks';
import { isEstudiante, isProfesor } from '../../lib/tools/security';
import { ContentLogUserType } from '../typedefs/contentloguser-type';
import { ContentLogUserEntity } from '../../entities/content_log_user';

export const CREATE_CONTENTLOGUSER = {
    type: ContentLogUserType,
    args: {
        contentId: { type: new GraphQLNonNull(GraphQLID) },
        answersUser: { type: new GraphQLNonNull(new GraphQLList(GraphQLString)) },
    },
    async resolve(req: any, args: any) {
        const { user_id } = req;
        const idParse = parseInt(user_id);
        const userReq = await existUser(idParse);
        isEstudiante(userReq.role);
        const { contentId, answersUser } = args;
        await existContent(contentId);
        const insertContentLog = await ContentLogUserEntity.insert({ contentId: contentId, userId: idParse, answersUser: answersUser });
        const result = await ContentLogUserEntity.findOne({ relations: ['content', 'user'], where: { id: insertContentLog.raw.insertId } });
        return result;
    }
}

export const DELETE_CONTENT_LOG_USER = {
    type: ContentLogUserType,
    args: {
        contentLogUserId: { type: new GraphQLNonNull(GraphQLID) }
    },
    async resolve(req: any, args: any) {
        const { user_id } = req;
        const userId = parseInt(user_id);
        const userReq = await existUser(userId);
        isProfesor(userReq.role);
        const { contentLogUserId } = args;
        await ContentLogUserEntity.delete(contentLogUserId);
    }
}

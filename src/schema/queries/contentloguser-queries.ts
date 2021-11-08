import { GraphQLID, GraphQLNonNull } from 'graphql';
import { existContent, existUser } from '../../lib/tools/checks';
import { ContentLogUserType } from '../typedefs/contentloguser-type';
import { ContentLogUserEntity } from '../../entities/content_log_user';

export const GET_ANSWER_USER_FROM_CONTENT = {
    type: ContentLogUserType,
    args: {
        contentId: { type: new GraphQLNonNull(GraphQLID) },
        userId: { type: new GraphQLNonNull(GraphQLID) },
    },
    async resolve(req: any, args: any) {
        const { contentId, userId } = args;
        await existContent(contentId);
        await existUser(userId);
        const result = await ContentLogUserEntity.find({
            relations: ['content', 'user'],
            where: {
                contentId: contentId,
                userId: userId,
            },
        });
        if (!result) {
            return null;
        }
        return result;
    }
}
import { GraphQLNonNull, GraphQLID } from 'graphql';
import { UserType } from "../typedefs/user-type";
import { UserEntity } from '../../entities/user_entity';
import { existUser } from '../../lib/tools/checks';
import { isProfesor } from '../../lib/tools/security';

export const DELETE_USER = {
    type: UserType,
    args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
    },
    async resolve(req: any, args: any) {
        const { user_id } = req;
        const userId = parseInt(user_id);
        const userReq = await existUser(userId);
        isProfesor(userReq.role);
        const { id } = args;
        await UserEntity.delete(id);
    }
};
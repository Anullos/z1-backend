import { GraphQLNonNull, GraphQLString, GraphQLID } from 'graphql';
import { LevelType } from '../typedefs/level-type';
import { LevelEntity } from '../../entities/level_entity';
import { existLevel, existUser } from '../../lib/tools/checks';
import { isProfesor } from '../../lib/tools/security';


export const CREATE_LEVEL = {
    type: LevelType,
    args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
    },
    async resolve(req: any, args: any) {
        const { user_id } = req;
        const userId = parseInt(user_id);
        const userReq = await existUser(userId);
        isProfesor(userReq.role);
        const { title, description } = args;
        const insertLevel = await LevelEntity.insert({ title: title, description: description });
        const level = await LevelEntity.findOne({ id: insertLevel.raw.insertId });
        return level;
    }
}

export const DELETE_LEVEL = {
    type: LevelType,
    args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
    },
    async resolve(req: any, args: any) {
        const { user_id } = req;
        const userId = parseInt(user_id);
        const userReq = await existUser(userId);
        isProfesor(userReq.role);
        const { id } = args;
        await existLevel(id);
        await LevelEntity.delete(id);
    }
}

export const UPDATE_LEVEL = {
    type: LevelType,
    args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        title: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
    },
    async resolve(req: any, args: any) {
        const { user_id } = req;
        const userId = parseInt(user_id);
        const userReq = await existUser(userId);
        isProfesor(userReq.role);
        const { id, title, description } = args;
        await existLevel(id);
        await LevelEntity.update(id, { title: title, description: description });
        const result = await LevelEntity.findOne({ id: id });
        return result;
    }
}
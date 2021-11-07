import { GraphQLNonNull, GraphQLString, GraphQLID } from 'graphql';
import { LevelType } from '../typedefs/level-type';
import { LevelEntity } from '../../entities/level_entity';
import { existLevel, existUser } from '../../lib/tools/checks';
import { UserEntity } from '../../entities/user_entity';


export const CREATE_LEVEL = {
    type: LevelType,
    args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
    },
    async resolve(req: any, args: any) {
        // TODO: Validate user
        const { user_id } = req;
        const id = parseInt(user_id);
        const userReq = await existUser(id);
        if (userReq.role == "Profesor") {
            const { title, description } = args;
            const insertLevel = await LevelEntity.insert({ title: title, description: description });
            const level = await LevelEntity.findOne({ id: insertLevel.raw.insertId });
            return level;
        } else {
            throw new Error('Access denied');
        }
    }
}

export const DELETE_LEVEL = {
    type: LevelType,
    args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
    },
    async resolve(req: any, args: any) {
        // TODO: Validate user
        const { user_id } = req;
        const id = parseInt(user_id);
        const userReq = await existUser(id);
        if (userReq.role == "Profesor") {
            const { id } = args;
            await existLevel(id);
            await LevelEntity.delete(id);
        } else {
            throw new Error('Access denied');
        }
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
        // TODO: Validate user
        const { user_id } = req;
        const id = parseInt(user_id);
        const userReq = await existUser(id);
        if (userReq.role == "Profesor") {
            const { id, title, description } = args;
            await existLevel(id);
            await LevelEntity.update(id, { title: title, description: description });
            const result = await LevelEntity.findOne({ id: id });
            return result;
        } else {
            throw new Error('Access denied');
        }
    }
}
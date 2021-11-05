import { GraphQLNonNull, GraphQLString, GraphQLID } from 'graphql';
import { LevelType } from '../typedefs/level-type';
import { LevelEntity } from '../../entities/level_entity';
import { existLevel } from '../../lib/tools/checks';


export const CREATE_LEVEL = {
    type: LevelType,
    args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
    },
    async resolve(root: any, args: any) {
        // TODO: Validate user input
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
    async resolve(root: any, args: any) {
        // TODO: Validate user input
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
    async resolve(root: any, args: any) {
        // TODO: Validate user input
        const { id, title, description } = args;
        await existLevel(id);
        await LevelEntity.update(id, { title: title, description: description });
        const result = await LevelEntity.findOne({ id: id });
        return result;
    }
}
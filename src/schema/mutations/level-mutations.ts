import { GraphQLNonNull, GraphQLString, GraphQLID } from 'graphql';
import { LevelType } from '../typedefs/level-type';
import { LevelEntity } from '../../entities/level_entity';


export const CREATE_LEVEL = {
    type: LevelType,
    args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
    },
    async resolve(root: any, args: any) {
        const { title, description } = args;
        // TODO: Validate user input
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
        const { id } = args;
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
        const { id, title, description } = args;

        const level = await LevelEntity.findOne({ id: id });
        if (!level) {
            throw new Error('Level not found');
        }
        const updateLevel = await LevelEntity.update(id, { title: title, description: description });
        const result = await LevelEntity.findOne({ id: id });
        return result;
    }
}
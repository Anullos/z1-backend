import { GraphQLList } from 'graphql';
import { LevelType } from '../typedefs/level-type';
import { LevelEntity } from '../../entities/level_entity';

export const GET_ALL_LEVELS = {
    type: new GraphQLList(LevelType),
    async resolve() {
        const result = await LevelEntity.find({
            relations: ['lessons', 'lessons.texts'],
        }
        );
        if (!result) {
            return [];
        }
        return result;
    }
}
import { GraphQLList } from 'graphql';
import { LevelType } from '../typedefs/level-type';
import { LevelEntity } from '../../entities/level_entity';
import { existUser } from '../../lib/tools/checks';
import { isProfesor } from '../../lib/tools/security';

export const GET_ALL_LEVELS = {
    type: new GraphQLList(LevelType),
    async resolve(req: any) {
        const { user_id } = req;
        const userId = parseInt(user_id);
        const userReq = await existUser(userId);
        isProfesor(userReq.role);
        const result = await LevelEntity.find({
            relations: ['lessons', 'lessons.contents', 'lessons.contents.text'],
            order: {
                order: 'ASC'
            }
        }
        );
        if (!result) {
            return [];
        }
        return result;
    }
}
import { UserType } from '../typedefs/user-type';
import { GraphQLList } from 'graphql';
import { UserEntity } from '../../entities/user_entity';
import { UserModel } from '../../models/user-model';
import { existUser } from '../../lib/tools/checks';
import { isProfesor } from '../../lib/tools/security';

export const GET_ALL_USERS = {
    type: new GraphQLList(UserType),
    async resolve(req: any) {
        const { user_id } = req;
        const userId = parseInt(user_id);
        const userReq = await existUser(userId);
        isProfesor(userReq.role);
        const users = await UserEntity.find();
        var usersArray: UserModel[] = [];
        for (var i = 0; i < users.length; i++) {
            var texto = users[i].created_at.toString();
            console.log(texto);
            var user = new UserModel(
                users[i].id,
                users[i].name,
                users[i].email,
                users[i].password,
                users[i].role,
                users[i].created_at.toString(),
                users[i].updated_at.toString()
            );
            console.log(user);
            usersArray.push(user);
        }
        return usersArray;
    }
}
import { UserType } from '../typedefs/user-type';
import { GraphQLList } from 'graphql';
import { UserEntity } from '../../entities/user_entity';
import { UserModel } from '../../models/user-model';

export const GET_ALL_USERS = {
    type: new GraphQLList(UserType),
    async resolve(req: any) {
        const users = await UserEntity.find();
        var usersArray: UserModel[] = [];

        const { user_id } = req;
        const id = parseInt(user_id);
        const userReq = await UserEntity.findOne({ id: id });
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
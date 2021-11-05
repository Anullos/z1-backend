import { GraphQLNonNull, GraphQLString, GraphQLID } from 'graphql';
import { UserType } from "../typedefs/user-type";
import { UserEntity } from '../../entities/user_entity';
import { UserModel } from '../../models/user-model';


export const CREATE_USER = {
    type: UserType,
    args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        role: { type: new GraphQLNonNull(GraphQLString) },
    },
    async resolve(root: any, args: any) {
        const { name, email, password, role } = args;
        const now = new Date();

        const insertUser = await UserEntity.insert({ name: name, email: email, password: password, role: role, created_at: now, updated_at: now });
        const newUser = await UserEntity.findOne({ id: insertUser.raw.insertId });
        var result = new UserModel(
            newUser?.id!,
            newUser?.name!,
            newUser?.email!,
            newUser?.password!,
            newUser?.role!,
            newUser?.created_at.toString()!,
            newUser?.updated_at.toString()!
        );
        return result;

    }
}

export const DELETE_USER = {
    type: UserType,
    args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
    },
    async resolve(root: any, args: any) {
        const { id } = args;
        await UserEntity.delete(id);
    }
}

export const UPDATE_NAME = {
    type: UserType,
    args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: new GraphQLNonNull(GraphQLString) }
    },
    async resolve(root: any, args: any) {
        const { id, name } = args;
        await UserEntity.update(id, { name: name });
    }
    // throw new Error('Mostrando error.');
}
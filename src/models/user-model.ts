
export class UserModel {
    id: number;
    name: string;
    email: string;
    password: string;
    role: string;
    createdAt: string;
    updatedAt: string;

    constructor(id: number, name: string, email: string, password: string, role: string, created_at: string, updated_at: string) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
        this.createdAt = created_at;
        this.updatedAt = updated_at;
    }

}
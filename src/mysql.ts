import { createConnection } from "typeorm";
import { LevelEntity } from "./entities/level_entity";
import { UserEntity } from './entities/user_entity';
import { LessonEntity } from './entities/lesson_entity';
import { TextEntity } from './entities/text_entity';


export async function startConnection() {
  createConnection({
    type: 'mysql',
    host: process.env.DB_HOSTNAME,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    logging: true,
    synchronize: false,
    entities: [UserEntity, LevelEntity, LessonEntity, TextEntity],
}).then(() => {
    console.log('Connection to MySQL.');
}
).catch((error) => {
    console.log('Unable to connect to the database:', error);
});
}
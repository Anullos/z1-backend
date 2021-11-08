import { ContentEntity } from '../../entities/content_entity';
import { LessonEntity } from '../../entities/lesson_entity';
import { LevelEntity } from '../../entities/level_entity';
import { QuizEntity } from '../../entities/quiz_entity';
import { TextEntity } from '../../entities/text_entity';
import { UserEntity } from '../../entities/user_entity';


export async function existUser(id: number): Promise<UserEntity> {
    const result = await UserEntity.findOne({ id: id });
    if (!result) {
        throw new Error('User not found');
    }
    return result;
}

export async function existLevel(id: number): Promise<LevelEntity> {
    const result = await LevelEntity.findOne({ id: id });
    if (!result) {
        throw new Error('Level not found');
    }
    return result;
}

export async function existLesson(id: number): Promise<LessonEntity> {
    const result = await LessonEntity.findOne({ id: id });
    if (!result) {
        throw new Error('Lesson not found');
    }
    return result;
}

export async function existContent(id: number): Promise<ContentEntity> {
    const result = await ContentEntity.findOne({ id: id });
    if (!result) {
        throw new Error('Content not found');
    }
    return result;
}

export async function existText(id: number): Promise<TextEntity> {
    const result = await TextEntity.findOne({ id: id });
    if (!result) {
        throw new Error('Text not found');
    }
    return result;
}

export async function existQuiz(id: number): Promise<QuizEntity> {
    const result = await QuizEntity.findOne({ id: id });
    if (!result) {
        throw new Error('Quiz not found');
    }
    return result;
}

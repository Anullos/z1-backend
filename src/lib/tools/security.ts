


export function isProfesor(role: string) {
    if (role !== 'Profesor') {
        throw new Error('Access denied');
    }
    return true;
}

export function isEstudiante(role: string) {
    if (role !== 'Estudiante') {
        throw new Error('Access denied');
    }
    return true;
}
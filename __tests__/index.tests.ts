import axios from 'axios';

describe('Probar registro de usuario', () => {

    test('Debería devolver el usuario registrado', async () => {
        const response  = await axios.post(
            'http://localhost:4000/api/v1/auth/signup',
            {
                name: 'daniel',
                email: 'dani2@dani.es', // Change eamil for each test, email must to be unique
                password: '123456',
                confirm_password: '123456',
                role: 'Profesor',
            }
        );
        expect(response.status).toBe(200)
        expect(response.data).toBeDefined()
        expect(response.data.user.id).toBeDefined()
    })
});
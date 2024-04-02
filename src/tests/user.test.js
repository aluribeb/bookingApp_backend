const request = require('supertest');
const app = require('../app');

let id;
let token;

test('POST /users debe crear un usuario', async () => {
    const body = {
        firstName: 'Luisa',
        lastName: 'Spielberg',
        email: 'luisa@gmail.com',
        password: 'luisa1234',
        gender: 'FEMALE',
    }
    const res = await request(app).post('/users').send(body);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.firstName).toBe(body.firstName);
    expect(res.body.id).toBeDefined();
});

test('POST /users/login debe hacer un login', async () => {
    const body = {
        email: 'luisa@gmail.com',
        password: 'luisa1234',
    }
    const res = await request(app).post('/users/login').send(body);
    token = res.body.token;
    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
    expect(res.body.user.email).toBe(body.email);
});

test('GET /users, se debe traer todos los usuarios', async () => {
    const res = await request(app)
        .get('/users')
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('PUT /users/:id, se debe actualizar un sólo usuario', async () => {
    const body = {
        firstName: 'Luisa2'
    }
    const res = await request(app).put(`/users/${id}`)
        .send(body)
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(body.firstName);
});

test('POST /users/login, si son credenciales no validas, debe enviar error', async () => {
    const body = {
        email: 'incorrecto@gmail.com',
        password: 'incorrecto',
    }
    const res = await request(app).post('/users/login').send(body);
    expect(res.status).toBe(401);
});

test('DELETE /users/:id, se debe eliminar un usuario', async () => {
    const res = await request(app)
        .delete(`/users/${id}`)
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
});
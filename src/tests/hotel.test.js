const request = require('supertest')
const app = require('../app.js')

let id;
let token;

beforeAll(async() => {
    const res = await request(app).post('/users/login').send({
        email: 'test@gmail.com',
        password: 'test1234'
    })
    token = res.body.token
})

test('GET /hotel', async () => {
    const res = await request(app).get('/hotel');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST/ hotel', async () => {
    const body = {
        name: "test",
        description: "test",
        Price: 743,
        Address: "test",
        lat: 48.875838090473664,
        lon: 2.300348641089383
        }
    const res = await request(app).post('/hotel')
        .send(body)
        .set('Authorization', `Bearer ${token}`)
    id = res.body.id
    expect(res.status).toBe(201)
    expect(res.body.id).toBeDefined()
    expect(res.body.name).toBe(body.name)
});

test('DELETE/ hotel/:id elimina un hotel', async () => {
    const res = await request(app)
        .delete(`/hotel/${id}`)
        .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(204);
});

test('PUT/ hotel/:id, actualizar un usuario', async () => {
    const body = {
        Address: "test"
    }
    const res = await request(app).put(`/hotel/${id}`)
        .send(body)
        .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200);
    expect(res.body.Address).toBe(body.Address);
});
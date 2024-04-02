const request = require('supertest')
const app = require('../app')

let id;
let token;

beforeAll(async () => {
    const res = await request(app).post('/users/login').send({
        email: "test@gmail.com", 
        password: "test1234", 
    })
    token = res.body.token
})

test('GET/bookings', async () => {
    const res = await request(app)
        .get('/bookings')
        .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST/bookings', async () => {
    const body = {
        checkIn: '2025-08-16',
        checkOut: '2025-09-17', 
        hotelId:1
    }
    const res = await request(app)
        .post('/bookings')
        .send(body)
        .set('Authorization', `Bearer ${token}`)
    id = res.body.id
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.checkIn).toBe(body.comment);
});

test('PUT /bookings', async () => {
    const body = {
        checkIn: "2020-06-01"
    }
    const res = await request(app)
        .put(`/bookings/${id}`)
        .send(body)
        .set("Authorization", `Bearer ${token}`)
    expect(res.status).toBe(200);
    expect(res.body.checkIn).toBe(body.checkIn);
});

test('DELETE/bookings ', async () => {
    const res = await request(app)
        .delete(`/bookings/${id}`)
        .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(204);
});
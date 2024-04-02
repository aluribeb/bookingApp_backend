const request = require('supertest');
const app = require('../app');

let token;
let id;

beforeAll(async()=>{
    const res = await request(app).post('/users/login').send({
        email:'test@gmail.com',
        password:'test1234'
    });
    console.log(res.body);
   token = res.body.token;
});

test('Get /city debe retornar un status 200', async () => {
    const res = await request(app).get('/city');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /city debe crear una ciudad', async () => {
    const body ={
        name:'Bogota',
        country:'Colombia',
        countryId:'CO'
    }
    const res = await request(app)
        .post('/city')
        .send(body)
        .set('Authorization', `Bearer ${token}`);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(body.name);
});

test('PUT /city/:id debe permitir actualizar una ciudad por su id', async () => {
    const body ={
        name:'Bogota D.C.'
    };
    const res = await request(app).put(`/city/${id}`)
        .send(body)
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(body.name);
});

test('DELETE /city/:id debe eliminar la ciudad por su id', async () => {
    const res = await request(app)
        .delete(`/city/${id}`)
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
});
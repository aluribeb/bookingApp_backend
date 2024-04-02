const request = require('supertest');
const app = require('../app');

let token;
let id;

beforeAll(async()=>{
    const res = await request(app).post('/users/login').send({
        email:'test@gmail.com',
        password:'test1234'
    });
   token = res.body.token;
});

test('GET / reviews', async () => {
    const res = await request(app).get('/reviews')
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Object);
    
});

test('POST/ reviews', async () => {
    const body = {
        rating:5,
        comment: 'Great!',
        hotelId:1
    }
    const res = await request(app)
        .post('/reviews')
        .set('Authorization',`Bearer ${token}`)
        .send(body)
    id=res.body.id;
    console.log(id);
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined()
    expect(res.body.rating).toBe(body.rating);
});

test('PUT/reviews', async () => {
    const body = {
        rating: 4
    }
    const res = await request(app)
        .put(`/reviews/${id}`)
        .set('Authorization', `Bearer ${token}`)
        .send(body)
    expect(res.status).toBe(200);
    expect(res.body.rating).toBe(body.rating);
});

test('DELETE/reviews/:id', async () => {
    const res = await request(app)
      .delete(`/reviews/${id}`)
      .set('Authorization', `Bearer ${token}`);
  
    expect(res.status).toBe(204);
    
});
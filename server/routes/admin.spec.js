// const request = require('supertest');
// const app = require('./admin'); 

// describe('GET /admin', () => {
//   it('responds with status 200', async () => {
//         const response = await request(app).get('/admin');
//         expect(response.statusCode).toEqual(200);
//   });
// });

// describe('GET /dashboard', () => {
//     it('responds with status 200', async () => {
//         const response = await request(app).get('/dashboard');
//         expect(response.statusCode).toEqual(200);
//     });
// });

// describe('GET /add-post', () => {
//     it('responds with status 200', async () => {
//         const response = await request(app).get('/add-post');
//         expect(response.statusCode).toEqual(200);
//     });
// });

// describe('GET /edit-post/:id', () => {
//     it('responds with status 200', async () => {
//         const response = await request(app).get('/edit-post/65d813b890a8d32fe0ba10ce'); // Replace 123 with a valid post ID
//         expect(response.statusCode).toEqual(200);
//     });
// });

// describe('POST /add-post', () => {
//     it('responds with status 200', async () => {
//         const response = await request(app)
//             .post('/add-post')
//             .send({ title: 'Test Post', body: 'This is a test post.' });
//         expect(response.statusCode).toEqual(200);
//     });
// });

// describe('PUT /edit-post/:id', () => {
//     it('responds with status 200', async () => {
//         const response = await request(app)
//             .put('/edit-post/65d813b890a8d32fe0ba10ce') 
//             .send({ title: 'Updated Post', body: 'This post has been updated.' });
//         expect(response.statusCode).toEqual(200);
//     });
// });

// describe('DELETE /delete-post/:id', () => {
//     it('responds with status 200', async () => {
//         const response = await request(app).delete('/delete-post/65d813b890a8d32fe0ba10ce'); 
//         expect(response.statusCode).toEqual(200);
//     });
// });

// describe('GET /register', () => {
//     it('responds with status 200', async () => {
//         const response = await request(app).get('/register');
//         expect(response.statusCode).toEqual(200);
//     });
// });

// describe('GET /logout', () => {
//     it('responds with status 200', async () => {
//         const response = await request(app).get('/logout');
//         expect(response.statusCode).toEqual(200);
//     });
// });

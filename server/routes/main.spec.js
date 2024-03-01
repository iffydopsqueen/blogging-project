const request = require('supertest');
const app = require('./main');

describe('GET /', () => {
    it('responds with status 200', async () => {
        const response = await request(app).get('/');
        expect(response.page).toEqual(1);
    });
});

// describe('GET /post/:id', () => {
//     it('responds with status 200', async () => {
//         const response = await request(app).get("/post/65d813b890a8d32fe0ba10ce");
//         expect(response.statusCode).toEqual(200);
//     });
    
// });

// describe('POST /search', () => {
//     it('responds with status 200', async () => {
//         const response = await request(app)
//             .post('/search')
//             .send({ searchTerm: 'node' }); 
//         expect(response.statusCode).toEqual(200);
//     });
// });


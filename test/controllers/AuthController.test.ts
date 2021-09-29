import { expect } from 'chai';
import a from '../../src/server';
import { agent as request } from 'supertest';

// it('should POST api/v1/auth/login', async function (done) {
//     const data = {
//         "grantType": "password",
//         "username": "user",
//         "password": "a123321",
//         "clientId": "admin-cli"
//     }
//     await request(a).get('api/v1/auth/login')
//         .send(data).set('Accept', 'application/json')
//         .expect(200)
//         .end((err) => {
//             if (err) return done(err);
//             done()
//         })
// });
it('should GET api/v1/auth/login', function (done) {
    request(a).get('api/v1/auth/login')
        .set('Accept', 'application/json')
        .expect(200)
        .end((res) => { console.log(res); done() })
}
);
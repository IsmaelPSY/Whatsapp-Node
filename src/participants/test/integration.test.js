const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../../app').app
const {
    describe,
    it
} = require('mocha');

chai.use(chaiHttp)

describe('Suite de testing de integracion para participantes', () => {

    it('Should return 200 when data exist', (done) => {
        chai.request(app)
            .get('/api/v1/conversations/cf7e39cc-5466-4768-8426-4d7ce5979aff/participants')
            .end((err, res) => {
                chai.assert.equal(res.status, 200)
                done()
            })
    });

    it('Should return 200 when data exist', (done) => {
        chai.request(app)
            .post('/api/v1/conversations/cf7e39cc-5466-4768-8426-4d7ce5979aff/participants')
            .set('content-type', 'application/json')
            .send({
                corversation_id: "cf7e39cc-5466-4768-8426-4d7ce5979aff",
                user_id: "df971777-ad98-4574-b2df-f6e2eec6e0b2"
            })
            .end((err, res) => {
                chai.assert.equal(res.status, 201)
                done()
            })
    });

    
})
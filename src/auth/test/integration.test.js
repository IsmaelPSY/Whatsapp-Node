const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../../app').app
const { describe, it} = require('mocha');

chai.use(chaiHttp)

describe('Suite de testing de integracion para autorizaciones (auth)', () => {

  it('Should return 400 when no jwt available', (done) => {
    chai.request(app)
      .get('/api/v1/auth/login')
      .end((err, res) => {
        chai.assert.equal(res.status, 400)
        done()
      })
  })

  it('Should return 400 when no data id provided', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .end((err, res) => {
        chai.assert.equal(res.status, 400)
        done()
      })
  })

  it('Should reutn 200 when jwt is valid', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .set("content-type", "application/json")
      .send({
        "email": "ismael@cademlo.com",
        "password": "lansfs"
      })
      .end((err, res) => {
        chai.assert.equal(res.status, 200)
        chai.assert.typeOf(res.body.token, 'string')
        done()
      })
  })

  it('Should reutn 200 when data is valid', (done) => {
    chai.request(app)
      .get('/api/v1/auth/login')
      .set("content-type", "application/json")
      .send({
        "email": "ismael@cademlo.com",
        "password": "lansfs"
      })
      .end((err, res) => {
        chai.assert.equal(res.status, 200)
        chai.assert.typeOf(res.body, 'object')
        done()
      })
  })

  it('Should reutn 201 when user has been created', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .set("content-type", "application/json")
      .send({
        "firstname": "billy",
        "lastname": "niño",
        "email": "bfix@academlo.com",
        "password": "campagnoli",
        "profile_image": "",
        "phone": "23625634",
      })
      .end((err, res) => {
        chai.assert.equal(res.status, 201)
        chai.assert.typeOf(res.body, 'object')
        done()
      })
  })
})
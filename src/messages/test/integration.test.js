const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../../app').app
const { describe, it, before } = require('mocha');
const users = require('../../database/models/users');

chai.use(chaiHttp)

describe('Suite de testing de integracion para Messages', () => {

  it('Should return 400 when message data has no provided', (done) => {
    chai.request(app)
      .get('/api/v1/conversations/dabb9204-09d9-40f3-8cd3-1004e0208bf7/message')
      .end((err, res) => {
        chai.assert.equal(res.status, 400)
        done()
      })
  })

  it('Should return 200 when message info has provided', (done) => {
    chai.request(app)
      .get('/api/v1/conversations/eabb9204-09d9-40f3-8cd3-1004e0208bf7/message')
      .set('Authorization', 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjJjM2FjNDIyLTkzMDktNGRmZi04MGNhLTg4MjQwOTFkZTk4MiIsImVtYWlsIjoiYWxpdmllcnpAY2FkZW1sby5jb20iLCJpYXQiOjE2NTYwOTEzMjN9.6S2TjFtcFx4pBUMdOHDWB7u87UPeaHIy4SLDG4NqDG4')
      .end((err, res) => {
        chai.assert.equal(res.status, 200)
        done()
      })
  })

  it('Should return 200 when message has created successfully', (done) => {
    chai.request(app)
      .post('/api/v1/conversations/eabb9204-09d9-40f3-8cd3-1004e0208bf7/message')
      .set('Authorization', 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjJjM2FjNDIyLTkzMDktNGRmZi04MGNhLTg4MjQwOTFkZTk4MiIsImVtYWlsIjoiYWxpdmllcnpAY2FkZW1sby5jb20iLCJpYXQiOjE2NTYwOTEzMjN9.6S2TjFtcFx4pBUMdOHDWB7u87UPeaHIy4SLDG4NqDG4')
      .end((err, res) => {
        chai.assert.equal(res.status, 200)
        done()
      })
  })
})
const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../../app').app
const { describe, it, before } = require('mocha');
const users = require('../../database/models/users');

chai.use(chaiHttp)

describe('Suite de testing de integracion para Users', () => {

  it('Should return 401 when user has no authorization', (done) => {
    chai.request(app)
      .get('/api/v1/users/1')
      .end((err, res) => {
        chai.assert.equal(res.status, 401)
        done()
      })
  })

  it('Should return 200 when user info has shown', (done) => {
    chai.request(app)
      .get('/api/v1/users/fd24928e-903d-4bcc-8c5f-e19f7ae62da6')
      .set('Authorization', 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjJjM2FjNDIyLTkzMDktNGRmZi04MGNhLTg4MjQwOTFkZTk4MiIsImVtYWlsIjoiYWxpdmllcnpAY2FkZW1sby5jb20iLCJpYXQiOjE2NTYwOTEzMjN9.6S2TjFtcFx4pBUMdOHDWB7u87UPeaHIy4SLDG4NqDG4')
      .end((err, res) => {
        chai.assert.equal(res.status, 200)
        done()
      })
  })

  it('Should reutn 200 when user is authorized', (done) => {
    chai.request(app)
      .get('/api/v1/users/me')
      .set('Authorization', 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjJjM2FjNDIyLTkzMDktNGRmZi04MGNhLTg4MjQwOTFkZTk4MiIsImVtYWlsIjoiYWxpdmllcnpAY2FkZW1sby5jb20iLCJpYXQiOjE2NTYwOTEzMjN9.6S2TjFtcFx4pBUMdOHDWB7u87UPeaHIy4SLDG4NqDG4')
      .end((err, res) => {
        chai.assert.equal(res.status, 200)
        chai.assert.typeOf(res.body, 'object')
        done()
      })
  })

  it('Should return 401 when admin has no authorization to view personal profile info', (done) => {
    chai.request(app)
      .get('/api/v1/users/me')
      .end((err, res) => {
        chai.assert.equal(res.status, 401)
        done()
      })
  })

  it('Should return 200 when users data provided', (done) => {
    chai.request(app)
      .get('/api/v1/users')
      .end((err, res) => {
        chai.assert.equal(res.status, 200)
        done()
      })
  })

  it('Should reutn 200 when user information has edited', (done) => {
    chai.request(app)
      .put('/api/v1/users/6973d691-4dcd-400a-bd79-05e7b392d7f1')
      .set('Authorization', 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUzMGVmNDBmLTE2MDktNDc3ZS04OGQ5LTYwNzRkZjM5MDBiNiIsImVtYWlsIjoianVhbmZAYWNhZGVtbG8uY29tIiwiaWF0IjoxNjU2MDkzNzE3fQ.fIAthzSWAeXl1EpUFbEUW55Wr32kJmBL43eMuYSM6pQ')
      .send({
        "firstname": "juan",
        "lastname": "franco",
        "email": "juanf@academlo.com",
        "password": "boenas",
        "profile_image": "",
        "phone": "123456789"
      })
      .end((err, res) => {
        chai.assert.equal(res.status, 200)
        chai.assert.typeOf(res.body, 'object')
        done()
      })
  })

  it('Should reutn 202 when user information has deleted', (done) => {
    chai.request(app)
      .delete('/api/v1/users/7601129c-bf0c-4bcd-956f-8bc158c31bfe')
      .set('Authorization', 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjFkODhkMzc2LTgxYmEtNDYzNS04YjkwLTUwYjE1YWY3MGM1YiIsImVtYWlsIjoid2lsbWFyckBjYWRlbWxvLmNvbSIsImlhdCI6MTY1NjA5NzIzMH0.cjMwui9OILsxfuZHZmcHog7Nc5MXE39zjT1YqadrRB4')
      .end((err, res) => {
        chai.assert.equal(res.status, 202)
        done()
      })
  })

  it('Should reutn 400 when user information has no deleted', (done) => {
    chai.request(app)
      .delete('/api/v1/users/27666de3-4095-43d4-be8c-ea6f7eb59c56')
      .set('Authorization', 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjFkODhkMzc2LTgxYmEtNDYzNS04YjkwLTUwYjE1YWY3MGM1YiIsImVtYWlsIjoid2lsbWFyckBjYWRlbWxvLmNvbSIsImlhdCI6MTY1NjA5NzIzMH0.cjMwui9OILsxfuZHZmcHog7Nc5MXE39zjT1YqadrRB4')
      .end((err, res) => {
        chai.assert.equal(res.status, 400)
        done()
      })
  })
})
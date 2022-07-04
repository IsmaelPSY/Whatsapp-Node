const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../../app').app
const {
  describe,
  it
} = require('mocha');

chai.use(chaiHttp)

describe('Suite de testing de integracion para conversaciones', () => {

  it('Should return 200 when data exist', (done) => {
    chai.request(app)
      .get('/api/v1/conversations')
      .end((err, res) => {
        chai.assert.equal(res.status, 200)
        done()
      })
  });

  it('Should return 200 when data is valid', (done) => {
    chai.request(app)
      .get('/api/v1/conversations/eabb9204-09d9-40f3-8cd3-1004e0208bf7')
      .set('Authorization', 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjJjM2FjNDIyLTkzMDktNGRmZi04MGNhLTg4MjQwOTFkZTk4MiIsImVtYWlsIjoiYWxpdmllcnpAY2FkZW1sby5jb20iLCJpYXQiOjE2NTYwOTEzMjN9.6S2TjFtcFx4pBUMdOHDWB7u87UPeaHIy4SLDG4NqDG4')
      .end((err, res) => {
        chai.assert.equal(res.status, 200)
        done()
      })
  });


  it('Should return 401 when user has no authorization', (done) => {
    chai.request(app)
      .get('/api/v1/conversations/:uuid')
      .end((err, res) => {
        chai.assert.equal(res.status, 401)
        done()
      })
  });

  it('Should return 201 when data is sent correctly', (done) => {
    chai.request(app)
      .post('/api/v1/conversations')
      .set('content-type', 'application/json')
      .send({
        title: "prueba para eliminar",
        image_url: "",
        created_by: "16f764f0-d759-4e4c-98a9-f477cf08bdcc"
      })
      .end((err, res) => {
        chai.assert.equal(res.status, 201)
        done()
      })
  });

  it('Should return 400 when the data does not exist ', (done) => {
    chai.request(app)
      .post('/api/v1/conversations')

      .send({

      })
      .end((err, res) => {
        chai.assert.equal(res.status, 400)
        done()
      })
  });

  it('Should return 200 when data is sent correctly', (done) => {
    chai.request(app)
      .put('/api/v1/conversations/eabb9204-09d9-40f3-8cd3-1004e0208bf7')
      .set('Authorization', 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjJjM2FjNDIyLTkzMDktNGRmZi04MGNhLTg4MjQwOTFkZTk4MiIsImVtYWlsIjoiYWxpdmllcnpAY2FkZW1sby5jb20iLCJpYXQiOjE2NTYwOTEzMjN9.6S2TjFtcFx4pBUMdOHDWB7u87UPeaHIy4SLDG4NqDG4')
      .send({
        title: "prueba de que salio bien",
        image_url: "",
        created_by: "da6def50-8ba4-4789-9256-2c514a36c0bd"
      })
      .end((err, res) => {
        chai.assert.equal(res.status, 200)
        done()
      })
  });



  it('Should return 202 when the data is removed successfully', (done) => {
    chai.request(app)
      .delete('/api/v1/conversations/1058f1fa-b563-44a7-af45-f85238069592')
      .set('Authorization', 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImRhNmRlZjUwLThiYTQtNDc4OS05MjU2LTJjNTE0YTM2YzBiZCIsImVtYWlsIjoiam1veWFAYWNhZGVtbG8uY29tIiwiaWF0IjoxNjU2MDkxNTU5fQ.TSvME9SZP8e8d53J3B_ltY8V76xpsFr3iBQZ3jcTW0o')
      .end((err, res) => {
        chai.assert.equal(res.status, 202)
        done()
      })
  });

  it('Should return 400 when the uuid does not exit', (done) => {
    chai.request(app)
      .delete('/api/v1/conversations/18c67ee5-b688-440b-9ee1-fa15b50741bc')
      .set('Authorization', 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImRhNmRlZjUwLThiYTQtNDc4OS05MjU2LTJjNTE0YTM2YzBiZCIsImVtYWlsIjoiam1veWFAYWNhZGVtbG8uY29tIiwiaWF0IjoxNjU2MDkxNTU5fQ.TSvME9SZP8e8d53J3B_ltY8V76xpsFr3iBQZ3jcTW0o')
      .end((err, res) => {
        chai.assert.equal(res.status, 400)
        done()
      })
  });


})
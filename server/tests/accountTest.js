import chai from 'chai';
import chaiHttp from 'chai-http';
import server from './../app';

chai.use(chaiHttp);
chai.should();

describe('Bank account testing', () => {
  it('should be able to create new bank account', (done) => {
    const newAccount = {
      email: "willy@gmail.com",
      type: 'savings'
    };
    chai.request(server)
      .post('/api/v1/accounts')
      .send(newAccount)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        done();
      });
  })

  it('should be not able to create new bank account', (done) => {
    const newAccount = {
      email: "jgsjZK@gmail.com",
      type: 'savings'
    };
    chai.request(server)
      .post('/api/v1/accounts')
      .send(newAccount)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.an('object');
        done();
      });
  })

  it('should be able to activate or deactivate', (done) => {
    const newAccount = {
      id: 2
    };
    chai.request(server)
      .patch(`/api/v1/accounts/${newAccount.id}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        done();
      });
  })

  it("should debit to a specific account", done => {
    const acc = 1;
    const amount = "20000";
    chai.request(server)
      .post(`/api/v1/accounts/${acc}/debit`)
      .send(amount)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        done();
      });
  })

  it("should credit to a specific account", done => {
    const acc = 1;
    const amount = "20000";
    chai.request(server)
      .post(`/api/v1/accounts/${acc}/credit`)
      .send(amount)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        done();
      });
  })

  it("should delete an account", done => {
    const account = 2;
    chai.request(server)
      .delete(`/api/v1/accounts/${account}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        done();
      });
  })
})
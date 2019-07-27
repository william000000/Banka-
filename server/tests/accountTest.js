import chai from 'chai';
import chaiHttp from 'chai-http';
import server from './../app';

chai.use(chaiHttp);
chai.should();

describe('Bank account testing', () => {
  it('should be able to create new bank account', (done) => {
    const newAccount = {
      email: "willy@gmail.com",
      type: "saving",
      amount: 3000
    };
    chai.request(server)
      .post('/api/v1/accounts')
      .send(newAccount)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.an('object');
        done();
      });
  })
  it('should not be able to create new bank account when user not exist', (done) => {
    const newAccount = {
      email: "wix@gmail.com",
      type: "saving",
      amount: 3000
    };
    chai.request(server)
      .post('/api/v1/accounts')
      .send(newAccount)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.an('object');
        done();
      });
  })

  it('should be not able to create new bank account when email is not known in the systm and invald type', (done) => {
    const newAccount = {
      email: "jgsjZK@gmail.com",
      type: 'savings',
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

  it('should be not able to create new bank account when invalid email ', (done) => {
    const newAccount = {
      email: "jgsjZKgmail.com",
      type: 'saving',
      amount: 3000
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
  it('should be not able to create new bank account when invalid amount ', (done) => {
    const newAccount = {
      email: "willy@gmail.com",
      type: 'saving',
      amount: 'a7000'
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

  it('should not be able to activate or deactivate when user not exists', (done) => {
    const newAccount = {
      id: -2
    };
    chai.request(server)
      .patch(`/api/v1/accounts/${newAccount.id}`)
      .end((err, res) => {
        res.should.have.status(404);
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

  it("should not debit to a specific account when user not exist", done => {
    const acc = -1;
    const amount = "20000";
    chai.request(server)
      .post(`/api/v1/accounts/${acc}/debit`)
      .send(amount)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.an('object');
        done();
      });
  })

  // it("should not debit to a specific account when amount on bank not enough", done => {
  //   const acc = 1;
  //   const amount = '20000';
  //   chai.request(server)
  //     .post(`/api/v1/accounts/${acc}/debit`)
  //     .send(parseFloat(amount))
  //     .end((err, res) => {
  //       res.should.have.status(403);
  //       res.body.should.be.an("object");
  //       done();
  //     });
  // })

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

  it("should not credit to a specific account when amount less than zero ", done => {
    const acc = 1;
    const a = {
      amount: -20000
    };
    chai.request(server)
      .post(`/api/v1/accounts/${acc}/credit`)
      .send(a)
      .end((err, res) => {
        res.should.have.status(403);
        res.body.should.be.an('object');
        done();
      });
  })
  it("should not credit to a specific account when user not exist ", done => {
    const acc = -1;
    const amount = "20000";
    chai.request(server)
      .post(`/api/v1/accounts/${acc}/credit`)
      .send(amount)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.an('object');
        done();
      });
  })

  it("should view all account when he is admin ", done => {
   const Token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJlbGllQGdtYWlsLmNvbSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTU2NDA1NDg0Nn0.kJpYd_-Vr9p0s3Wk5j9dVkaJqZl3uQUxL3ImPh30K6s';
    chai.request(server)
      .get(`/api/v1/accounts/all`)
      .set('token',Token)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        done();
      });
  })
  it("should not view all account when he is not an admin ", done => {
    const Token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNTY0MDE0NzQ5fQ.qlcFOicH3jPlYTJyxyuZkh5ePaqUv5eMVKPjFRqITBo';
     chai.request(server)
       .get(`/api/v1/accounts/all`)
       .set('token',Token)
       .end((err, res) => {
         res.should.have.status(403);
         res.body.should.be.an('object');
         done();
       });
   })

  
  it("should not delete an account whn he is not an admin or the owner", done => {
    const account = 2;
    const tokn = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ3aWxseUBnbWFpbC5jb20iLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNTY0MjMwOTI5fQ.8wPkrJhYYvz7JY2wIG5Chdp0qCgMdQf3Id8QgiVUWIw'

    chai.request(server)
      .delete(`/api/v1/accounts/${account}`)
      .set('token', tokn)
      .end((err, res) => {
        res.should.have.status(403);
        res.body.should.be.an('object');
        done();
      });
  })

  it("should not delete an account whn invalid token", done => {
    const account = 1;
    const tokn = 'JhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ3aWxseUBnbWFpbC5jb20iLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNTY0MjMwOTI5fQ.8wPkrJhYYvz7JY2wIG5Chdp0qCgMdQf3Id8QgiVUWIw'

    chai.request(server)
      .delete(`/api/v1/accounts/${account}`)
      .set('token', tokn)
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.be.an('object');
        done();
      });
  })
  it("should not delete an account when id not exist", done => {
    const accountNumber = -1;
    const tokn = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNTY0MDE0NzQ5fQ.qlcFOicH3jPlYTJyxyuZkh5ePaqUv5eMVKPjFRqITBo';

    chai.request(server)
      .delete(`/api/v1/accounts/${accountNumber}`)
      .set('token', tokn)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.an('object');
        done();
      });
  })

  it("should delete an account", done => {
    const account = 2;
    const tokn = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJlbGllQGdtYWlsLmNvbSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTU2NDIyOTc0MX0.RNg3BBf3Q19-2XKzMA2vhU_h7wWorWhwdf1K959yIAI'
    chai.request(server)
      .delete(`/api/v1/accounts/${account}`)
      .set('token', tokn)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        done();
      });
  })
  it("should delete any account regardless of owner when he is an admin", done => {
    const account = 1;
    const tokn = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJlbGllQGdtYWlsLmNvbSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTU2NDIyOTc0MX0.RNg3BBf3Q19-2XKzMA2vhU_h7wWorWhwdf1K959yIAI'
    chai.request(server)
      .delete(`/api/v1/accounts/${account}`)
      .set('token', tokn)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        done();
      });
  })  

})
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../app';

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

  it('should not be able to activate or deactivate when user not exist', (done) => {
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

  // it("should view all account when he is admin ", done => {
  //   chai.request(server)
  //     .get(`/api/v1/accounts/all`)
  //     .set('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJlbGllQGdtYWlsLmNvbSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTU2NzM3NDc3Nn0.r_J0WsSf3F4JdRdtqDeeOCZJaL9584HV1CiQAnbBFXY')
  //     .end((err, res) => {
  //       res.should.have.status(200);
  //       res.body.should.be.an('object');
  //       done();
  //     });
  // })
  // it("should not view all account when he is not an admin ", done => {
  //    chai.request(server)
  //      .get(`/api/v1/accounts/all`)
  //      .set('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ3aWxseUBnbWFpbC5jb20iLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNTY3Mzc0ODcwfQ.SPspreAlLNhOPODKjQ7vTR5depyBJyw2aKiIa3mBFes')
  //      .end((err, res) => {
  //        res.should.have.status(403);
  //        res.body.should.be.an('object');
  //        done();
  //      });
  //  })

  
  // it("should not delete an account whn he is not an admin or the owner", done => {
  //   const account = 2;

  //   chai.request(server)
  //     .delete(`/api/v1/accounts/${account}`)
  //     .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ3aWxseUBnbWFpbC5jb20iLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNTY3Mzc0ODcwfQ.SPspreAlLNhOPODKjQ7vTR5depyBJyw2aKiIa3mBFes')
  //     .end((err, res) => {
  //       res.should.have.status(403);
  //       res.body.should.be.an('object');
  //       done();
  //     });
  // })

  it("should not delete an account whn invalid token", done => {
    const account = 1;

    chai.request(server)
      .delete(`/api/v1/accounts/${account}`)
      .set('token', 'yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9wiZW1haWwiOiJ3aWxseUBnbWFpbC5jb20iLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNTY3Mzc0ODcwfQ.SPspreAlLNhOPODKjQ7vTR5depyBJyw2aKiIa3mBFes')
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.be.an('object');
        done();
      });
  })
  // it("should not delete an account when id not exist", done => {
  //   const accountNumber = -0;

  //   chai.request(server)
  //     .delete(`/api/v1/accounts/${accountNumber}`)
  //     .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJlbGllQGdtYWlsLmNvbSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTU2NzM3NDk1MX0.Skt95aOIekSCMkbbaEz-38d8GGvqnZRkdaluUVdMC2g')
  //     .end((err, res) => {
  //       res.should.have.status(404);
  //       res.body.should.be.an('object');
  //       done();
  //     });
  // })

  // it("should delete an account", done => {
  //   const account = 2;
  
  //   chai.request(server)
  //     .delete(`/api/v1/accounts/${account}`)
  //     .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJlbGllQGdtYWlsLmNvbSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTU2NzM3NDk1MX0.Skt95aOIekSCMkbbaEz-38d8GGvqnZRkdaluUVdMC2g')
  //     .end((err, res) => {
  //       res.should.have.status(200);
  //       res.body.should.be.an('object');
  //       done();
  //     });
  // })
  // it("should delete any account regardless of owner when he is an admin", done => {
  //   const account = 1;
  //   chai.request(server)
  //     .delete(`/api/v1/accounts/${account}`)
  //     .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJlbGllQGdtYWlsLmNvbSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTU2NzM3NDk1MX0.Skt95aOIekSCMkbbaEz-38d8GGvqnZRkdaluUVdMC2g')
  //     .end((err, res) => {
  //       res.should.have.status(200);
  //       res.body.should.be.an('object');
  //       done();
  //     });
  // })  

})
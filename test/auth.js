import chai from "chai";
import chaiHttp from "chai-http";
<<<<<<< HEAD:test/auth.js
import app from "../server/app";

=======
import app from "../app";
>>>>>>> develop:server/tests/auth.js
chai.use(chaiHttp);
chai.should();

describe("before each", () => {
    beforeEach((done) => {
        done();
    })
})


describe("Authentication tests", () => {
    it("User should be able to login", (done) => {
        chai.request(app).post("/api/v1/auth/signin").send({
            email: "elie@gmail.com",
            password: "123456q"
        }).end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.an("object");
            done();
        })


    });

    it("Should not be able to login", (done) => {
        chai.request(app).post("/api/v1/auth/signin").send({
            email: "sdfsf@sfs",
            password: "sfgfgsfsf"
        })
            .end((err, res) => {
                res.should.has.status(401);
                done();
            });

    })
    it("Should not be able to login when no username provided", (done) => {
        chai.request(app).post("/api/v1/auth/signin").send({
            email: "",
            password: "12345q"
        })
            .end((err, res) => {
                res.should.has.status(400);
                done();
            });

    })
    it("Should not be able to login when no password provided", (done) => {
        chai.request(app).post("/api/v1/auth/signin").send({
            email: "willy@gmail.com",
            password: ""
        })
            .end((err, res) => {
                res.should.has.status(400);
                done();
            });

    })

    it("Should not be able to login when invalid password provide", (done) => {
        chai.request(app).post("/api/v1/auth/signin").send({
            email: "willy@gmail.com",
            password: "hdh"
        })
            .end((err, res) => {
                res.should.has.status(401);
                done();
            });

    })
    it("Should not be able to login when invalid email provide", (done) => {
        chai.request(app).post("/api/v1/auth/signin").send({
            email: "willygmail.com",
            password: "12345q"
        })
            .end((err, res) => {
                res.should.has.status(401);
                done();
            });

    })
    it("User should be able to signup", (done) => {
        chai.request(app).post("/api/v1/auth/signup").send({
            email: "hhh@gmail.com",
            password: "123456q",
            firstname: "wuuhhh",
            lastname: "hdhdh"
        }).end((err, res) => {
            res.should.have.status(201);
            done();
        })


    });

    it("User should not be able to signup when user exist",(done)=>{
        chai.request(app).post("/api/v1/auth/signup").send({
            email:"willy@gmail.com",
            password: "123456q",
            firstname: "wuuhhh",
            lastname: "hdhdh"
        }).end((err,res)=>{
            res.should.have.status(400);
            res.body.should.be.an("object");
            done();
        })

        
    });

    
    it("User should not be able to signup when invalid email",(done)=>{
        chai.request(app).post("/api/v1/auth/signup").send({
            email:"willy",
            password: "123456q",
            firstname: "wuuhhh",
            lastname: "hdhdh"
        }).end((err,res)=>{
            res.should.have.status(400);
            res.body.should.be.an("object");
            done();
        })

        
    });

    
    it("User should not be able to signup when user exist",(done)=>{
        chai.request(app).post("/api/v1/auth/signup").send({
            email:"willy@gmail.com",
            password: "123456q",
            firstname: "wuuhhh",
            lastname: "hdhdh"
        }).end((err,res)=>{
            res.should.have.status(400);
            res.body.should.be.an("object");
            done();
        })

        
    });

    it("User should not be able to signup when invalid email",(done)=>{
      chai.request(app).post("/api/v1/auth/signup").send({
          email:"will",
          password: "123456q",
          firstname: "wuuhhh",
          lastname: "hdhdh"
      }).end((err,res)=>{
          res.should.have.status(400);
          res.body.should.be.an("object");
          done();
      })

      
  });

  it("User should not be able to signup when invalid password",(done)=>{
    chai.request(app).post("/api/v1/auth/signup").send({
        email:"willy@gmail.com",
        password: "123",
        firstname: "wuuhhh",
        lastname: "hdhdh"
    }).end((err,res)=>{
        res.should.have.status(400);
        res.body.should.be.an("object");
        done();
    })

    
});
it("User should not be able to signup when invalid firstname",(done)=>{
  chai.request(app).post("/api/v1/auth/signup").send({
      email:"willy@gmail.com",
      password: "123456q",
      firstname: "w",
      lastname: "hdhdh"
  }).end((err,res)=>{
      res.should.have.status(400);
      res.body.should.be.an("object");
      done();
  })
});
it("User should not be able to signup when invalid firstname",(done)=>{
  chai.request(app).post("/api/v1/auth/signup").send({
      email:"willy@gmail.com",
      password: "123456q",
      firstname: "",
      lastname: "hdhdh"
  }).end((err,res)=>{
      res.should.have.status(400);
      res.body.should.be.an("object");
      done();
  })
});
it("User should not be able to signup when invalid lastname",(done)=>{
  chai.request(app).post("/api/v1/auth/signup").send({
      email:"willy@gmail.com",
      password: "123456q",
      firstname: "wxbxb",
      lastname: "h"
  }).end((err,res)=>{
      res.should.have.status(400);
      res.body.should.be.an("object");
      done();
  })
});

it("User should not be able to signup when invalid lastname",(done)=>{
  chai.request(app).post("/api/v1/auth/signup").send({
      email:"willy@gmail.com",
      password: "123456q",
      firstname: "wxcnbxbc",
      lastname: ""
  }).end((err,res)=>{
      res.should.have.status(400);
      res.body.should.be.an("object");
      done();
  })
});
})
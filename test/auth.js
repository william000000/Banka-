import chai from "chai";
import chaiHttp from "chai-http";
import app from "../server/app";

chai.use(chaiHttp);
chai.should();

describe("before each",()=>{
    beforeEach((done)=>{
        done();
    })
})


describe("Authentication tests",()=>{
    it("User should be able to login",(done)=>{
        chai.request(app).post("/api/v1/auth/signin").send({
            email:"elie@gmail.com",
            password:"123456q"
        }).end((err,res)=>{
            res.should.have.status(200);
            res.body.should.be.an("object");
            done();
        })

        
    });

    it("Should not be able to login",(done)=>{
        chai.request(app).post("/api/v1/auth/signin").send({
            email:"sdfsf@sfs",
            password:"sfgfgsfsf"
        })
        .end((err,res)=>{
            res.should.has.status(400);
            done();
        });
        
    })

    
})
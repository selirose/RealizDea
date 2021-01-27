let chai = require('chai');
let server = require ('../index');
let chaiHttp = require('chai-http');
let should = chai.should();

const Op = require('sequelize').Op;

chai.use(chaiHttp);

describe('payment', async ()=>{

  describe('/GET Payment',()=> {
    it('It Should shown the payment detail of a contest',()=>{
      chai.request(server)
      .get('/payment/1')
      .set({Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJmdWxsbmFtZSI6IkFkbWluIEFkbWluIiwiaWRfcm9sZSI6MX0sImlhdCI6MTYxMDg2ODkzOX0.M-aj5GlsmbOF6ntdeQMeIL5Gy2JiXYb39RvF268MRvY`})
      .end((err,res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        res.body.should.have.property('message');
        res.body.should.have.property('result');
        res.body.result.should.be.an('object');
        res.body.result.should.have.property('evidence_provider');
        res.body.result.should.have.property('id');
        res.body.result.should.have.property('bank_provider');
        res.body.result.should.have.property('account_number_provider');
        res.body.result.should.have.property('contest');
        res.body.result.contest.should.have.property('amount');
      })
    })
  })

  describe('/POST Payment Provider', ()=> {
    it('/It Should submit the payment evidence from the provider',()=>{
      let createContest = {
        title:"Unit Testing Payment Purpose",
        prize:"100000000",
        due_date:'2021-02-27',
        announcement:'2021-03-01',
        description:"Unit Testing Payment Purpose"
      }
      chai.request(server)
      .post('/contest/create')
      .set({Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozLCJmdWxsbmFtZSI6IlRvbW15IEFzbmkiLCJpZF9yb2xlIjoyfSwiaWF0IjoxNjEwOTg2MjQwfQ.x57NYizG-YHZQOLmW9HdCPnnmBA7nubsDnTRXEXERHg`})
      .send(createContest)
      .end((err,res)=>{
        contest_id = res.body.result.id
        chai.request(server)
        .post(`/payment/provider/${contest_id}/3`)
        .set({Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozLCJmdWxsbmFtZSI6IlRvbW15IEFzbmkiLCJpZF9yb2xlIjoyfSwiaWF0IjoxNjEwOTg2MjQwfQ.x57NYizG-YHZQOLmW9HdCPnnmBA7nubsDnTRXEXERHg`})
        .field('bank_provider','BRI')
        .field('account_number_provider','1234567001')
        .attach('evidence','tests/evidence.png')
        .end((err,res)=>{
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.body.should.have.property('message');
          res.body.should.have.property('result');
          res.body.result.should.be.an('object');
          res.body.result.should.have.property('evidence_provider');
          res.body.result.should.have.property('id');
          res.body.result.should.have.property('bank_provider');
          res.body.result.should.have.property('account_number_provider');
          res.body.result.should.have.property('user');
          res.body.result.user.should.have.property('provider');
          res.body.result.should.have.property('status');
          res.body.result.status.should.have.property('contest_status');
          res.body.result.should.have.property('contest');
          res.body.result.contest.should.have.property('amount');
          res.body.result.contest.should.have.property('title');
        })

      })
    })
  })

  describe('/GET Payment Approve', ()=> {
    it('/It Should Approve the payment from the provider',()=>{
      let createContest = {
        title:"Unit Testing Payment Purpose 2",
        prize:"100000000",
        due_date:'2021-02-27',
        announcement:'2021-03-01',
        description:"Unit Testing Payment Purpose"
      }
      chai.request(server)
      .post('/contest/create')
      .set({Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozLCJmdWxsbmFtZSI6IlRvbW15IEFzbmkiLCJpZF9yb2xlIjoyfSwiaWF0IjoxNjEwOTg2MjQwfQ.x57NYizG-YHZQOLmW9HdCPnnmBA7nubsDnTRXEXERHg`})
      .send(createContest)
      .end((err,res)=>{
        contest_id = res.body.result.id
        chai.request(server)
        .post(`/payment/provider/${contest_id}/3`)
        .set({Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozLCJmdWxsbmFtZSI6IlRvbW15IEFzbmkiLCJpZF9yb2xlIjoyfSwiaWF0IjoxNjEwOTg2MjQwfQ.x57NYizG-YHZQOLmW9HdCPnnmBA7nubsDnTRXEXERHg`})
        .field('bank_provider','BRI')
        .field('account_number_provider','1234567001')
        .attach('evidence','tests/evidence.png')
        .end((err,res)=>{
          // console.log(res)
          chai.request(server)
          .get(`/payment/approve/${contest_id}`)
          .set({Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJmdWxsbmFtZSI6IkFkbWluIEFkbWluIiwiaWRfcm9sZSI6MX0sImlhdCI6MTYxMDg2ODkzOX0.M-aj5GlsmbOF6ntdeQMeIL5Gy2JiXYb39RvF268MRvY`})
          .end((err,res)=>{
            res.should.have.status(200);
            res.body.should.be.an('object');
            res.body.should.have.property('message');
            res.body.should.have.property('result');
            res.body.result.should.be.an('object');
            res.body.result.should.have.property('payment_date_provider');
            res.body.result.should.have.property('evidence_provider');
            res.body.result.should.have.property('due_date_winner');
            res.body.result.should.have.property('id');
            res.body.result.should.have.property('bank_provider');
            res.body.result.should.have.property('account_number_provider');
            res.body.result.should.have.property('status_provider_payment');
            res.body.result.should.have.property('status_winner_payment');
            res.body.result.should.have.property('user');
            res.body.result.user.should.have.property('provider');
            res.body.result.should.have.property('status');
            res.body.result.status.should.have.property('status');
            res.body.result.should.have.property('contest');
            res.body.result.contest.should.have.property('amount');
            res.body.result.contest.should.have.property('title');
          })
        })
      })
    })
  })

  describe('/GET Payment Reject',()=> {
    it('/It Should Reject the payment from the provider',()=>{      
           
      chai.request(server)
      .post('/contest/getAllContest')
      .set({Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozLCJmdWxsbmFtZSI6IlRvbW15IEFzbmkiLCJpZF9yb2xlIjoyfSwiaWF0IjoxNjEwOTg2MjQwfQ.x57NYizG-YHZQOLmW9HdCPnnmBA7nubsDnTRXEXERHg`})
     
      .end((err,res)=>{    
        contest_data = res.body.result.find(el => el.status.status == "Open")   
        // console.log(contest_data)
        contest_id = contest_data.id  
        chai.request(server)
        .post(`/payment/provider/${contest_id}/3`)
        .set({Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozLCJmdWxsbmFtZSI6IlRvbW15IEFzbmkiLCJpZF9yb2xlIjoyfSwiaWF0IjoxNjEwOTg2MjQwfQ.x57NYizG-YHZQOLmW9HdCPnnmBA7nubsDnTRXEXERHg`})
        .field('bank_provider','BRI')
        .field('account_number_provider','1234567001')
        .attach('evidence','tests/evidence.png')
        .end((err,res)=>{          
          chai.request(server)
          .get(`/payment/reject/${contest_id}`)
          .set({Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJmdWxsbmFtZSI6IkFkbWluIEFkbWluIiwiaWRfcm9sZSI6MX0sImlhdCI6MTYxMDg2ODkzOX0.M-aj5GlsmbOF6ntdeQMeIL5Gy2JiXYb39RvF268MRvY`})
          .end((err,res)=>{           
            res.should.have.status(200);
            res.body.should.be.an('object');
            res.body.should.have.property('message');
          })
        })
      })
    })
  })

  describe('/POST Payment Admin',() => {
    it('It should submit the payment evidence to the winner', () => {
      chai.request(server)
      .post('/payment/admin/16/11')
      .set({Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJmdWxsbmFtZSI6IkFkbWluIEFkbWluIiwiaWRfcm9sZSI6MX0sImlhdCI6MTYxMDk2NDU4NH0.RYZ9SAAS2fA2yZu7Ju5Hi-i0jfo5tMcmZEg3rfa7-p8`})
      .attach('evidence','tests/evidence.png')
      .end((err,res) => {        
        res.should.have.status(200);
        res.body.should.be.an('object');
        res.body.should.have.property('message');
        res.body.should.have.property('result');
        res.body.result.should.be.an('object');
        res.body.result.should.have.property('payment_date_winner');
        res.body.result.should.have.property('evidence_winner');
        res.body.result.should.have.property('id');
        res.body.result.should.have.property('winner');
        res.body.result.should.have.property('bank_winner');
        res.body.result.should.have.property('account_number_winner');
        res.body.result.should.have.property('status_winner_payment');
        res.body.result.should.have.property('user');
        res.body.result.user.should.have.property('provider');
        res.body.result.should.have.property('status');
        res.body.result.status.should.have.property('status');
        res.body.result.should.have.property('contest');
        res.body.result.contest.should.have.property('amount');
        res.body.result.contest.should.have.property('title');
      })
    })
  })











})

// async function deleteDummy() {
//   await contest.destroy({
//     where:{
//       title:{
//         [Op.in]:['Unit Testing Payment Purpose','Unit Testing Payment Purpose 2','Unit Testing Payment Purpose 3']
//       }
//     }
//   })
// }

// deleteDummy()
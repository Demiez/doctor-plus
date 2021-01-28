import * as chai from 'chai';
import chaiHttp = require('chai-http');
import 'chai/register-should';
import 'mocha';
import app from '../../app';

chai.use(chaiHttp);

const expect = chai.expect;

describe(':: baseRoute', () => {
  it('should respond with HTTP 200 status', async () => {
    const res = await chai
      .request(app)
      .get('/index')
      .catch((err) => {
        if (err.response) {
          return err.response as Response;
        } else {
          throw err;
        }
      });

    expect(res.status).to.be.equal(200);
  });

  it('should respond with success message', async () => {
    const res = await chai
      .request(app)
      .get('/index')
      .catch((err) => {
        if (err.response) {
          return err.response as Response;
        } else {
          throw err;
        }
      });

    res.body.should.be.an('object');
    expect(res.body.status).to.be.equal('success');
  });
});

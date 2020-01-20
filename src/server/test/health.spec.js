const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const expect = chai.expect;
const app = require("../src/server");

describe("Health", function() {
  it("GET /api/health", function(done) {
    chai
      .request(app)
      .get("/api/health")
      .end(function(err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body.status).to.be.equals("UP");
        done();
      });
  });
});

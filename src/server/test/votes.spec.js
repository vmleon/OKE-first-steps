const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const expect = chai.expect;
const app = require("../src/server");

describe("Votes", function() {
  it("GET /api/votes", function(done) {
    chai
      .request(app)
      .get("/api/votes")
      .end(function(err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        done();
      });
  });
});

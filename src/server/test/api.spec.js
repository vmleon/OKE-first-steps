const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const expect = chai.expect;
const app = require("../src/server");

describe("API", function() {
  it("GET /", function(done) {
    chai
      .request(app)
      .get("/")
      .end(function(err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(404);
        done();
      });
  });
  it("GET /api", function(done) {
    chai
      .request(app)
      .get("/api")
      .end(function(err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        done();
      });
  });
});

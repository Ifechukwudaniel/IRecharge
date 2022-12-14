const supertest = require("supertest");
const assert = require("assert");
const app = require("../server");

describe("GET /", function () {
  it("it should has status code 200", function (done) {
    supertest(app)
      .get("/")
      .expect(200)
      .end(function (err, res) {
        if (err) done(err);
        done();
      });
  });

  it("it should get customers status code 200", function (done) {
    supertest(app)
      .get("/api/customers/")
      .expect(200)
      .end(function (err, res) {
        if (err) done(err);
        done();
      });
  });
});

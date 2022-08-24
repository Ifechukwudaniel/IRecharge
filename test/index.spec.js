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

  it("it should has status code 200", function (done) {
    supertest(app)
      .get("/api/customers/")
      .expect(200)
      .end(function (err, res) {
        if (err) done(err);
        done();
      });
  });

  it("it should has status code 200", function (done) {
    supertest(app)
      .post("/api/customers/", {
        name: "Ifechuku  Daniel",
        email: "dandynamicx@gmail.comsjjjj",
      })
      .expect(200)
      .end(function (err, res) {
        if (err) done(err);
        done();
      });
  });
});

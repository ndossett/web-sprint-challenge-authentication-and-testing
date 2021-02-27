const request = require("supertest");
const db = require("../data/dbConfig");
const Auth = require('../api/auth/auth-model');

// Write your tests here

beforeAll(async () => {
  await db.migrate.latest()
});


describe("[POST] /register", () => {
  const user1 = { username: "user1", password: "a12345" }; 
  const user2 = { username: "user2", password: "b12345" }; 

    it("responds with new user", async () => {
      let res 
      res = await request(Auth).post("/register").send(user1)
      expect(res.body).toMatchObject({id:1, ...user1});

      res = await request(Auth).post("/register").send(user2)
      expect(res.body).toMatchObject({id:1, ...user2});
  });

  describe("[POST /login", () => {

    it("login", () => {
      return request(Auth)
          .post("/api/auth/login")
          .send({ username: "user1", password: "a12345" })
          .then(res => {
              expect(res.type).toMatch(/json/i)
          });
  });

  it("returns json from the jokes router", () => {
    return request(Auth)
      .get("api/jokes")
      .then(res => {
        expect(res.type).toMatch(/json/i);
      });
  });

});

});

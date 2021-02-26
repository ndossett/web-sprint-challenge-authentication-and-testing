const request = require("supertest");

const server = require("./server");
const db = require("../data/dbConfig");
const Auth = require('../api/auth/auth-model');

// Write your tests here
test('sanity', () => {
  expect(true).toBe(false)
});

describe("POST", () => {
  beforeAll(async () => {
    await db("users").truncate();
  });

  it("adds a new user", async () => {
    await Auth.insert({ username: "user1", password: "a12345" });
    await Auth.insert({ username: "user2", password: "b12345" });
    const user = await db("users");

    expect(user).toHaveLength(2);
    expect(user[1].username).toBe("user2");
  });

  it("login", () => {
    return request(server)
      .post("api/auth/login")
      .send({ username: "niki", password: "12345" })
      .then(res => {
        expect(res.type).toMatch(/json/i);
      });
  });

  it("returns json from the jokes router", () => {
    return request(server)
      .get("api/jokes")
      .then(res => {
        expect(res.type).toMatch(/json/i);
      });
  });


describe("GET /jokes", async () => {
  await request(server)
    .get("/api/jokes")
    .then(res => expect(res.status).toBe(500))
    .catch(err => console.log(err))
  });
});

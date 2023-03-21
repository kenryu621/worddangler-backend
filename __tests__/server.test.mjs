import request from "supertest";
import app from "../app.mjs";

describe("Test server connection", () => {
  test("It should complete the get request", () => {
    return request(app).get("/").expect(200);
  });
});

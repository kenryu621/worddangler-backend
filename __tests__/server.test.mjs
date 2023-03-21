import request from "supertest";
import app from "../app.mjs";

describe("Test server connection", () => {
  test("It should response the GET method", () => {
    return request(app).get("/").expect(200);
  });
});

import request from "supertest";
import app from "../../app";

describe("Root", () => {
  it("test root endpoint", async () => {
    const res = await request(app)
      .get("/api/v1")
      .set("Accept", "application/json");
    expect(res.status).toBe(200);
    expect(res.body.message).toEqual("Welcome to taxi 24 Web API v1");
  });
});
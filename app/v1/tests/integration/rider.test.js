import request from "supertest";
import app from "../../app";

describe("Riders", () => {
  it("should return all riders", async () => {
    const res = await request(app).get("/api/v1/riders");
    expect(res.statusCode).toEqual(200);
    expect.arrayContaining(res.body)
  });
});

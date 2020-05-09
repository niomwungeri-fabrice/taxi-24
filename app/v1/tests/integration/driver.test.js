import request from "supertest";
import app from "../../app";

describe("Drivers", () => {
  it("should return all drivers", async () => {
    const res = await request(app).get("/api/v1/drivers");
    expect(res.statusCode).toEqual(200);
    expect.arrayContaining(res.body);
  });
  it("should return all available drivers", async () => {
    const res = await request(app).get("/api/v1/drivers/available");
    expect(res.statusCode).toEqual(200);
    expect.arrayContaining(res.body);
  });
});

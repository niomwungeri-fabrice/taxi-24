import request from "supertest";
import app from "../../app";
import constants from "../../helpers/constants";
const { OK, NOT_FOUND } = constants.statusCode;
const defaultURL = "/api/v1/riders";

describe("Riders", () => {
  it("should return all riders", async () => {
    const res = await request(app).get(defaultURL);
    expect(res.statusCode).toEqual(OK);
    expect.arrayContaining(res.body);
  });
  it("should return rider not found with fake id", async () => {
    const res = await request(app).get(`${defaultURL}/7834`);
    expect(res.statusCode).toEqual(NOT_FOUND);
    expect(res.body.message).toEqual("Rider does not exist");
  });
  it("should return rider not found with valid id", async () => {
    const res = await request(app).get(`${defaultURL}/2`);
    expect(res.statusCode).toEqual(OK);
    expect(res.body).toHaveProperty("id", 2);
  });
});

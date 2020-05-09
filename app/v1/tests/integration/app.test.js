import request from "supertest";
import app from "../../app";
import constants from "../../helpers/constants";
const { OK } = constants.statusCode;
const defaultURL = "/api/v1";
describe("Root", () => {
  it("test root endpoint", async () => {
    const res = await request(app)
      .get(defaultURL)
      .set("Accept", "application/json");
    expect(res.status).toBe(OK);
    expect(res.body.message).toEqual("Welcome to taxi 24 Web API v1");
  });
});

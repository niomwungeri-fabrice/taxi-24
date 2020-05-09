import request from "supertest";
import app from "../../app";
import constants from "../../helpers/constants";
const { OK } = constants.statusCode;
const mainDefault = "/api/v1/riders";
describe("Riders", () => {
  it("should return all riders", async () => {
    const res = await request(app).get(mainDefault);
    expect(res.statusCode).toEqual(OK);
    expect.arrayContaining(res.body);
  });
});

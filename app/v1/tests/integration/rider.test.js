import request from "supertest";
import app from "../../app";
import constants from "../../helpers/constants";
const { OK, NOT_FOUND, BAD_REQUEST } = constants.statusCode;
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

describe("Closest Drivers", () => {
  it("should return my location is required!", async () => {
    const res = await request(app).get(`${defaultURL}/closest`);
    expect(res.statusCode).toEqual(BAD_REQUEST);
    expect(res.body.message).toEqual(
      "myLocation is a required parameter field"
    );
  });
  it("should return return 3 closest drivers", async () => {
    const res = await request(app).get(
      `${defaultURL}/closest?myLocation=-1.956537,30.063616`
    );
    expect(res.statusCode).toEqual(OK);
    expect(res.body.length).toBe(3);
  });
  it("should return No  closest drivers", async () => {
    const res = await request(app).get(
      `${defaultURL}/closest?myLocation=-1.956537,30.063616&threshold=0`
    );
    expect(res.statusCode).toEqual(OK);
    expect(res.body.message).toEqual("No closest drivers around!");
  });
});

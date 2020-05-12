import request from "supertest";
import app from "../../app";
import constants from "../../helpers/constants";
const { OK, BAD_REQUEST, NOT_FOUND } = constants.statusCode;
const defaultURL = "/api/v1/drivers";
describe("Drivers", () => {
  it("should return all drivers", async () => {
    const res = await request(app).get(defaultURL);
    expect(res.statusCode).toEqual(OK);
    expect.arrayContaining(res.body);
  });
  it("should return all available drivers", async () => {
    const res = await request(app).get(`${defaultURL}/available`);
    expect(res.statusCode).toEqual(OK);
    expect.arrayContaining(res.body);
  });
  it("should return return 400 when my location not provided", async () => {
    const res = await request(app).get(`${defaultURL}/available/range`);
    expect(res.statusCode).toEqual(BAD_REQUEST);
    expect(res.body.message).toEqual("myLocation is a required parameter field");
  });
  it("should use default range", async () => {
    const res = await request(app).get(
      `${defaultURL}/available/range?myLocation=-1.956537,30.063616`
    );
    expect(res.statusCode).toEqual(OK);
    expect(res.body.length).toBe(1);
  });
  it("should use provided range range", async () => {
    const res = await request(app).get(
      `${defaultURL}/available/range?myLocation=-1.956537,30.063616&range=18`
    );
    expect(res.statusCode).toEqual(OK);
    expect(res.body.length).toBe(2);
  });
  it("should return driver not found with fake id", async () => {
    const res = await request(app).get(`${defaultURL}/7834`);
    expect(res.statusCode).toEqual(NOT_FOUND);
    expect(res.body.message).toEqual("Driver does not exist");
  });
  it("should return driver not found with valid id", async () => {
    const res = await request(app).get(`${defaultURL}/2`);
    expect(res.statusCode).toEqual(OK);
    expect(res.body).toHaveProperty("id", 2);
  });
});

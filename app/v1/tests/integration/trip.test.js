import request from "supertest";
import app from "../../app";
import constants from "../../helpers/constants";
const { OK, NOT_FOUND, CREATED, CONFLICT, BAD_REQUEST } = constants.statusCode;
const defaultURL = "/api/v1/trips";

describe("Trips", () => {
  const tripTestData = {
    departure: "-1.956537,30.063616",
    destination: "-1.956537,31.063616",
    riderId: 1,
    driverId: 2895,
  };
  it("should return driver not found", async () => {
    const res = await request(app).post(defaultURL).send(tripTestData);
    expect(res.statusCode).toEqual(NOT_FOUND);
    expect(res.body.message).toEqual("Driver with 2895 ID was not found");
  });
  it("should return rider not found", async () => {
    tripTestData["riderId"] = 489787;
    const res = await request(app).post(defaultURL).send(tripTestData);
    expect(res.statusCode).toEqual(NOT_FOUND);
    expect(res.body.message).toEqual("Rider with 489787 ID was not found");
  });

  it("should create a trip successfully ", async () => {
    tripTestData["driverId"] = 2;
    tripTestData["riderId"] = 2;
    const res = await request(app).post(defaultURL).send(tripTestData);
    expect(res.statusCode).toEqual(CREATED);
    expect(res.body.message).toEqual("Trip created successfully");
  });
  it("should return departure is required!", async () => {
    tripTestData["departure"] = "";
    const res = await request(app).post(defaultURL).send(tripTestData);
    expect(res.statusCode).toEqual(BAD_REQUEST);
    expect(res.body.error).toEqual("departure is not allowed to be empty");
  });
  it("should return all active trips", async () => {
    const res = await request(app).get(defaultURL);
    expect(res.statusCode).toEqual(OK);
  });
});
describe("Complete trip process", () => {
  it("should return trip not found", async () => {
    const res = await request(app).put(`${defaultURL}/385738/complete`);
    expect(res.statusCode).toEqual(NOT_FOUND);
    expect(res.body.message).toEqual("Trip with 385738 ID was not found");
  });
  test("should complete a trip successfully ", async () => {
    const res = await request(app).put(`${defaultURL}/1/complete`);
    expect(res.statusCode).toEqual(OK);
    expect(res.body.message).toEqual("Trip completed successfully");
  });
  test("should return Trip already completed!", async () => {
    const res = await request(app).put(`${defaultURL}/2/complete`);
    expect(res.statusCode).toEqual(CONFLICT);
    expect(res.body.message).toEqual("Trip already completed!");
  });
  test("should return Id must be a string", async () => {
    const res = await request(app).put(`${defaultURL}/"2"/complete`);
    expect(res.statusCode).toEqual(BAD_REQUEST);
    expect(res.body.error).toEqual("id must be a number");
  });
});


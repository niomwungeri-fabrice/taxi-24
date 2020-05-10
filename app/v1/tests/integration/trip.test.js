import request from "supertest";
import app from "../../app";
import constants from "../../helpers/constants";
const { OK, NOT_FOUND } = constants.statusCode;
const defaultURL = "/api/v1/trips";

describe("Trips", () => {
  const tripTestData = {
    departure: "Kigali",
    destination: "kanombe",
    costAmount: 5000,
    coordinates: "-1.956537,30.063616",
    riderId: 1,
    driverId: 2895,
  };
  it("should return driver not found", async () => {
    const res = await request(app).post(defaultURL).send(tripTestData);
    expect(res.statusCode).toEqual(NOT_FOUND);
    expect(res.body.message).toEqual("Driver does not exist");
  });
  it("should return rider not found", async () => {
    tripTestData["riderId"] = 489787;
    const res = await request(app).post(defaultURL).send(tripTestData);
    expect(res.statusCode).toEqual(NOT_FOUND);
    expect(res.body.message).toEqual("Rider does not exist");
  });

  it.skip("should create a trip successfully ", async () => {
    tripTestData["driverId"] = 2;
    tripTestData["riderId"] = 2;
    const res = await request(app).post(defaultURL).send(tripTestData);
    console.log(res);
    expect(res.statusCode).toEqual(NOT_FOUND);
    expect(res.body.message).toEqual("Rider does not exist");
  });
});

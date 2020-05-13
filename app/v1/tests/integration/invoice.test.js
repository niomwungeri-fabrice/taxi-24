import request from "supertest";
import app from "../../app";
import constants from "../../helpers/constants";
const { OK } = constants.statusCode;
const defaultURL = "/api/v1/invoices";

describe("Invoices", () => {
  it("should return all invoices", async () => {
    const res = await request(app).get(defaultURL);
    expect(res.statusCode).toEqual(OK);
  });
});

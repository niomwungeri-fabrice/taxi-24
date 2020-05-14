import {
  calculateDistance,
  arraySorter,
  cleanJoiValidator,
  getCoordinates,
  validateCoordinates,
} from "../../helpers/helpers";
describe("calculateDistance()", () => {
  it("should return 0", () => {
    expect(
      calculateDistance("-1.971142", "30.103683", "-1.971142", "30.103683")
    ).toBe(0);
  });
  it("should return the final results", () => {
    expect(
      calculateDistance("-1.956537", "30.063616", "-1.971142", "30.103683")
    ).toBe(4.7);
  });
});

describe("arraySorter()", () => {
  const testData = [
    { id: 1, name: "Angel Miguel", distance: 29 },
    { id: 2, name: "Michael Rogers", distance: 3 },
    { id: 3, name: "Steve Rogers", distance: 5 },
  ];
  it("should sort array of object", () => {
    expect(arraySorter(testData)).toEqual([
      { id: 2, name: "Michael Rogers", distance: 3 },
      { id: 3, name: "Steve Rogers", distance: 5 },
      { id: 1, name: "Angel Miguel", distance: 29 },
    ]);
  });
  it("should return the same order", () => {
    expect(
      arraySorter([
        { id: 2, name: "Michael Rogers", distance: 3 },
        { id: 1, name: "Angel Miguel", distance: 3 },
      ])
    ).toEqual([
      { id: 2, name: "Michael Rogers", distance: 3 },
      { id: 1, name: "Angel Miguel", distance: 3 },
    ]);
  });
});

describe("getCoordinates()", () => {
  it("should return latitude and longitude separately", () => {
    expect(getCoordinates("-1.956537, 31.063616")).toEqual({
      lat: "-1.956537",
      lon: "31.063616",
    });
  });
});

describe("cleanJoiValidator()", () => {
  it("should remove special characters", () => {
    expect(cleanJoiValidator("/myLocation/ is required")).toEqual(
      "myLocation is required"
    );
  });
});

describe("validateCoordinates()", () => {
  it("should return true", () => {
    expect(validateCoordinates("-1.956537", "31.063616")).toEqual(true);
  });
  it("should return return false", () => {
    expect(validateCoordinates("dfdfd", "dfdfd")).toEqual(false);
  });
});

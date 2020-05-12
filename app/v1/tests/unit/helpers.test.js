import { calculateDistance, arraySorter } from "../../helpers/helpers";
describe("calculateDistance()", () => {
  it("should return 0", () => {
    expect(
      calculateDistance("-1.971142", "30.103683", "-1.971142", "30.103683")
    ).toBe(0);
  });
  it("should return the final results", () => {
    expect(
      calculateDistance("-1.956537", "30.063616", "-1.971142", "30.103683")
    ).toBe(4.739318275859181);
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

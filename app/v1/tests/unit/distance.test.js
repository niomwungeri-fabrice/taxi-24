import { calculateDistance } from "../../helpers/calculateDistance";

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

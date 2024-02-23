import GiftRedemptionSystem from "./GiftRedemptionSystem";

var giftRedemptionSystem = new GiftRedemptionSystem(
    "staff-id-to-team-mapping.csv",
    false
);

describe("GiftRedemptionSystem", () => {
    test("valid staff name should return teamName", () => {
        var value = giftRedemptionSystem.lookupStaffPass("STAFF_H123804820G");
        return expect(value).toBe("BASS");
    });

    test("invalid staff name should return undefined", () => {
        var value = giftRedemptionSystem.lookupStaffPass("abc");
        return expect(value).toBe(undefined);
    });

    test("valid team should return true", () => {
        var value = giftRedemptionSystem.verifyRedemptionEligibility("BASS");
        return expect(value).toBe(true);
    });

    test("non existent team should return false", () => {
        var value = giftRedemptionSystem.verifyRedemptionEligibility("abc");
        return expect(value).toBe(false);
    });

    test("valid team redemption should return true", () => {
        var value = giftRedemptionSystem.addRedemption("STAFF_H123804820G");
        return expect(value).toBe(true);
    });

    test("invalid team redemption should return false", () => {
        var value = giftRedemptionSystem.addRedemption("STAFF_H123804820G");
        return expect(value).toBe(false);
    });

    test("invalid team should return false", () => {
        var value = giftRedemptionSystem.verifyRedemptionEligibility("BASS");
        return expect(value).toBe(false);
    });
});

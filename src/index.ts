import express, { Express, Request, Response } from "express";

const app: Express = express();
const port = 3000;

import GiftRedemptionSystem from "./GiftRedemptionSystem";

const giftRedemptionSystem: GiftRedemptionSystem = new GiftRedemptionSystem(
    "staff-id-to-team-mapping-long.csv",
    true
);

app.get("/staffs/:staffPassId", (req, res) => {
    const staffPassId = req.params.staffPassId;
    if (giftRedemptionSystem.lookupStaffPass(staffPassId)) {
        res.send({
            message: giftRedemptionSystem.lookupStaffPass(staffPassId),
        });
    } else {
        res.status(400).send({
            error: "Invalid Staff ID!",
        });
    }
});

app.get("/teams/:teamName", (req, res) => {
    const teamName = req.params.teamName;
    if (giftRedemptionSystem.verifyRedemptionEligibility(teamName)) {
        res.send({
            message: giftRedemptionSystem.verifyRedemptionEligibility(teamName),
        });
    } else {
        res.status(400).send({
            error: "Already Redeemed!",
        });
    }
});

app.post("/redeem/:staffPassId", (req: Request, res: Response) => {
    const staffPassId = req.params.staffPassId;
    if (giftRedemptionSystem.addRedemption(staffPassId)) {
        res.send({ message: "Redemption added successfully" });
    } else {
        res.status(400).send({
            error: "Invalid Redemption!",
        });
    }
});

app.listen(port, () => {});

export default app;

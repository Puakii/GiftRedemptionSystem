import fs from "fs";

interface StaffMapping {
    staff_pass_id: string;
    team_name: string;
    created_at: number;
}

interface Redemption {
    team_name: string;
    redeemed_at: number;
}

class GiftRedemptionSystem {
    private staffMappings: StaffMapping[];
    private redemptionData: Redemption[];
    private write: boolean;

    constructor(mappingFilePath: string, write: boolean) {
        this.staffMappings = [];
        this.redemptionData = [];
        this.write = write;

        // Load staff mappings from CSV
        this.loadStaffMappings(mappingFilePath).then();
        this.loadRedemptionData();
    }

    private async loadStaffMappings(mappingFilePath: string): Promise<void> {
        const csvData = fs.readFileSync(mappingFilePath, "utf-8");
        const records = csvData.split("\n").slice(1); // Split data by newline and skip the header

        for (const record of records) {
            const [staff_pass_id, team_name, created_at] = record
                .trim()
                .split(",");
            const staffMapping: StaffMapping = {
                staff_pass_id,
                team_name,
                created_at: parseInt(created_at),
            };
            this.staffMappings.push(staffMapping);
        }
    }

    private loadRedemptionData(): void {
        if (fs.existsSync("redemptions.json")) {
            // File exists
            const jsonData = JSON.parse(
                fs.readFileSync("redemptions.json", "utf8")
            );
            for (var obj of jsonData) {
                const redemption: Redemption = obj;
                this.redemptionData.push(redemption);
            }
        }
    }

    lookupStaffPass(staffpass: string): string | undefined {
        const validRep = this.staffMappings.find(
            (entry) => entry.staff_pass_id == staffpass
        );
        return validRep?.team_name;
    }

    verifyRedemptionEligibility(teamName: string): boolean {
        const lastRedemption = this.redemptionData.find(
            (entry) => entry.team_name === teamName
        );
        const validTeam = this.staffMappings.find(
            (entry) => entry.team_name == teamName
        );
        return (lastRedemption ? false : true) && (validTeam ? true : false);
    }

    addRedemption(staffpass: string): boolean {
        var teamName = this.lookupStaffPass(staffpass);
        if (!teamName) {
            return false;
        }

        if (this.verifyRedemptionEligibility(teamName)) {
            var time = Date.now();
            this.redemptionData.push({
                team_name: teamName,
                redeemed_at: time,
            });
            if (this.write) {
                fs.writeFileSync(
                    "redemptions.json",
                    JSON.stringify(this.redemptionData, null, 2)
                );
            }
            return true;
        } else {
            return false;
        }
    }
}

export default GiftRedemptionSystem;

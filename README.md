# GiftRedemptionSystem
 - The System is build with NodeJS, TypeScript and ExpressJS, with testing on Jest.

## Code Structure
### GiftRedemptionSystem
 - The main logic of the system. We first load the file mapping staff pass ID to their corresponding team names into an array, as well as corresponding redemption data into an array if any.
 - Using lookUpStaffPass(), we can check if a staff is valid, by checking if the staff ID appears in the mapping, and return the team name if it exists.
 - Using verifyRedemptionEligibility(), we can verify if a team can redeem, by checking the redemption data to see if that team has redeemed before, as well as if the team exist in the staff mapping and return true if they are eligible.
 - Using addRedemption(), we can add new redemption, we first find the team that the representative is from, and check if that team has already redeemed before, and if not, we add new redemption record into our redemption data, and update our redemption data file and return true.

### index.ts
 - I have decided to use ExpressJS to create an API, where we can make use of the API to perform each task. In addition, I have saved all past redemptions as a JSON file so that we always have the list of past redemptions even if the application is restarted.

### Running the code
- To run the code, you can type `npx ts-node src/index.ts` to start.
- After that, you can make use of the API:
  - `/staffs/{staffId}` to check if which team does the staff belong to
  - `/teams/{teamName}` to check if the team is eligible for redemption
  - `/redeem/{staffId}` to let the representative to redeem the gift if the team is eligible
 
### Testing
- For unit testing, you can run `npm run test` to check if the logic is executed correctly.

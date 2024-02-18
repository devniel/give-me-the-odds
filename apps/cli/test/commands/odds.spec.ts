import { example1, example2, example3, example4 } from "@repo/fixtures";
import path from "path";
import { expect, test } from "@oclif/test";

describe("odds", () => {
  const packageFixtures = "../../../../packages/fixtures";
  const dir = __dirname;
  const testArgs = [
    [
      path.join(dir, `${packageFixtures}/common/millennium-falcon.json`),
      path.join(dir, `${packageFixtures}/example-1/empire.json`),
      (example1.resultsJSON.successProbability * 100).toString(),
    ],
    [
      path.join(dir, `${packageFixtures}/common/millennium-falcon.json`),
      path.join(dir, `${packageFixtures}/example-2/empire.json`),
      (example2.resultsJSON.successProbability * 100).toString(),
    ],
    [
      path.join(dir, `${packageFixtures}/common/millennium-falcon.json`),
      path.join(dir, `${packageFixtures}/example-3/empire.json`),
      (example3.resultsJSON.successProbability * 100).toString(),
    ],
    [
      path.join(dir, `${packageFixtures}/common/millennium-falcon.json`),
      path.join(dir, `${packageFixtures}/example-4/empire.json`),
      (example4.resultsJSON.successProbability * 100).toString(),
    ],
  ];

  testArgs.forEach(
    ([millenniumFalconJSONPath, empireJSONPath, expectedResult], idx) => {
      test
        .stdout()
        .command(["odds", millenniumFalconJSONPath, empireJSONPath])
        .it(
          `should return the formatted success probability percentage of example ${idx}`,
          (ctx) => {
            expect(ctx.stdout).to.contain(expectedResult);
          },
        );
    },
  );

});

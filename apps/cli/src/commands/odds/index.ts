import { Args, Command } from "@oclif/core";
import { MillenniumFalcon, getOdds } from "@repo/core";
import { readFileSync } from "node:fs";
import * as path from "node:path";

export default class Odds extends Command {
  static args = {
    millenniumFalcon: Args.string({
      description: "The millennium-falcon JSON file path",
      required: true,
    }),
    empire: Args.string({
      description: "The empire JSON file path details",
      required: true,
    }),
  };

  static examples = [
    `$ give-me-the-odds odds example1/millennium-falcon.json example1/empire.json`,
  ];

  async run(): Promise<void> {
    const { args, flags } = await this.parse(Odds);
    const millenniumFalconJSON: MillenniumFalcon = JSON.parse(
      readFileSync(path.resolve(args.millenniumFalcon)).toString(),
    );
    millenniumFalconJSON.routes_db = path.resolve(
      path.dirname(args.millenniumFalcon),
      millenniumFalconJSON.routes_db,
    );
    const empireJSON = JSON.parse(
      readFileSync(path.resolve(args.empire)).toString(),
    );
    const odds = await getOdds(millenniumFalconJSON, empireJSON);
    this.log(JSON.stringify(odds.successProbability * 100));
  }
}

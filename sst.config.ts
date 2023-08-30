import { SSTConfig } from "sst";
import { AdminStack } from "./stacks/AdminStack";
import { AppStack } from "./stacks/AppStack";

export default {
  config(_input) {
    return {
      name: "credential",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app.stack(AdminStack).stack(AppStack);
  },
} satisfies SSTConfig;

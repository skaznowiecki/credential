import { SSTConfig } from "sst";
import { MainStack } from "./stacks/MainStack";

export default {
  config(_input) {
    return {
      name: "credential",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app.stack(MainStack);
  },
} satisfies SSTConfig;

import { SSTConfig } from "sst";
import { AdminAuthStack } from "./stacks/AdminAuthStack";
import { CustomerAuthStack } from "./stacks/CustomerAuthStack";

export default {
  config(_input) {
    return {
      name: "credential",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app.stack(AdminAuthStack).stack(CustomerAuthStack);
  },
} satisfies SSTConfig;

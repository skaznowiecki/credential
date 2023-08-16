import { AdminAuthStack } from "./stacks/AdminAuthStack";
import { CustomerAuthStack } from "./stacks/CustomerAuthStack";
import { StorageStack } from "./stacks/StorageStack";
import { HttpStack } from "./stacks/HttpStack";
import { FrontendStack } from "./stacks/FrontendStack";
import { SSTConfig } from "sst";
import { MobileStack } from "./stacks/MobileStack";

export default {
  config(_input) {
    return {
      name: "credential",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app
      .stack(StorageStack)
      .stack(HttpStack)
      .stack(MobileStack)
      .stack(AdminAuthStack)
      .stack(CustomerAuthStack)
      .stack(FrontendStack);
  },
} satisfies SSTConfig;

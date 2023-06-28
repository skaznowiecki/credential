import { SSTConfig } from "sst";
import { AdminAuthStack } from "./stacks/AdminAuthStack";
import { CustomerAuthStack } from "./stacks/CustomerAuthStack";
import { StorageStack } from "./stacks/StorageStack";
import { HttpStack } from "./stacks/HttpStack";


export default {
  config(_input) {
    return {
      name: "credential",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app.stack(StorageStack).stack(HttpStack).stack(AdminAuthStack).stack(CustomerAuthStack);
  },
} satisfies SSTConfig;

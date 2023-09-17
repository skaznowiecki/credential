import { createApp } from "vue";
import { createPinia } from "pinia";

import { Amplify, API } from "aws-amplify";

import App from "./App.vue";
import router from "./router";

import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

import { aliases, mdi } from "vuetify/iconsets/mdi";

import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

import AppDate from "@/components/global/AppDate.vue";

import awsExports from "./aws-exports";
Amplify.configure(awsExports);
API.configure(awsExports);

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      mdi,
    },
  },
});

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(vuetify);
app.component("AppDate", AppDate);

app.mount("#app");

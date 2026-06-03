import { createClient } from "tinacms/dist/client";
import { queries } from "./types.js";
export const client = createClient({ url: 'http://localhost:4001/graphql', token: '9b729aa66b21d3070ba33705bee04fc65ad32b43', queries,  });
export default client;
  
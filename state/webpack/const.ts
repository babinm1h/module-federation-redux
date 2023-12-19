import { resolveFromRoot } from "./utils";

export const PATHS = {
  entry: resolveFromRoot("src/index.js"),
  build: resolveFromRoot("build"),
  src: resolveFromRoot("src"),
};


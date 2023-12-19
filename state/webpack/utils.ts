import path from "path";

export const resolveFromRoot = path.resolve.bind(null, process.cwd()) as typeof path.resolve;


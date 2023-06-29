import { customAlphabet } from "nanoid";

export const generateLicenseKey = customAlphabet(
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  19
);

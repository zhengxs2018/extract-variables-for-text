import { to_tokens, extract, ValueFormat } from "../lib/mod.ts";

const tokens = to_tokens("Adds <<min:number>>-<<max:number>> Maximum <<name>>");

const format: ValueFormat<unknown> = (value, token) => {
  if (token.type === "number") {
    return Number(value);
  } else if (token.type === "date") {
    return new Date(value);
  }

  return value.trim();
};

console.log(extract(tokens, "Adds 40-1752 Maximum Stamina", format));

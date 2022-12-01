import { Scanner } from "./scanner.ts";
import { compileTags } from "./util.ts";
import type { Token, Dict, ValueFormat } from "./types.ts";

const [openingTagRe, closingTagRe] = compileTags("<<", ">>");

export function to_tokens(template: string): Token[] {
  const scanner = new Scanner(template);
  const tokens: Token[] = [];

  while (scanner.end_of_string()) {
    const start = scanner.pos;
    if (!scanner.scan(openingTagRe)) {
      // 为提取字符串中的值而添加的可能存在的末尾值
      tokens.push({ name: "", type: "", content: template.slice(start) });
      break;
    }

    const end = scanner.pos;
    const value = scanner.scan_until(closingTagRe).replace(openingTagRe, "");

    // name => ['name', 'raw']
    // age:number => ['age', 'number']
    const [name, type = "raw"] = value.split(":");

    if (!scanner.scan(closingTagRe)) {
      throw new Error("Invalid close tag " + scanner.pos);
    }

    const content = template.slice(start, end);
    tokens.push({ name, type, content });
  }

  return tokens;
}

export function extract<T extends Dict = Dict>(
  tokens: Token[],
  text: string,
  format: ValueFormat<unknown> = (v => v.trim())
): T {
  const scanner = new Scanner(text);
  const result: Dict = {};

  for (const [index, cur] of tokens.entries()) {
    // 跳过占位 token
    if (!cur.name) break;

    const next = tokens[index + 1];

    // 截取片段
    const raw = scanner.extract_content(cur.content, next?.content);
    if (!raw) break;

    result[cur.name] = format(raw, cur);
  }

  return result as T;
}

const ESCAPE_REGEXP_RE = /[\-\[\]{}()*+?.,\\\^$|#\s]/g;

export function escapeRegExp(string: string): string {
  return string.replace(ESCAPE_REGEXP_RE, "\\$&");
}

export function compileTags(openingTag: string, closingTag: string) {
  const openingTagRe = new RegExp(escapeRegExp(openingTag) + "\\s*");
  const closingTagRe = new RegExp("\\s*" + escapeRegExp(closingTag));

  return [openingTagRe, closingTagRe] as const;
}

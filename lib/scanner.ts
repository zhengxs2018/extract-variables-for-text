export class Scanner {
  tail: string;
  pos: number;

  constructor(public content: string) {
    this.tail = content;
    this.pos = 0;
  }

  extract_content(prefix: string, suffix?: string): string | null {
    const tail = this.tail;
    const index = tail.indexOf(prefix);

    if (index === -1) return null;

    const start = index + prefix.length;

    let value = tail.substring(start);

    if (suffix) {
      const end = value.indexOf(suffix);
      if (end > -1) value = value.substring(0, end);
    }

    // 索引从 0 开始，所以需要减回去
    this.pos += start - 1;
    this.tail = tail.substring(start - 1);

    return value;
  }

  scan(re: RegExp): string {
    const tail = this.tail;
    const match = this.tail.match(re);

    if (!match) return "";

    const string = match[0];
    const len = match?.index || string.length;

    this.tail = tail.substring(len);
    this.pos += len;

    return string;
  }

  scan_until(re: RegExp): string {
    const tail = this.tail;
    const index = tail.search(re);

    let match = '';

    switch (index) {
      case -1:
        match = tail;
        this.tail = "";
        break;
      case 0:
        match = "";
        break;
      default:
        match = tail.substring(0, index);
        this.tail = tail.substring(index);
    }

    this.pos += match.length;

    return match;
  }

  end_of_string(): boolean {
    return !!this.tail;
  }
}

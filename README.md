# 根据模板提取目标字符串中的值

## 运行

```sh
# 运行示例
$ deno task start
```

## 示例

单行文本

```ts
import { to_tokens, extract } from "../lib/mod.ts";

const tokens = to_tokens("Adds <<min>>-<<max>> Maximum <<name>>");

console.log(extract(tokens, "Adds 40-1752 Maximum Stamina"));
//=> { min: "40", max: "1752", name: "Stamina" }
```

类型转换

```ts
import { to_tokens, extract, ValueFormat } from "../lib/mod.ts";

const tokens = to_tokens("Adds <<min:number>>-<<max:number>> Maximum <<name>>");

const format: ValueFormat<unknown> = (value, token) => {
  if (token.type === "number") return Number(value);
  
  return value.trim();
};

console.log(extract(tokens, "Adds 40-1752 Maximum Stamina", format));

//=> { min: 40, max: 1752, name: "Stamina" }
```

多行文本

```ts
import { to_tokens, extract } from "../lib/mod.ts";

const tpl = `
为防止群友长期摸鱼导致变笨，特此准备了几道题考考群友！
1.至今思项羽，不(<<a>>)过江东。
2.阳春布(<<b>>)泽，万物生光辉。
3.书籍是人类进步的阶梯。——高尔(<<c>>)
4.世人笑我太(<<d>>)癫，我笑他人看不穿。
5.老夫聊发少年(<<e>>)，左牵黄，右擎苍。
6.危楼高百尺，手可摘(<<f>>)辰。
7.君问归期未有(<<g>>)，巴山夜雨涨秋池。
8.(<<h>>)面边声连角起，千嶂里，长烟落日孤城闭。
9.料峭春风吹酒醒,(<<i>>)冷,山头斜照却相迎。
10.(<<j>>)闻琵琶已叹息，又闻此语重唧唧。
11.锦瑟无端(<<k>>) (<<l>>)弦，一弦一柱思华年。
`;

const text = `
为防止群友长期摸鱼导致变笨，特此准备了几道题考考群友！
1.至今思项羽，不(肯)过江东。
2.阳春布(德)泽，万物生光辉。
3.书籍是人类进步的阶梯。——高尔(基)
4.世人笑我太(疯)癫，我笑他人看不穿。
5.老夫聊发少年(狂)，左牵黄，右擎苍。
6.危楼高百尺，手可摘(星)辰。
7.君问归期未有(期)，巴山夜雨涨秋池。
8.(四)面边声连角起，千嶂里，长烟落日孤城闭。
9.料峭春风吹酒醒,(微)冷,山头斜照却相迎。
10.(我)闻琵琶已叹息，又闻此语重唧唧。
11.锦瑟无端(五) (十)弦，一弦一柱思华年。
`;

console.log(extract(to_tokens(tpl), text));
//=> {
//=>   a: "肯",
//=>   b: "德",
//=>   c: "基",
//=>   d: "疯",
//=>   e: "狂",
//=>   f: "星",
//=>   g: "期",
//=>   h: "四",
//=>   i: "微",
//=>   j: "我",
//=>   k: "五",
//=>   l: "十"
//=> }
```

## License

MIT

---
layout: post
title: "React native android mobile app disassembly"
date: 2023-09-10 16:40:00 +0100
categories: react native android disassembly mobile
permalink: /posts/react-native-disassembly
---

You're here because you didn't find a proper "how to" article? Lucky you, I prepared smth _worth_ reading and it's going to be a step-by-step guide of how to disassemble a react natice android mobile app and check the JS code 😉

First of all you need an [.apk][apk-wiki] file. I assume you already have it, otherwise you wouldn't be reading this. When I write this post, Google already introduced a new file type called `ABB`. You can read more [here][android-link] if you're interesed. Spoiler alert, it's not going to change much for us! Why? It's because at the very end google use this format to generate `.apk` files, so you don't get your hands on the `.abb` unless you're an app developer and the one who build the app 🙂

Nearly forgot to mention that disassembling an app [may][medium-legal] be illigal, so don't tell your mother what you're going to do 😆

Have you already downloaded the [Apktool][apktool]? It's one of a few tools you can use, but I found it quite capable. And it just does the job. Get the latest version [here][apktool-download] and follow the [download guide][apk-dow-guide]. When you open the link, you'll find a `wrapper script`. And it's called a wrapper for a reason! I paste you what's inside: `exec java $javaOpts -jar "$jarpath" "$@"`. Oh, java 🤔 but you've probably already noticed it. The file you've just downloaded has `.jar` extension. If you're lazy like me then just run

```bash
java -jar ./apktool_2.8.1.jar d app.apk
```

and no need for any wrappers! We've got some output

![Apktool output](/assets/images/2023-08-05/s1.png)

Let's play Indinana Jones and see what we can find. First of all, we've got few files

![Apktool output - files](/assets/images/2023-08-05/s2.png)

Let's make one step back, and think for a sec. Most of mobile apps has some kind of _terms & conditions_ or _privacy policy_ section. If they use some external libs you can probably find a list of them there. You would be surprised how many things are laying around waiting to be noticed and how useful it can be later. You should gather/check it before you started disassembling an app and I think should mention it earlier in the first place, so.. we're equal, don't complain and move forward 😜

`AndroidManifest.xml` file is where you find app permissions, list of activities, services, providers etc etc. If it's a RN app, then the `assets` folder is what you're really looking for. Inside is `index.android.bundle`. Oh yeah, we've finally found a bundle file 🎊 Double click and

![index.android.bundle file](/assets/images/2023-08-05/s3.png)

and here we are with a wall of hex 💩 what do you do now? Why not trying `strings`?

![strings output](/assets/images/2023-08-05/s4.png)

When you scroll up and down randomly you can find some usefull stuff. It's just 22438 lines, so you should handle it! Jokes asaide, I think we agree it's not the most efficient way 😅 I'm here to help you so try the `file` command

```bash
file index.android.bundle
```

The output should be similar to this one

```bash
index.android.bundle: Hermes JavaScript bytecode, version 90
```

`version` may wary depending on the app and which react native version it uses. [Hermes](https://reactnative.dev/docs/hermes) is an engine. You can enable/disable it when you develop a RN app. It should improve the startup time and memory consumtion. I wonder what would be an output if we disable `hermes`. Feel free to test that and let me know down in the comments 🙂

Anyway, now it's time to look a tool, or more precisely, a decompiler which can output something more useful than this mess. Take a look at [hermes-dec](https://labs.p1sec.com/2023/01/09/releasing-hermes-dec-an-open-source-disassembler-and-decompiler-for-the-react-native-hermes-bytecode/). Github link [here](https://github.com/P1sec/hermes-dec). Btw, don't forget to leave a star (it's free!). Follow the docs, clone the repo and run

```bash
./hermes-dec/hbc_decompiler.py ./app/assets/index.android.bundle file_output.js 
```

what you get in `file_output.js` is a decompiled version of a bundle file. Go and explore it! Don't expect to have a nice and clean code. What's going to be inside is much better, but function/variable names like `a,b,c,d,e,..` doesn't help. I can give you the last advice. Check the app you just decompiled and looks for keywords/strings near data which you want to get. For example you may want a data from a certan screen, but this screen comes with a header/title at the very top like "How to spot summer clouds?". Looks for it 🙂 Searching for some logic may start the same (popup blocking a "premium"? hehe), but it's going to be a little bit harder to find 🙂

To sum things up, I personally use this to check if app data is pulled from some kind of server or just hardcoded in the app. It may be faster than tunneling your network data (which is usually encrypted anyway) via `Burp` or similar tool, especially if you don't do that every day. Sometimes you can find a hardcoded array of data, or just a plain `json` file in a `raw` folder 🙂 Have fun plaing!

[apk-dow-guide]: https://apktool.org/docs/install
[apktool-download]: https://bitbucket.org/iBotPeaches/apktool/downloads/
[apktool]: https://apktool.org/
[medium-legal]: https://gayatri-panchal19.medium.com/decompilation-legal-or-illegal-160940a6bbe6
[apk-wiki]: https://en.wikipedia.org/wiki/Apk_(file_format)
[android-link]: https://developer.android.com/guide/app-bundle

{% include posts_footer.html %}

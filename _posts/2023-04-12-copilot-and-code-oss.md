---
layout: post
title: "Code OSS and Github Copilot, or any missing extension"
date: 2023-04-12 11:00:00 +0100
categories: github manjaro guide
permalink: /posts/commetns-testing
---

It's been a while since I started using Manjaro with Code OSS and I love it! Code OSS is fully open source, where Microsoft VS Code comes with an additional _closed-source_ software. More details [here][difference], but long story short, because of this difference, we may not be able to install all the extensions directly via the Code OSS (the catch is the [product.json][product-json] file). **Github Copilot is one of them!**. Luckily, we can install any extension we want via the `code` cli command or via `CTRL + P`.

1. Go to the Visual Studio Marketplace, find [github copilot][copilot] and hit `Download Extension`. You'll get a file ending with `.vsix`.
2. Use the [cli][install-from-a-vsix] or `CTRL + Shift+ P` -> `Extensions: Install from VSIX...` and select GH Copilot file you just downloaded.
3. Run `Ctrl + Shift+ P` -> `Preferences: Configure Runtime Arguments` command, and in the JSON file add the following entry: "enable-proposed-api":["github.copilot"] (found [here][copilot-new-api])
4. Restart Code OSS 😉

The 3rd will not be needed in the future when the proposed changes to the Code OSS api will be merged.

[copilot]: https://marketplace.visualstudio.com/items?itemName=GitHub.copilot
[install-from-a-vsix]: https://code.visualstudio.com/docs/editor/extension-marketplace#_install-from-a-vsix
[product-json]: https://stackoverflow.com/questions/37143536/no-extensions-found-when-running-visual-studio-code-from-source
[difference]: https://github.com/microsoft/vscode/wiki/Differences-between-the-repository-and-Visual-Studio-Code
[copilot-new-api]: https://github.com/orgs/community/discussions/6629

{% include posts_footer.html %}

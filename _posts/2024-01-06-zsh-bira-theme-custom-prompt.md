---
layout: post
title: "How to remove username from macos terminal and zsh bira theme cli prompt title"
date: 2024-01-06 17:00:00 +0100
categories: zsh macos terminal ohmyzsh tips hacks shell
permalink: /posts/zsh-bira-theme-custom-prompt
---

[TLDR](#tldr) below 😄

It's a new year, so I decided to try a few new things. I was thinking a lot about switching to macos so I decided it's finally time to give it a try. I feel sad leaving majaro liniux, I think it's an amazing distro with everything you may want for your everyday tasks. I'll keep it on my private laptop though. So, macos for work and manjaro for everything else, it's been decided 😉

What I realized after I got a macbook from my company it's how custom my linux setup was. I promise to write the ultimate manjaro -> macos switching tutorial at some point, but I'm still learning it!

Today's post is about small terminal update you may be interested to do for yourself. I use [zsh][zsh] combined with [ohmyzsh][ohmyzsh] and only [git][git] plugin enabled. My favorite theme is [bira][bira] one of the default ones. I got my laptop with already configured username which includes my name and surname. I like to work in a coffee shops or cowork spaces and prefer not to have my details displayed on every cli command I type. C'mon, just look at this 🙃

![Terminal screenshot](/assets/images/2024-01-06/image-7.png)

Privacy first man! This post should be useful even if you want do make a different modification. I always try to include every step, especially the pointless ones, and as many useful links as possible 🙂

Spoiler alert: we would need to update the window title and the cli prompt separately. I start with the latter, because that's what I found first 😛

Ok, after some googling here and there, I found [this][article1] article. It mentions the `$PS1` variable. This is the value if you `echo` it on the bare `bash`

![ps1 variable in bash](/assets/images/2024-01-06/image-2.png)

And we've got smth like `\s-\v\$`. You can find many more properties, like `\u` - which is username, or `\H` - hour. If you want to apply some settings for the current terminal session then use `export PS1="your_config"`

![export PS1 variable result](/assets/images/2024-01-06/image-1.png)

Or at least that's what they claim in this article! What would be the result for my `zsh` config then?

![echo PS1 result](/assets/images/2024-01-06/image.png)

As you can see, it's much more complicated. It contains some ruby, git configs, line break and more. We're interested in the `%n` which represents `$USERNAME` and `%m` - hostname. These and many more variables are pretty well documented in the [zsh prompt expansion][zsh prompt expansion] docs. So let's try to replace this value with some custom string!

![customized PS1 in zsh](/assets/images/2024-01-06/image-4.png)

And if you didn't forget to wrap the variable in `""` you should get something like this. There's just one issue. **Where are the colors?!** 😱 See this green bar, it's now white, but it's not only that, we've also lost the folder colors. This is awful 🤢 We went this far, and still, we need more googling!

I was really close to start reading the official [zsh docs][zsh docs]. As a side note, I also found this very nice [zsh intro][zsh intro]. This was the moment when I thought, _why not look at the theme itself_? And [here it is][bira theme], my lovely bira theme! And what we've got here, the `PROMPT` variable and  the`user_host`!

![bira config from github](/assets/images/2024-01-06/image-5.png)

We can now fork this config and create our custom theme with the `user_host` replaced 🎉, but wait, wait, not so fast. We're a bit too lazy for that, aren't we? Why not copy-pasting these two lines to to our `.zshrc` and see what happens? It's just a config, isn't it? Should work out of the box, am I right? 🤔 Let's add these it at the very end of the file

```bash
local user_host="%B%(!.%{$fg[red]%}.%{$fg[green]%})buy@me-aCoffee%{$reset_color%} "
PROMPT="╭─${user_host}${current_dir}${rvm_ruby}${vcs_branch}${venv_prompt}
╰─%B${user_symbol}%b "
```

and we've got it! Fully coloured, and no custom theme 🎉

![Alt text](/assets/images/2024-01-06/image-6.png)

There's last thing to do. We've changed the cli prop, but we also need to change the very top terminal title which still includes my name and surname.

I started changing the title in the `Terminal->Settings->Profiles->Window->Title`, but this title was overwritten straightway, every time I opened a new Terminal window.

![macos Terminal settings](/assets/images/2024-01-06/image-8.png)

Did you know you can open the terminal inspector via `command + shift + I`? I didn't up until now! Sadly, it was pointless, because the `title` was automatically updated back to what it was after I entered the first `cd` command. What a pain in the ass!

![Terminal inspector](/assets/images/2024-01-06/image-9.png)

At least we know it's related to the `zsh` and that you can change the terminal title from the cli. I finally found some hints pointing back to the `.zshrc` file. And in this, the holy grail, the commented out `DISABLE_AUTO_TITLE="true"` with some explanation for brainless folks like me

```bash
# Uncomment the following line to disable auto-setting terminal title.
DISABLE_AUTO_TITLE="true"
```

Wonderful, so all it's left is to turn off your terminal or type `source ~/.zshrc` to update the current terminal session. Voilà!

#### <a id="tldr"></a> TLDR

1. To disable macos Terminal title auto update by zsh, uncomment `DISABLE_AUTO_TITLE` from your `.zshrc` file

2. To change zsh cli prompt title add these two lines to your `.zshrc` file

```bash
local user_host="%B%(!.%{$fg[red]%}.%{$fg[green]%})buy@me-aCoffee%{$reset_color%} "
PROMPT="╭─${user_host}${current_dir}${rvm_ruby}${vcs_branch}${venv_prompt}
╰─%B${user_symbol}%b "
```

[zsh]: https://www.zsh.org/
[ohmyzsh]: https://github.com/ohmyzsh/ohmyzsh
[git]: https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins/git
[bira]: https://github.com/ohmyzsh/ohmyzsh/wiki/Themes#bira
[article1]: https://www.cyberciti.biz/faq/bash-shell-change-the-color-of-my-shell-prompt-under-linux-or-unix/
[zsh prompt expansion]: https://zsh.sourceforge.io/Doc/Release/Prompt-Expansion.html
[zsh docs]: https://zsh.sourceforge.io/Doc/Release/
[zsh intro]: https://github.com/rothgar/mastering-zsh/tree/master
[bira theme]: https://github.com/ohmyzsh/ohmyzsh/blob/master/themes/bira.zsh-theme

{% include posts_footer.html %}

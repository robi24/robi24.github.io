---
layout: post
title: "Mounting encrypted LUKS kingston pendrive on macos"
date: 2024-01-12 18:00:00 +0100
categories: luks macos linsk tips hacks
permalink: /posts/encrypted-luks-and-macos
---

[TLDR](#tldr) 😄

If you read the previous post you should already know I switched from linux to macos. And I learned a new thing! Back in the day I bought a barely used 8GB [Kingston Data Traveler (DT) 2000][dt2000], very cheaply, to keep my most important files safe and portable. It comes with the build-in keypad, you type your password, plug the stick in and it just works, you can now access you files. It'll wipe your data if you fail to type your password 10 times. I used it for a while, but was bothered by a thought. Would you trust Kingston or any other company with a device they consider _secure_ which you can't even update and their soft isn't open-source? Probably yes, because you're not [Snowden][snowden] 😛 Should be more than enough to keep you files hidden from your grandmother! Btw, don't underestimate your granny 😄 It wasn't enough for my brain though, it was still poking me every now and then, annoying! In the end, I wiped the whole pendrive and encrypted it. I don't remember what I used, probably something which was available via my gui (did I use Ubuntu back in the day?? 😱). I imagine it could be some kind of _encrypt_ checkbox. Fancy encryption FTW. It was enough for my brain to let go 😄 Today, I faced a small issue. I realized that [LUKS][luks] is not supported by macos. They probably have their own _secure_ tools, which I think I trust even less than the Kingston _hardware-based, Full Disk AES 256-bit data encryption in XTS mode_. Fancy marketing. Anyway, I already have encrypted partition inside a hardware encrypted USB stick, and the issue, I can't access my data on macos. Googling time!

I stumbled upon some very neat tool called [linsk][linsk]:
> Linsk is a utility that allows you to access Linux-native file system infrastructure, including LVM and LUKS on Windows and macOS.

I decided to give it a go. I followed the [install manual][links-installation], added missing [qemu][qemu] and [golang][golang] as described in the readme and, finally, `linsk` itself. Time for the [macos manual][links-macos-manual]. Oh, and don't forget to [add golang bin folder to your shell PATH][add-go-to-path].

1. Build 

```bash
linsk build
```

2. Connect the encrypted usb stick, macos will show a waring alert box to ask if you want to mount it. Don't do that! Hit `ignore`. You can read console warning for more info later

![macos alert](/assets/images/2024-01-14/image-3.png)


3. Run the below command to find the path. In my case it's `dev:/dev/disk4`

```bash
diskutil list
```

![diskutil list command result](/assets/images/2024-01-14/image.png)

4. Next we list what's inside the `disk4`

```bash
sudo linsk ls dev:/dev/disk4
```

![links ls command result](/assets/images/2024-01-14/image-2.png)

And yes, you'll be prompted again. Annoying, but we can live with it. As you can see it says `crypto_LUKS` which means the whole pendrive is behind our encryption wall. It's mentioned under [advanced][luks-docs-advanced] section.

5. We need to run `ls` on our `vdb1` with the `--luks-container` flag

![links ls command with container flag result](/assets/images/2024-01-14/image-4.png)

So close, we can see the `cryptcontainer`, the file system and `r`, probably `read` flag.

6. Run! In the docs you find a magic `mapper` keyword in command examples. I expect this is what we need to add to our last parameter which is `cryptcontainer`?

```bash
sudo linsk run dev:/dev/disk4 --luks-container vdb1 mapper/cryptcontainer
```

![linsk run command result](/assets/images/2024-01-14/image-5.png)

That's it! Of course after you successfully typed three passwords, first on the stick, second for `sudo` and third one for your encrypted `vdb`. And you guessed correctly, I also encrypted few files separately, so it would be 4! 🤯
`linsk` hosts the [AFP][afp] server for you. This is the bridge between linux and macos we needed.

7. Now, open this `Finder` and hit `Go -> Connect to server`

![finder login to aft login window](/assets/images/2024-01-14/image-6.png)

8. Enjoy!

![finder results window](/assets/images/2024-01-14/image-7.png)

Ahh, and the last one. Don't forget to safely unmount the drive! I got an led which flashes during the save/read process. I suppose you don't want to break _some bytes_, especially, during the save process on double encrypted drive ☠️

#### <a id="tldr"></a> TLDR

Install [luks][luks], it's a small VM which hosts an [AFP][afp] server you use to access your files. Ignore all macos warnings.

[dt2000]: https://media.kingston.com/support/downloads/dt2000_UserManual.pdf
[snowden]: https://en.wikipedia.org/wiki/Edward_Snowden
[luks]: https://en.wikipedia.org/wiki/Linux_Unified_Key_Setup
[linsk]: https://github.com/AlexSSD7/linsk/tree/master
[links-installation]: https://github.com/AlexSSD7/linsk/blob/master/INSTALL_MACOS.md
[qemu]: https://www.qemu.org/docs/master/about/index.html
[links-macos-manual]: https://github.com/AlexSSD7/linsk/blob/master/USAGE_MACOS.md#linsk-macos-usage-instructions
[golang]: https://go.dev/doc/install
[add-go-to-path]: https://stackoverflow.com/a/57217841
[luks-docs-advanced]: https://github.com/AlexSSD7/linsk/blob/master/USAGE_MACOS.md#use-an-lvm-volume-group-contained-inside-a-luks-volume
[afp]: https://en.wikipedia.org/wiki/Apple_Filing_Protocol

{% include posts_footer.html %}

---
layout: post
title: "CapsLock as Backspace or any other key remap guide for linux xorg"
date: 2023-05-28 17:00:00 +0100
categories: xorg manjaro linux arch tips hacks keyboard
permalink: /posts/capslock-to-backspace-key-remapping
---

There are so many articles on the web about swapping/remapping keyboard layout. The thing is I found most of them working till reboot, working only on some specific distros, working partially (e.g.: clicking working fine but long press not), or not working at all 🙃 So here it is, the ultimate, 1min (if you're drinking coffee in the meantime and don't want to split some on your super fancy and expensive keyboard ☕), copy paste solution to make `CapsLock` work as a `Backspace` 🎉 Or whatever key you want to swap/remap, you just need to know the right key name ([how to get a list of valid x11 names][superuser-answer]).

Let's start with some intro. I should tell you earlier that you need to use [Xorg][xorg]. If you're a [Wayland][wayland] user I can only share this [link][stackexchange-wayland] and wish you luck 🤞 (just kidding, the solution from `Tony Beta Lambda's` should work just fine). Ok, back to the topic. The `Xorg` server uses the `X` keyboard extension (`XKB`) to define keyboard layouts, but where are we going to find the right layout file we need to update? It's under `X11` folder. What's `X11`? It's a protocol to handle drawing on a display and sending input events (keyboard/mouse clicks movements). To sum things up, `Xorg` is a server/application which uses `X11` protocol. That's why `xkb` is inside the `X11` folder. You can learn a lot just by looking at a file path, don't you? 😉

1. Open your `X11/xkb/symbols/pc` file with the rights to edit.

    ```bash
    sudo gedit /usr/share/X11/xkb/symbols/pc
    ```

2. Find a `key <CAPS>` part and replace the second part of it with `BackSpace`. That's how this line should look like after editing (reminder: you can update any key you want!).

    ```bash
    key <CAPS> {[  BackSpace,  BackSpace  ]};
    ```

3. Clean the cache. We can find it under `var/lib/xkb`. The `X` server uses this directory to store the compiled version of the current keymap.

    ```bash
    sudo rm -rf /var/lib/xkb/*
    ```

4. Reboot your system and enjoy your new ⌨ layout!

It's worth adding that you may need to repeat this process after updating your system. You may say it's not the most ultimate solution, and you're right! Why don't you share your _ultimate_ below? 😉

[xorg]: https://wiki.archlinux.org/title/Xorg/Keyboard_configuration
[wayland]: https://wayland.freedesktop.org/
[stackexchange-wayland]: https://unix.stackexchange.com/a/526192
[superuser-answer]: https://superuser.com/a/1461427

{% include posts_footer.html %}

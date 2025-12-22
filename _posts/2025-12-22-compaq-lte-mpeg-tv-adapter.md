---
layout: post
title: "Compaq LTE mpeg tv video adapter"
date: 2025-12-22 19:00:00 +0100
categories: compaq retro electronics
permalink: /posts/compaq-mpeg-tv-video-adapter
---

Exactly 8 years ago I came across this Compaq MPEG TV Video adapter on a local auction site where I bought it for a few bucks. Much later it turned out it was quite a rare piece of retro hardware. It plugs at the back of the [Compaq LTE][compaq] docking station (5000 series) to their proprietary mpeg connector, but I haven't had a chance to test it yet.

<img src="/assets/images/2025-12-22/compaq1.jpg" alt="compaq adapter image 1" width="400" />

<img src="/assets/images/2025-12-22/compaq2.jpg" alt="compaq adapter image 2" width="400" />

<img src="/assets/images/2025-12-22/compaq3.jpg" alt="compaq adapter image 3" width="400" />

There's a Compaq logo at the top and a sticker on the bottom. We can learn it's powered by 18V (up to 2.6A). It's hard to say whether it requires a dedicated power supply to work or it's only required for some of the features. There's a mention in the [manual][manual] about it (`MPEG AC Adapter (not shown) - 241909-001` on page 95-97 - Chapter 3.9 Computer Optional Accessories). The adapter itself has a power port on the side (positive inside, negative outside).

<img src="/assets/images/2025-12-22/compaq4.jpg" alt="compaq adapter image 4" width="400" />

<img src="/assets/images/2025-12-22/compaq5.jpg" alt="compaq adapter image 5" width="400" />

What's on the back of the adapter? It has a few _out_ ports on the left like composite, S-Video, plus two jacks, in and out. On the right side there's the VGA port for external monitor, video and S-Video inputs and a keyboard or mouse PS2 port. The docking station is already equipped with two PS2 connectors for keyboard/mouse, VGA and headphone/speaker jack, so I imagine it had a little value for an average user.

<img src="/assets/images/2025-12-22/compaq6.jpg" alt="compaq adapter image 6" width="400" />

<img src="/assets/images/2025-12-22/compaq7.jpg" alt="compaq adapter image 7" width="400" />

What else can we learn from the [manual][manual]?

```text
The MPEG and TV Video Adapter option is supported with the computer and both expansion bases. This option provides an MPEG decoder for high quality digital video playback with Windows scaling and interleaved stere audio, S-Video I/O for laser disc quality playback video, and composite video supporting the NTSC/PAL formats.

[...]

The graphics controller also supports display of real-time video from the MPEG and TV Video Adapter at a rate of 30 frames per second (fps). It provides the capability to overlay the video in a Windows screen.

[...]

The computer supports an interface to an MPEG and TV Video Adapter that attaches to the rear of the computer. The adapter provides up to 30 fps of live video or MPEG video to the graphics controller for display on the LCD, a CRT, or a television. The MPEG and TV Video Adapter and CD-ROM drive can be used simultaneously.
```

And below are some pictures after the disassembly. The case is held by 5 screws, 2 hidden behind anti-slip rubber. We can see the manufacture date (May 22 1996) and a few chips:

- **Philips SAA 7100 WP** - some kind of Digital Tuner Decoder Sat (based on a newer [SAA 7500][7500] version)
- **Auravision VXP501 CPQ** - video processing
- **C-Cube CL-480-T128 MV FO JAPAN 9620** - possibly the mpeg codec decode chip made by C-Cube Microsystems (later known as LSI Logic and then **Broadcom**). 9620 is likely date code indicating 20th week of 1996 (May 13-19th)
- **CHRONTEL CH7001 AM199B** - VGA to NTSC/PAL Encoder ([datasheet][chrontel-datasheet])

<img src="/assets/images/2025-12-22/compaq8.jpg" alt="compaq adapter image 8" width="400" />

<img src="/assets/images/2025-12-22/compaq9.jpg" alt="compaq adapter image 9" width="400" />

<img src="/assets/images/2025-12-22/compaq10.jpg" alt="compaq adapter image 10" width="400" />

<img src="/assets/images/2025-12-22/compaq11.jpg" alt="compaq adapter image 11" width="400" />

<img src="/assets/images/2025-12-22/compaq12.jpg" alt="compaq adapter image 12" width="400" />

<img src="/assets/images/2025-12-22/compaq13.jpg" alt="compaq adapter image 13" width="400" />

<img src="/assets/images/2025-12-22/compaq14.jpg" alt="compaq adapter image 14" width="400" />

<img src="/assets/images/2025-12-22/compaq15.jpg" alt="compaq adapter image 15" width="400" />

<img src="/assets/images/2025-12-22/compaq16.jpg" alt="compaq adapter image 16" width="400" />

[compaq]: https://en.wikipedia.org/wiki/Compaq_LTE_5000_series
[manual]: /assets/files/2025-12-22/Compaq_LTE_5000_Family_Maintenance_and_Service_Guide.pdf
[7500]: https://tvsat.com.pl/PDF/S/saa7500_ph.pdf
[chrontel-datasheet]: /assets/files/2025-12-22/CH7001C.PDF

{% include posts_footer.html %}

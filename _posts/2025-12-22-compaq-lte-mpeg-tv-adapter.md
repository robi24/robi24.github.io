---
layout: post
title: "Compaq LTE MPEG TV Video Adapter"
date: 2025-12-22 19:00:00 +0100
categories: compaq retro electronics hardware
permalink: /posts/compaq-mpeg-tv-video-adapter
---

Exactly 8 years ago I came across this Compaq MPEG TV Video adapter on a local auction site where I bought it for a few bucks. Much later it turned out it was quite a rare piece of retro hardware. It plugs at the back of the [Compaq LTE][compaq] docking station (5000 series) to their proprietary mpeg connector, but I haven't had a chance to test it yet.

<img src="/assets/images/2025-12-22/compaq1_small.jpg" alt="Top view of the Compaq MPEG TV Video adapter" width="400" />

<img src="/assets/images/2025-12-22/compaq2_small.jpg" alt="Angled view of the Compaq MPEG TV Video adapter showing its black housing and connector" width="400" />

<img src="/assets/images/2025-12-22/compaq3_small.jpg" alt="Bottom view of the Compaq adapter showing the specification sticker with 18V 2.6A power rating" width="400" />

_(full size: [image 1][compaq1] [image 2][compaq2] [image 3][compaq3])_

There's a Compaq logo at the top and a sticker on the bottom. We can learn it's powered by 18V (up to 2.6A). It has a power port on the side (positive inside, negative outside), but once the adapter is plugged into a docking station there's no way to use it, which I assume means it may work standalone? 🤔 In the [manual][manual] we can find a mention of `MPEG AC Adapter` (part number `241909-001`, page 95-97, `Chapter 3.9 Computer Optional Accessories`), but this may be even harder to find than the mpeg adapter itself.

<img src="/assets/images/2025-12-22/compaq4_small.jpg" alt="Side view of the adapter showing the power port with positive inside, negative outside polarity" width="400" />

<img src="/assets/images/2025-12-22/compaq5_small.jpg" alt="Side view of the adapter" width="400" />

_(full size: [image 4][compaq4] [image 5][compaq5])_

What's on the back of the adapter? It has a few _out_ ports on the left like composite, S-Video, plus two jacks, in and out. On the right side there's the VGA port for external monitor, video and S-Video inputs and a keyboard or mouse PS2 port.

<img src="/assets/images/2025-12-22/compaq6_small.jpg" alt="Rear panel showing VGA port, video and S-Video inputs, and PS2 port on the right side" width="400" />

<img src="/assets/images/2025-12-22/compaq7_small.jpg" alt="Rear panel of the adapter showing composite, S-Video output ports and audio jacks on the left side" width="400" />

_(full size: [image 6][compaq6] [image 7][compaq7])_

The docking station is already equipped with two PS2 connectors for keyboard/mouse, VGA and headphone/speaker jack, so I imagine it had little value for an average user.

<img src="/assets/images/2025-12-22/compaq17_small.jpg" alt="Compaq LTE 5000 series docking station rear panel with adapter plugged in" width="400" />

<img src="/assets/images/2025-12-22/compaq18_small.jpg" alt="Bottom view of the Compaq docking station with its proprietary MPEG connector visible" width="400" />

_(full size: [image 17][compaq17] [image 18][compaq18])_

What else can we learn from the [manual][manual]?

```text
The MPEG and TV Video Adapter option is supported with the computer and both expansion bases. This option provides an MPEG decoder for high quality digital video playback with Windows scaling and interleaved stereo audio, S-Video I/O for laser disc quality playback video, and composite video supporting the NTSC/PAL formats.

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

<img src="/assets/images/2025-12-22/compaq8_small.jpg" alt="Disassembled Compaq adapter showing the opened case with manufacture date visible" width="400" />

<img src="/assets/images/2025-12-22/compaq9_small.jpg" alt="Disassembled Compaq adapter showing the opened case PCB" width="400" />

<img src="/assets/images/2025-12-22/compaq10_small.jpg" alt="Compaq adapter metal shield" width="400" />

<img src="/assets/images/2025-12-22/compaq11_small.jpg" alt="Overall view of the internal PCB with all major chips and components visible" width="400" />

<img src="/assets/images/2025-12-22/compaq12_small.jpg" alt="Close-up of the C-Cube chip" width="400" />

<img src="/assets/images/2025-12-22/compaq13_small.jpg" alt="Close-up of the C-Cube and CHRONTEL CH7001 chip" width="400" />

<img src="/assets/images/2025-12-22/compaq14_small.jpg" alt="Close-up of the Philips chip" width="400" />

<img src="/assets/images/2025-12-22/compaq15_small.jpg" alt="Close-up of the Auravision chip" width="400" />

<img src="/assets/images/2025-12-22/compaq16_small.jpg" alt="Manually soldered wire" width="400" />

_(full size: [image 8][compaq8] [image 9][compaq9] [image 10][compaq10] [image 11][compaq11] [image 12][compaq12] [image 13][compaq13] [image 14][compaq14] [image 15][compaq15] [image 16][compaq16])_

[compaq]: https://en.wikipedia.org/wiki/Compaq_LTE_5000_series
[manual]: /assets/files/2025-12-22/Compaq_LTE_5000_Family_Maintenance_and_Service_Guide.pdf
[7500]: https://tvsat.com.pl/PDF/S/saa7500_ph.pdf
[chrontel-datasheet]: /assets/files/2025-12-22/CH7001C.PDF
[compaq1]: /assets/images/2025-12-22/compaq1.jpg
[compaq2]: /assets/images/2025-12-22/compaq2.jpg
[compaq3]: /assets/images/2025-12-22/compaq3.jpg
[compaq4]: /assets/images/2025-12-22/compaq4.jpg
[compaq5]: /assets/images/2025-12-22/compaq5.jpg
[compaq6]: /assets/images/2025-12-22/compaq6.jpg
[compaq7]: /assets/images/2025-12-22/compaq7.jpg
[compaq8]: /assets/images/2025-12-22/compaq8.jpg
[compaq9]: /assets/images/2025-12-22/compaq9.jpg
[compaq10]: /assets/images/2025-12-22/compaq10.jpg
[compaq11]: /assets/images/2025-12-22/compaq11.jpg
[compaq12]: /assets/images/2025-12-22/compaq12.jpg
[compaq13]: /assets/images/2025-12-22/compaq13.jpg
[compaq14]: /assets/images/2025-12-22/compaq14.jpg
[compaq15]: /assets/images/2025-12-22/compaq15.jpg
[compaq16]: /assets/images/2025-12-22/compaq16.jpg
[compaq17]: /assets/images/2025-12-22/compaq17.jpg
[compaq18]: /assets/images/2025-12-22/compaq18.jpg

{% include posts_footer.html %}

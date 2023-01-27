- Give the outputs names based on the input name instead of simply `1.mp4`.
- Continue exploring formats.

---

Video → Raw video

```
ffmpeg -y -i input.mp4 -f rawvideo -s 1920x1080 -r 25 -pix_fmt rgb24 -an input.raw
```

Raw video filter as audio

```
ffmpeg -y -f alaw -ar 44100 -ac 1 -i input.raw -af tremolo -f alaw -ar 44100 -ac 1 output.raw
```

```
ffmpeg -y -f alaw -ar 44100 -ac 1 -i input.raw -f alaw -ar 44100 -ac 1 -i input-2.raw -filter_complex amix=inputs=2:duration=first -f alaw -ar 44100 -ac 1 output.raw
```

```
node index.mjs
```

Raw video play

```
ffplay -f rawvideo -video_size 1920x1080 -framerate 25 -pixel_format rgb24 -i output.raw
```

Raw video → Video

```
ffmpeg -y -f rawvideo -video_size 1920x1080 -framerate 25 -pixel_format rgb24 -i output.raw -s 1920x1080 -r 25 output.mp4
```

Audio → Raw audio

```
ffmpeg -y -i input.wav -f alaw -ar 44100 -ac 1 -vn input.raw
```

Raw audio filter as video

```
ffmpeg -y -f rawvideo -video_size 100x100 -framerate 5 -pixel_format rgb24 -i input.raw -vf erosion -f rawvideo -video_size 100x100 -framerate 5 -pixel_format rgb24 output.raw
```

Raw audio play

```
ffplay -volume 10 -f alaw -ar 44100 -ac 1 -i output.raw
```

Raw audio → Audio

```
ffmpeg -y -f alaw -ar 44100 -ac 1 -i output.raw output.wav
```

Cut long video

```
ffmpeg -y -ss 00:00:07.00 -t 00:00:10.00 -i "examples/video--long--small.mp4" -f rawvideo -s 960x540 -r 5 -pix_fmt yuva444p9be -an "examples/video--long--small.raw"
```

---

- Consider allowing the user to provide presets of filters they like, for example…
- Use https://www.npmjs.com/package/@ffmpeg/ffmpeg and allow you to data bend in the browser without having to upload!
- We could provide just the conversion to raw and then back, to allow for people to bend outside our application, for example, using REAPER.
- Have a way for people to say what bends they liked and what they didn’t like.

---

| Filter            | Succeeded | Duration | Interesting |
| ----------------- | --------- | -------: | ----------- |
| abench            | ✅        |    749ms | ❌          |
| acompressor       | ✅        |   2045ms | ✅          |
| acontrast         | ✅        |   1162ms | ✅          |
| acopy             | ✅        |    812ms | ❌          |
| acrusher          | ✅        |   1633ms | ❌          |
| acue              | ✅        |    616ms | ❌          |
| adeclick          | ✅        | 178770ms | ✅          |
| adeclip           | ❌        |          |             |
| adecorrelate      | ✅        |   2195ms | ✅          |
| adelay            | ✅        |    683ms | ❌          |
| adenorm           | ✅        |    780ms | ❌          |
| aderivative       | ✅        |    833ms | ✅          |
| adynamicequalizer | ✅        |   2596ms | ❌          |
| adynamicsmooth    | ✅        |   1856ms | ✅          |
| aecho             | ✅        |    980ms | ✅          |
| aemphasis         | ✅        |   1213ms | ✅          |
| aeval             | ❌        |      9ms |             |
| aexciter          | ✅        |   1405ms | ✅          |
| afade             | ✅        |    584ms | ❌          |
| afftdn            | ✅        |   6038ms | ❌          |
| afftfilt          | ✅        |   5119ms | ❌          |
| afifo             | ✅        |    607ms | ❌          |
| aformat           | ✅        |    739ms | ❌          |
| afreqshift        | ✅        |   2468ms | ✅          |
| afwtdn            | ✅        |   4649ms | ❌          |
| agate             | ✅        |   1415ms | ❌          |
| aintegral         | ✅        |    607ms | ❌          |
| alatency          | ✅        |    656ms | ❌          |
| alimiter          | ✅        |   1222ms | ✅          |
| allpass           | ✅        |   1339ms | ✅          |
| aloop             | ✅        |    767ms | ❌          |
| ametadata         | ❌        |     10ms |             |
| anlmdn            | ❌        |  30006ms |             |
| anull             | ✅        |    715ms | ❌          |
| apad              | ❌        |  30030ms |             |
| aperms            | ✅        |   9175ms | ❌          |
| aphaser           | ✅        |   1449ms | ✅          |
| aphaseshift       | ✅        |   2214ms | ✅          |
| apsyclip          | ❌        |  30002ms |             |
| apulsator         | ✅        |   2816ms | ✅          |
| arealtime         | ❌        |  30002ms |             |
| aresample         | ✅        |    668ms | ❌          |
| areverse          | ✅        |    878ms | ✅          |
| arnndn            | ❌        |      7ms |             |
| asendcmd          | ❌        |      8ms |             |
| asetnsamples      | ✅        |    609ms | ❌          |
| asetpts           | ✅        |    753ms | ❌          |
| asetrate          | ✅        |   1909ms | ✅          |
| asettb            | ✅        |    617ms | ❌          |
| ashowinfo         | ✅        |    990ms | ❌          |
| asidedata         | ❌        |     14ms |             |
| asoftclip         | ✅        |    942ms | ✅          |
| aspectralstats    | ✅        |   4028ms | ❌          |
| astats            | ✅        |   1553ms | ❌          |
| asubboost         | ✅        |   1525ms | ✅          |
| asubcut           | ✅        |   3627ms | ✅          |
| asupercut         | ✅        |   2996ms | ✅          |
| asuperpass        | ✅        |   1944ms | ✅          |
| asuperstop        | ✅        |   2055ms | ✅          |
| atempo            | ✅        |   2185ms | ✅          |
| atilt             | ✅        |   3270ms | ❌          |
| atrim             | ✅        |    616ms | ❌          |
| bandpass          | ✅        |   1286ms | ✅          |
| bandreject        | ✅        |   1255ms | ✅          |
| bass              | ✅        |    970ms | ❌          |
| biquad            | ✅        |    668ms | ❌          |
| channelmap        | ❌        |      8ms |             |
| chorus            | ❌        |      9ms |             |
| compand           | ✅        |   1701ms | ❌          |
| compensationdelay | ✅        |    840ms | ❌          |
| crossfeed         | ✅        |   1312ms | ✅          |
| crystalizer       | ✅        |    834ms | ✅          |
| dcshift           | ✅        |    751ms | ❌          |
| deesser           | ✅        |   1095ms | ❌          |
| drmeter           | ✅        |   1041ms | ❌          |
| dynaudnorm        | ✅        |    867ms | ❌          |
| earwax            | ✅        |   3446ms | ✅          |
| equalizer         | ✅        |    829ms | ❌          |
| extrastereo       | ✅        |   1269ms | ✅          |
| firequalizer      | ✅        |   1379ms | ❌          |
| flanger           | ✅        |   1424ms | ✅          |
| haas              | ✅        |   1078ms | ✅          |
| hdcd              | ❌        |     10ms |             |
| highpass          | ✅        |   1115ms | ✅          |
| highshelf         | ✅        |    941ms | ❌          |
| loudnorm          | ✅        |  22511ms | ✅          |
| lowpass           | ✅        |    883ms | ✅          |
| lowshelf          | ✅        |    866ms | ❌          |
| mcompand          | ✅        |   7915ms | ✅          |
| pan               | ❌        |      7ms |             |
| replaygain        | ✅        |   3043ms | ✅          |
| silencedetect     | ✅        |    652ms | ❌          |
| silenceremove     | ✅        |    718ms | ❌          |
| speechnorm        | ✅        |    949ms | ❌          |
| stereotools       | ✅        |   1390ms | ✅          |
| stereowiden       | ✅        |   1062ms | ✅          |
| superequalizer    | ✅        |   1313ms | ❌          |
| surround          | ✅        |  10110ms | ✅          |
| treble            | ✅        |    895ms | ❌          |
| tremolo           | ✅        |    948ms | ✅          |
| vibrato           | ✅        |   1057ms | ✅          |
| volume            | ✅        |    701ms | ❌          |
| volumedetect      | ✅        |    744ms | ❌          |

---

| Pixel Format | Succeded | Duration |
| ------------ | -------- | -------: |
| 0bgr         | ✅       |   2820ms |
| 0rgb         | ✅       |   2584ms |
| abgr         | ✅       |   2573ms |
| argb         | ✅       |   2424ms |
| ayuv64le     | ✅       |   4442ms |
| bgr0         | ✅       |   2302ms |
| bgr24        | ✅       |   1807ms |
| bgr4_byte    | ✅       |    893ms |
| bgr444be     | ✅       |   1346ms |
| bgr444le     | ✅       |   1466ms |
| bgr48be      | ✅       |   3429ms |
| bgr48le      | ✅       |   3568ms |
| bgr555be     | ✅       |   1722ms |
| bgr555le     | ✅       |   1802ms |
| bgr565be     | ✅       |   1356ms |
| bgr565le     | ✅       |   1367ms |
| bgr8         | ✅       |    821ms |
| bgra         | ✅       |   2291ms |
| bgra64be     | ✅       |   4161ms |
| bgra64le     | ✅       |   4198ms |
| gbrap        | ✅       |   2266ms |
| gbrap10be    | ✅       |   4391ms |
| gbrap10le    | ✅       |   4596ms |
| gbrap12be    | ✅       |   4322ms |
| gbrap12le    | ✅       |   4296ms |
| gbrap16be    | ✅       |   4263ms |
| gbrap16le    | ✅       |   4345ms |
| gbrapf32be   | ✅       |   8565ms |
| gbrapf32le   | ✅       |   8696ms |
| gbrp         | ✅       |   2012ms |
| gbrp10be     | ✅       |   3508ms |
| gbrp10le     | ✅       |   3579ms |
| gbrp12be     | ✅       |   3470ms |
| gbrp12le     | ✅       |   3355ms |
| gbrp14be     | ✅       |   3764ms |
| gbrp14le     | ✅       |   3414ms |
| gbrp16be     | ✅       |   3358ms |
| gbrp16le     | ✅       |   3824ms |
| gbrp9be      | ✅       |   3559ms |
| gbrp9le      | ✅       |   3703ms |
| gbrpf32be    | ✅       |   6203ms |
| gbrpf32le    | ✅       |   6664ms |
| gray         | ✅       |    856ms |
| gray10be     | ✅       |   1348ms |
| gray10le     | ✅       |   1344ms |
| gray12be     | ✅       |   1397ms |
| gray12le     | ✅       |   1528ms |
| gray14be     | ✅       |   1494ms |
| gray14le     | ✅       |   1432ms |
| gray16be     | ✅       |   1517ms |
| gray16le     | ✅       |   1581ms |
| gray9be      | ✅       |   1471ms |
| gray9le      | ✅       |   1280ms |
| grayf32be    | ✅       |   2561ms |
| grayf32le    | ✅       |   2365ms |
| monob        | ✅       |    360ms |
| monow        | ✅       |    387ms |
| nv12         | ✅       |   1088ms |
| nv21         | ✅       |   1090ms |
| nv24         | ✅       |   2278ms |
| nv42         | ✅       |   2211ms |
| p010be       | ✅       |   2048ms |
| p010le       | ✅       |   1915ms |
| p016be       | ✅       |   2119ms |
| p016le       | ✅       |   1916ms |
| p210be       | ✅       |   2531ms |
| p210le       | ✅       |   2758ms |
| p216be       | ✅       |   2503ms |
| p216le       | ✅       |   2376ms |
| p410be       | ✅       |   3245ms |
| p410le       | ✅       |   3674ms |
| p416be       | ✅       |   3392ms |
| p416le       | ✅       |   3247ms |
| rgb0         | ✅       |   2373ms |
| rgb24        | ✅       |   1881ms |
| rgb4_byte    | ✅       |   1052ms |
| rgb444be     | ✅       |   1809ms |
| rgb444le     | ✅       |   1722ms |
| rgb48be      | ✅       |   4094ms |
| rgb48le      | ✅       |   4478ms |
| rgb555be     | ✅       |   1407ms |
| rgb555le     | ✅       |   1560ms |
| rgb565be     | ✅       |   1925ms |
| rgb565le     | ✅       |   1716ms |
| rgb8         | ✅       |    855ms |
| rgba         | ✅       |   2348ms |
| rgba64be     | ✅       |   4337ms |
| rgba64le     | ✅       |   5260ms |
| uyvy422      | ✅       |   1732ms |
| x2bgr10le    | ✅       |   2713ms |
| x2rgb10le    | ✅       |   2335ms |
| xyz12be      | ✅       |   4164ms |
| xyz12le      | ✅       |   3808ms |
| ya16be       | ✅       |   2725ms |
| ya16le       | ✅       |   2749ms |
| ya8          | ✅       |   1487ms |
| yuv410p      | ✅       |    885ms |
| yuv411p      | ✅       |   1071ms |
| yuv420p      | ✅       |   1064ms |
| yuv420p10be  | ✅       |   1861ms |
| yuv420p10le  | ✅       |   2024ms |
| yuv420p12be  | ✅       |   1983ms |
| yuv420p12le  | ✅       |   1805ms |
| yuv420p14be  | ✅       |   2187ms |
| yuv420p14le  | ✅       |   2524ms |
| yuv420p16be  | ✅       |   1840ms |
| yuv420p16le  | ✅       |   1716ms |
| yuv420p9be   | ✅       |   2085ms |
| yuv420p9le   | ✅       |   1746ms |
| yuv422p      | ✅       |   1287ms |
| yuv422p10be  | ✅       |   2551ms |
| yuv422p10le  | ✅       |   2384ms |
| yuv422p12be  | ✅       |   2463ms |
| yuv422p12le  | ✅       |   2274ms |
| yuv422p14be  | ✅       |   3359ms |
| yuv422p14le  | ✅       |   2825ms |
| yuv422p16be  | ✅       |   2317ms |
| yuv422p16le  | ✅       |   2694ms |
| yuv422p9be   | ✅       |   2649ms |
| yuv422p9le   | ✅       |   2368ms |
| yuv440p      | ✅       |   1345ms |
| yuv440p10be  | ✅       |   2520ms |
| yuv440p10le  | ✅       |   2467ms |
| yuv440p12be  | ✅       |   2388ms |
| yuv440p12le  | ✅       |   2451ms |
| yuv444p      | ✅       |   1915ms |
| yuv444p10be  | ✅       |   3571ms |
| yuv444p10le  | ✅       |   3460ms |
| yuv444p12be  | ✅       |   3506ms |
| yuv444p12le  | ✅       |   3924ms |
| yuv444p14be  | ✅       |   3835ms |
| yuv444p14le  | ✅       |   3426ms |
| yuv444p16be  | ✅       |   3502ms |
| yuv444p16le  | ✅       |   3311ms |
| yuv444p9be   | ✅       |   3507ms |
| yuv444p9le   | ✅       |   3798ms |
| yuva420p     | ✅       |   1845ms |
| yuva420p10be | ✅       |   3250ms |
| yuva420p10le | ✅       |   2824ms |
| yuva420p16be | ✅       |   3003ms |
| yuva420p16le | ✅       |   2669ms |
| yuva420p9be  | ✅       |   2702ms |
| yuva420p9le  | ✅       |   3128ms |
| yuva422p     | ✅       |   1843ms |
| yuva422p10be | ✅       |   3287ms |
| yuva422p10le | ✅       |   3813ms |
| yuva422p12be | ✅       |   3972ms |
| yuva422p12le | ✅       |   3912ms |
| yuva422p16be | ✅       |   3960ms |
| yuva422p16le | ✅       |   3238ms |
| yuva422p9be  | ✅       |   3202ms |
| yuva422p9le  | ✅       |   3183ms |
| yuva444p     | ✅       |   2202ms |
| yuva444p10be | ✅       |   4905ms |
| yuva444p10le | ✅       |   4462ms |
| yuva444p12be | ✅       |   4511ms |
| yuva444p12le | ✅       |   4549ms |
| yuva444p16be | ✅       |   4424ms |
| yuva444p16le | ✅       |   4255ms |
| yuva444p9be  | ✅       |   4767ms |
| yuva444p9le  | ✅       |   4186ms |
| yuvj411p     | ✅       |   1255ms |
| yuvj420p     | ✅       |   1348ms |
| yuvj422p     | ✅       |   1389ms |
| yuvj440p     | ✅       |   1294ms |
| yuvj444p     | ✅       |   1754ms |
| yuyv422      | ✅       |   1813ms |
| yvyu422      | ✅       |   1367ms |

---

| Audio Format | Succeded | Duration |
| ------------ | -------- | -------: |
| alaw         | ✅       |    806ms |
| f32be        | ✅       |    567ms |
| f32le        | ✅       |    564ms |
| f64be        | ✅       |    559ms |
| f64le        | ✅       |    530ms |
| mulaw        | ✅       |    753ms |
| s16be        | ✅       |    643ms |
| s16le        | ✅       |    636ms |
| s24be        | ✅       |    592ms |
| s24le        | ✅       |    609ms |
| s32be        | ✅       |    578ms |
| s32le        | ✅       |    576ms |
| s8           | ✅       |    693ms |
| u16be        | ✅       |    687ms |
| u16le        | ✅       |    650ms |
| u24be        | ✅       |    637ms |
| u24le        | ✅       |    656ms |
| u32be        | ✅       |    679ms |
| u32le        | ✅       |    662ms |
| u8           | ✅       |    689ms |
| vidc         | ✅       |    835ms |

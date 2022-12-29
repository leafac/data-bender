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

---

- Consider allowing the user to provide presets of filters they like, for example…
- Use https://www.npmjs.com/package/@ffmpeg/ffmpeg and allow you to data bend in the browser without having to upload!
- We could provide just the conversion to raw and then back, to allow for people to bend outside our application, for example, using REAPER.

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

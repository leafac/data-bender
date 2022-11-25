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
const audioFilters = [
  "abench",
  "acompressor",
  "acontrast",
  "acopy",
  "acrusher",
  "acue",
  "adeclick",
  "adeclip",
  "adecorrelate",
  "adelay",
  "adenorm",
  "aderivative",
  "adynamicequalizer",
  "adynamicsmooth",
  "aecho",
  "aemphasis",
  "aeval",
  "aexciter",
  "afade",
  "afftdn",
  "afftfilt",
  "afifo",
  "aformat",
  "afreqshift",
  "afwtdn",
  "agate",
  "aintegral",
  "alatency",
  "alimiter",
  "allpass",
  "aloop",
  "ametadata",
  "anlmdn",
  "anull",
  "apad",
  "aperms",
  "aphaser",
  "aphaseshift",
  "apsyclip",
  "apulsator",
  "arealtime",
  "aresample",
  "areverse",
  "arnndn",
  "asendcmd",
  "asetnsamples",
  "asetpts",
  "asetrate",
  "asettb",
  "ashowinfo",
  "asidedata",
  "asoftclip",
  "aspectralstats",
  "astats",
  "asubboost",
  "asubcut",
  "asupercut",
  "asuperpass",
  "asuperstop",
  "atempo",
  "atilt",
  "atrim",
  "bandpass",
  "bandreject",
  "bass",
  "biquad",
  "channelmap",
  "chorus",
  "compand",
  "compensationdelay",
  "crossfeed",
  "crystalizer",
  "dcshift",
  "deesser",
  "drmeter",
  "dynaudnorm",
  "earwax",
  "equalizer",
  "extrastereo",
  "firequalizer",
  "flanger",
  "haas",
  "hdcd",
  "highpass",
  "highshelf",
  "loudnorm",
  "lowpass",
  "lowshelf",
  "mcompand",
  "pan",
  "replaygain",
  "silencedetect",
  "silenceremove",
  "speechnorm",
  "stereotools",
  "stereowiden",
  "superequalizer",
  "surround",
  "treble",
  "tremolo",
  "vibrato",
  "volume",
  "volumedetect",
];

const multiAudioFilters = [
  "acrossfade",
  "amultiply",
  "anlmf",
  "anlms",
  "asdr",
  "axcorrelate",
  "sidechaincompress",
  "sidechaingate",
];

const videoFilters = [
  "addroi",
  "alphaextract",
  "amplify",
  "ass",
  "atadenoise",
  "avgblur",
  "bbox",
  "bench",
  "bilateral",
  "bitplanenoise",
  "blackdetect",
  "blackframe",
  "boxblur",
  "bwdif",
  "cas",
  "chromahold",
  "chromakey",
  "chromanr",
  "chromashift",
  "ciescope",
  "codecview",
  "colorbalance",
  "colorchannelmixer",
  "colorcontrast",
  "colorcorrect",
  "colorhold",
  "colorize",
  "colorkey",
  "colorlevels",
  "colormatrix",
  "colorspace",
  "colortemperature",
  "convolution",
  "copy",
  "coreimage",
  "cover_rect",
  "crop",
  "cropdetect",
  "cue",
  "curves",
  "datascope",
  "dblur",
  "dctdnoiz",
  "deband",
  "deblock",
  "dedot",
  "deflate",
  "deflicker",
  "dejudder",
  "delogo",
  "derain",
  "deshake",
  "despill",
  "detelecine",
  "dilation",
  "dnn_classify",
  "dnn_detect",
  "dnn_processing",
  "doubleweave",
  "drawbox",
  "drawgraph",
  "drawgrid",
  "drawtext",
  "edgedetect",
  "elbg",
  "entropy",
  "epx",
  "eq",
  "erosion",
  "estdif",
  "exposure",
  "fade",
  "fftdnoiz",
  "fftfilt",
  "field",
  "fieldhint",
  "fieldorder",
  "fifo",
  "fillborders",
  "find_rect",
  "floodfill",
  "format",
  "fps",
  "framerate",
  "framestep",
  "freezedetect",
  "fspp",
  "gblur",
  "geq",
  "gradfun",
  "graphmonitor",
  "grayworld",
  "greyedge",
  "hflip",
  "histeq",
  "histogram",
  "hqdn3d",
  "hqx",
  "hsvhold",
  "hsvkey",
  "hue",
  "huesaturation",
  "hwdownload",
  "hwmap",
  "hwupload",
  "idet",
  "il",
  "inflate",
  "interlace",
  "kerndeint",
  "kirsch",
  "lagfun",
  "latency",
  "lenscorrection",
  "limiter",
  "loop",
  "lumakey",
  "lut",
  "lut1d",
  "lut3d",
  "lutrgb",
  "lutyuv",
  "maskfun",
  "median",
  "mestimate",
  "metadata",
  "minterpolate",
  "monochrome",
  "mpdecimate",
  "negate",
  "nlmeans",
  "nnedi",
  "noformat",
  "noise",
  "normalize",
  "null",
  "oscilloscope",
  "owdenoise",
  "pad",
  "palettegen",
  "perms",
  "perspective",
  "phase",
  "photosensitivity",
  "pixdesctest",
  "pixscope",
  "pp",
  "pp7",
  "prewitt",
  "pseudocolor",
  "pullup",
  "qp",
  "random",
  "readeia608",
  "readvitc",
  "realtime",
  "removegrain",
  "removelogo",
  "repeatfields",
  "reverse",
  "rgbashift",
  "roberts",
  "rotate",
  "sab",
  "scale",
  "scdet",
  "scharr",
  "scroll",
  "selectivecolor",
  "sendcmd",
  "separatefields",
  "setdar",
  "setfield",
  "setparams",
  "setpts",
  "setrange",
  "setsar",
  "settb",
  "shear",
  "showinfo",
  "showpalette",
  "shuffleframes",
  "shufflepixels",
  "shuffleplanes",
  "sidedata",
  "signalstats",
  "smartblur",
  "sobel",
  "spp",
  "sr",
  "stereo3d",
  "subtitles",
  "super2xsai",
  "swaprect",
  "swapuv",
  "tblend",
  "telecine",
  "thistogram",
  "thumbnail",
  "tile",
  "tinterlace",
  "tlut2",
  "tmedian",
  "tmidequalizer",
  "tmix",
  "tonemap",
  "tpad",
  "transpose",
  "trim",
  "unsharp",
  "untile",
  "v360",
  "vaguedenoiser",
  "vectorscope",
  "vflip",
  "vfrdet",
  "vibrance",
  "vidstabdetect",
  "vidstabtransform",
  "vignette",
  "vmafmotion",
  "w3fdif",
  "waveform",
  "weave",
  "xbr",
  "yadif_videotoolbox",
  "yadif",
  "yaepblur",
  "zoompan",
  "zscale",
];

const multiVideoFilters = [
  "alphamerge",
  "blend",
  "convolve",
  "deconvolve",
  "framepack",
  "freezeframes",
  "haldclut",
  "hysteresis",
  "identity",
  "lut2",
  "maskedthreshold",
  "midequalizer",
  "morpho",
  "msad",
  "overlay",
  "paletteuse",
  "psnr",
  "ssim",
  "varblur",
  "vif",
  "xcorrelate",
  "xfade",
];

/*
.S. acrossover        A->N       Split audio into per-bands streams.
.SC afir              N->N       Apply Finite Impulse Response filter with supplied coefficients in additional stream(s).
.S. aiir              A->N       Apply Infinite Impulse Response filter with supplied coefficients.
... ainterleave       N->A       Temporally interleave audio inputs.
... amerge            N->A       Merge two or more audio streams into a single multi-channel stream.
..C amix              N->A       Audio mixing.
TSC anequalizer       A->N       Apply high-order audio parametric multi band equalizer.
... asegment          A->N       Segment audio stream.
... aselect           A->N       Select audio frames to pass in output.
... asplit            A->N       Pass on the audio input to N audio outputs.
..C astreamselect     N->N       Select audio streams
... channelsplit      A->N       Split audio into per-channel streams.
... ebur128           A->N       EBU R128 scanner.
.S. headphone         N->A       Apply headphone binaural spatialization with HRTFs in additional streams.
... join              N->A       Join multiple audio streams into multi-channel output.
... aevalsrc          |->A       Generate an audio signal generated by an expression.
... afirsrc           |->A       Generate a FIR coefficients audio stream.
... anoisesrc         |->A       Generate a noise audio signal.
... anullsrc          |->A       Null audio source, return empty audio frames.
... hilbert           |->A       Generate a Hilbert transform FIR coefficients.
... sinc              |->A       Generate a sinc kaiser-windowed low-pass, high-pass, band-pass, or band-reject FIR coefficients.
... sine              |->A       Generate sine wave audio signal.
... anullsink         A->|       Do absolutely nothing with the input audio.
TS. bm3d              N->V       Block-Matching 3D denoiser.
... decimate          N->V       Decimate frames (post field matching filter).T.. displace          VVV->V     Displace pixels.
... extractplanes     V->N       Extract planes as grayscale frames.... fieldmatch        N->V       Field matching for inverse telecine.
TSC guided            N->V       Apply Guided filter.
.S. hstack            N->V       Stack video inputs horizontally.... interleave        N->V       Temporally interleave video inputs.TSC limitdiff         N->V       Apply filtering with limiting difference.TSC maskedclamp       VVV->V     Clamp first stream with second stream and third stream.
TSC maskedmax         VVV->V     Apply filtering with maximum difference of two streams.
TSC maskedmerge       VVV->V     Merge first stream with second stream using third stream as mask.
TSC maskedmin         VVV->V     Apply filtering with minimum difference of two streams.... mergeplanes       N->V       Merge planes.
TSC mix               N->V       Mix video inputs.TS. premultiply       N->V       PreMultiply first stream with first plane of second stream..S. remap             VVV->V     Remap pixels...C scale2ref         VV->VV     Scale the input video size and/or convert the image format to the given reference.... segment           V->N       Segment video stream.
... select            V->N       Select video frames to pass in output.
... signature         N->V       Calculate the MPEG-7 video signature
... split             V->N       Pass on the input to N video outputs.
..C streamselect      N->N       Select video streamsTSC threshold         VVVV->V    Threshold first video stream using other video streams.TS. unpremultiply     N->V       UnPreMultiply first stream with first plane of second stream.
.S. vstack            N->V       Stack video inputs vertically.
TSC xmedian           N->V       Pick median pixels from several video inputs.
.S. xstack            N->V       Stack video inputs into custom layout.... allrgb            |->V       Generate all RGB colors.
... allyuv            |->V       Generate all yuv colors.
... cellauto          |->V       Create pattern generated by an elementary cellular automaton.
..C color             |->V       Provide an uniformly colored input.
... colorspectrum     |->V       Generate colors spectrum.
... coreimagesrc      |->V       Video source using image generators of CoreImage API.
.S. gradients         |->V       Draw a gradients.
... haldclutsrc       |->V       Provide an identity Hald CLUT.
... life              |->V       Create life.
... mandelbrot        |->V       Render a Mandelbrot fractal.
... mptestsrc         |->V       Generate various test pattern.
... nullsrc           |->V       Null video source, return unprocessed video frames.
... pal75bars         |->V       Generate PAL 75% color bars.
... pal100bars        |->V       Generate PAL 100% color bars.
... rgbtestsrc        |->V       Generate RGB test pattern.
.S. sierpinski        |->V       Render a Sierpinski fractal.
... smptebars         |->V       Generate SMPTE color bars.
... smptehdbars       |->V       Generate SMPTE HD color bars.
... testsrc           |->V       Generate test pattern.
... testsrc2          |->V       Generate another test pattern.
... yuvtestsrc        |->V       Generate YUV test pattern.
... nullsink          V->|       Do absolutely nothing with the input video.
... abitscope         A->V       Convert input audio to audio bit scope video output.
... adrawgraph        A->V       Draw a graph using input audio metadata.
... agraphmonitor     A->V       Show various filtergraph stats.
... ahistogram        A->V       Convert input audio to histogram video output.
... aphasemeter       A->N       Convert input audio to phase meter video output.
.SC avectorscope      A->V       Convert input audio to vectorscope video output.
..C concat            N->N       Concatenate audio and video streams.
... showcqt           A->V       Convert input audio to a CQT (Constant/Clamped Q Transform) spectrum video output.
... showfreqs         A->V       Convert input audio to a frequencies video output.
.S. showspatial       A->V       Convert input audio to a spatial video output.
.S. showspectrum      A->V       Convert input audio to a spectrum video output.
.S. showspectrumpic   A->V       Convert input audio to a spectrum video output single picture.
... showvolume        A->V       Convert input audio volume to video output.
... showwaves         A->V       Convert input audio to a video output.
... showwavespic      A->V       Convert input audio to a video output single picture.
... spectrumsynth     VV->A      Convert input spectrum videos to audio output.
..C amovie            |->N       Read audio from a movie source.
..C movie             |->N       Read from a movie source.... abuffer           |->A       Buffer audio frames, and make them accessible to the filterchain.
... buffer            |->V       Buffer video frames, and make them accessible to the filterchain.
... abuffersink       A->|       Buffer audio frames, and make them available to the end of the filter graph.
... buffersink        V->|       Buffer video frames, and make them available to the end of the filter graph.
*/
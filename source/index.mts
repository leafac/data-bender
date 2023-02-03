#!/usr/bin/env node

import fs from "node:fs/promises";
import assert from "node:assert/strict";
import path from "node:path";
import url from "node:url";
import * as commander from "commander";
import { execa } from "execa";
import lodash from "lodash";
import * as unusedFilename from "unused-filename";
import * as node from "@leafac/node";
import maybeFFmpegPath from "ffmpeg-static";
assert.equal(typeof maybeFFmpegPath, "string");
const ffmpegPath = maybeFFmpegPath as unknown as string;

export default async function dataBender({
  input,
  outputDirectory = (() => {
    const extension = path.extname(input);
    if (extension.trim() === "") throw new Error("‘input’ missing extension");
    return input.slice(0, -extension.length);
  })(),
  bends = 10,
}: {
  input: string;
  outputDirectory?: string;
  bends?: "pixel-formats" | "audio-formats" | "filters" | number;
}): Promise<void> {
  await fs.access(input);

  const inputExtension = path.extname(input);
  if (inputExtension.trim() === "")
    throw new Error("‘input’ missing extension");

  const inputMetadataText = (
    await execa(ffmpegPath, ["-i", input], {
      all: true,
      reject: false,
      preferLocal: true,
    })
  ).all;

  if (typeof inputMetadataText !== "string")
    throw new Error("Failed to acquire ‘input’ metadata");

  outputDirectory = await unusedFilename.unusedFilename(outputDirectory, {
    incrementer: unusedFilename.separatorIncrementer("--"),
  });
  await fs.mkdir(outputDirectory, { recursive: true });

  // TODO: Detect audio files

  const durationMatch = inputMetadataText.match(
    /$\s*Duration: (?<hours>\d\d):(?<minutes>\d\d):(?<seconds>\d\d)/m
  );
  if (durationMatch === null || durationMatch.groups === undefined)
    throw new Error(`Failed to find duration:\n${inputMetadataText}`);
  const duration =
    Number(durationMatch.groups.hours) * 60 * 60 +
    Number(durationMatch.groups.minutes) * 60 +
    Number(durationMatch.groups.seconds);
  const long = duration > 10;

  // TODO: Time base stuff.
  const inputMetadataMatch = inputMetadataText.match(
    /$\s*Stream .*? Video: (?<codec>\w+).*?, (?<pixelFormat>\w+).*?, (?<width>\d+)x(?<height>\d+).*?, (?<bitRate>[\d.]+) kb\/s, (?<frameRate>[\d.]+) fps/m
  );
  if (inputMetadataMatch === null || inputMetadataMatch.groups === undefined)
    throw new Error(`Failed to find video stream:\n${inputMetadataText}`);
  const inputMetadata = {
    ...inputMetadataMatch.groups,
    size: `${inputMetadataMatch.groups.width}x${inputMetadataMatch.groups.height}`,
  } as {
    codec: string;
    pixelFormat: string;
    width: string;
    height: string;
    bitRate: string;
    frameRate: string;
    size: string;
  };

  const pixelFormat = "rgb24";
  const audioFormat = "alaw";
  const audioSampleRate = "48000";
  const audioChannelCount = "1";
  const audioFilter = "tremolo";

  const inputRaw = path.join(outputDirectory, "input--1.raw");
  const inputLongRaw = path.join(outputDirectory, "input--2.raw");
  const outputRaw = path.join(outputDirectory, "output.raw");

  switch (bends) {
    case "pixel-formats":
      for (const pixelFormat of [
        "0bgr",
        "0rgb",
        "abgr",
        "argb",
        "ayuv64le",
        "bgr0",
        "bgr24",
        "bgr4_byte",
        "bgr444be",
        "bgr444le",
        "bgr48be",
        "bgr48le",
        "bgr555be",
        "bgr555le",
        "bgr565be",
        "bgr565le",
        "bgr8",
        "bgra",
        "bgra64be",
        "bgra64le",
        "gbrap",
        "gbrap10be",
        "gbrap10le",
        "gbrap12be",
        "gbrap12le",
        "gbrap16be",
        "gbrap16le",
        "gbrapf32be",
        "gbrapf32le",
        "gbrp",
        "gbrp10be",
        "gbrp10le",
        "gbrp12be",
        "gbrp12le",
        "gbrp14be",
        "gbrp14le",
        "gbrp16be",
        "gbrp16le",
        "gbrp9be",
        "gbrp9le",
        "gbrpf32be",
        "gbrpf32le",
        "gray",
        "gray10be",
        "gray10le",
        "gray12be",
        "gray12le",
        "gray14be",
        "gray14le",
        "gray16be",
        "gray16le",
        "gray9be",
        "gray9le",
        "grayf32be",
        "grayf32le",
        "monob",
        "monow",
        "nv12",
        "nv21",
        "nv24",
        "nv42",
        "p010be",
        "p010le",
        "p016be",
        "p016le",
        "p210be",
        "p210le",
        "p216be",
        "p216le",
        "p410be",
        "p410le",
        "p416be",
        "p416le",
        "rgb0",
        "rgb24",
        "rgb4_byte",
        "rgb444be",
        "rgb444le",
        "rgb48be",
        "rgb48le",
        "rgb555be",
        "rgb555le",
        "rgb565be",
        "rgb565le",
        "rgb8",
        "rgba",
        "rgba64be",
        "rgba64le",
        "uyvy422",
        "x2bgr10le",
        "x2rgb10le",
        "xyz12be",
        "xyz12le",
        "ya16be",
        "ya16le",
        "ya8",
        "yuv410p",
        "yuv411p",
        "yuv420p",
        "yuv420p10be",
        "yuv420p10le",
        "yuv420p12be",
        "yuv420p12le",
        "yuv420p14be",
        "yuv420p14le",
        "yuv420p16be",
        "yuv420p16le",
        "yuv420p9be",
        "yuv420p9le",
        "yuv422p",
        "yuv422p10be",
        "yuv422p10le",
        "yuv422p12be",
        "yuv422p12le",
        "yuv422p14be",
        "yuv422p14le",
        "yuv422p16be",
        "yuv422p16le",
        "yuv422p9be",
        "yuv422p9le",
        "yuv440p",
        "yuv440p10be",
        "yuv440p10le",
        "yuv440p12be",
        "yuv440p12le",
        "yuv444p",
        "yuv444p10be",
        "yuv444p10le",
        "yuv444p12be",
        "yuv444p12le",
        "yuv444p14be",
        "yuv444p14le",
        "yuv444p16be",
        "yuv444p16le",
        "yuv444p9be",
        "yuv444p9le",
        "yuva420p",
        "yuva420p10be",
        "yuva420p10le",
        "yuva420p16be",
        "yuva420p16le",
        "yuva420p9be",
        "yuva420p9le",
        "yuva422p",
        "yuva422p10be",
        "yuva422p10le",
        "yuva422p12be",
        "yuva422p12le",
        "yuva422p16be",
        "yuva422p16le",
        "yuva422p9be",
        "yuva422p9le",
        "yuva444p",
        "yuva444p10be",
        "yuva444p10le",
        "yuva444p12be",
        "yuva444p12le",
        "yuva444p16be",
        "yuva444p16le",
        "yuva444p9be",
        "yuva444p9le",
        "yuvj411p",
        "yuvj420p",
        "yuvj422p",
        "yuvj440p",
        "yuvj444p",
        "yuyv422",
        "yvyu422",
      ]) {
        const result = await dataBend({
          output: `${pixelFormat}${inputExtension}`,
          pixelFormat,
          audioFormat,
          audioSampleRate,
          audioChannelCount,
          audioFilter,
        });
        console.log(
          `| ${pixelFormat} | ${result.success ? "✅" : "❌"} | ${
            result.time
          }ms |`
        );
      }
      break;

    case "audio-formats":
      for (const audioFormat of [
        "alaw",
        "f32be",
        "f32le",
        "f64be",
        "f64le",
        "mulaw",
        "s16be",
        "s16le",
        "s24be",
        "s24le",
        "s32be",
        "s32le",
        "s8",
        "u16be",
        "u16le",
        "u24be",
        "u24le",
        "u32be",
        "u32le",
        "u8",
        "vidc",
      ]) {
        const result = await dataBend({
          output: `${audioFormat}${inputExtension}`,
          pixelFormat,
          audioFormat,
          audioSampleRate,
          audioChannelCount,
          audioFilter,
        });
        console.log(
          `| ${audioFormat} | ${result.success ? "✅" : "❌"} | ${
            result.time
          }ms |`
        );
      }
      break;

    case "filters":
      for (const audioFilter of [
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
      ]) {
        const result = await dataBend({
          output: `${audioFilter}${inputExtension}`,
          pixelFormat,
          audioFormat,
          audioSampleRate,
          audioChannelCount,
          audioFilter,
        });
        console.log(
          `| ${audioFilter} | ${result.success ? "✅" : "❌"} | ${
            result.time
          }ms |`
        );
      }
      break;

    default:
      for (let bend = 1; bend <= bends; bend++) {
        // TODO: More sample rates and channel counts?
        // TODO: Include filter parameters
        // TODO: Use different input & output settings, including bitrate
        const pixelFormat = () =>
          lodash.sample([
            "0bgr",
            "0rgb",
            "abgr",
            "argb",
            "ayuv64le",
            "bgr0",
            "bgr24",
            "bgr4_byte",
            "bgr444be",
            "bgr444le",
            "bgr48be",
            "bgr48le",
            "bgr555be",
            "bgr555le",
            "bgr565be",
            "bgr565le",
            "bgr8",
            "bgra",
            "bgra64be",
            "bgra64le",
            "gbrap",
            "gbrap10be",
            "gbrap10le",
            "gbrap12be",
            "gbrap12le",
            "gbrap16be",
            "gbrap16le",
            "gbrapf32be",
            "gbrapf32le",
            "gbrp",
            "gbrp10be",
            "gbrp10le",
            "gbrp12be",
            "gbrp12le",
            "gbrp14be",
            "gbrp14le",
            "gbrp16be",
            "gbrp16le",
            "gbrp9be",
            "gbrp9le",
            "gbrpf32be",
            "gbrpf32le",
            "gray",
            "gray10be",
            "gray10le",
            "gray12be",
            "gray12le",
            "gray14be",
            "gray14le",
            "gray16be",
            "gray16le",
            "gray9be",
            "gray9le",
            "grayf32be",
            "grayf32le",
            "monob",
            "monow",
            "nv12",
            "nv21",
            "nv24",
            "nv42",
            "p010be",
            "p010le",
            "p016be",
            "p016le",
            "p210be",
            "p210le",
            "p216be",
            "p216le",
            "p410be",
            "p410le",
            "p416be",
            "p416le",
            "rgb0",
            "rgb24",
            "rgb4_byte",
            "rgb444be",
            "rgb444le",
            "rgb48be",
            "rgb48le",
            "rgb555be",
            "rgb555le",
            "rgb565be",
            "rgb565le",
            "rgb8",
            "rgba",
            "rgba64be",
            "rgba64le",
            "uyvy422",
            "x2bgr10le",
            "x2rgb10le",
            "xyz12be",
            "xyz12le",
            "ya16be",
            "ya16le",
            "ya8",
            "yuv410p",
            "yuv411p",
            "yuv420p",
            "yuv420p10be",
            "yuv420p10le",
            "yuv420p12be",
            "yuv420p12le",
            "yuv420p14be",
            "yuv420p14le",
            "yuv420p16be",
            "yuv420p16le",
            "yuv420p9be",
            "yuv420p9le",
            "yuv422p",
            "yuv422p10be",
            "yuv422p10le",
            "yuv422p12be",
            "yuv422p12le",
            "yuv422p14be",
            "yuv422p14le",
            "yuv422p16be",
            "yuv422p16le",
            "yuv422p9be",
            "yuv422p9le",
            "yuv440p",
            "yuv440p10be",
            "yuv440p10le",
            "yuv440p12be",
            "yuv440p12le",
            "yuv444p",
            "yuv444p10be",
            "yuv444p10le",
            "yuv444p12be",
            "yuv444p12le",
            "yuv444p14be",
            "yuv444p14le",
            "yuv444p16be",
            "yuv444p16le",
            "yuv444p9be",
            "yuv444p9le",
            "yuva420p",
            "yuva420p10be",
            "yuva420p10le",
            "yuva420p16be",
            "yuva420p16le",
            "yuva420p9be",
            "yuva420p9le",
            "yuva422p",
            "yuva422p10be",
            "yuva422p10le",
            "yuva422p12be",
            "yuva422p12le",
            "yuva422p16be",
            "yuva422p16le",
            "yuva422p9be",
            "yuva422p9le",
            "yuva444p",
            "yuva444p10be",
            "yuva444p10le",
            "yuva444p12be",
            "yuva444p12le",
            "yuva444p16be",
            "yuva444p16le",
            "yuva444p9be",
            "yuva444p9le",
            "yuvj411p",
            "yuvj420p",
            "yuvj422p",
            "yuvj440p",
            "yuvj444p",
            "yuyv422",
            "yvyu422",
          ])!;
        const audioFormat = () =>
          lodash.sample([
            "alaw",
            "f32be",
            "f32le",
            "f64be",
            "f64le",
            "mulaw",
            "s16be",
            "s16le",
            "s24be",
            "s24le",
            "s32be",
            "s32le",
            "s8",
            "u16be",
            "u16le",
            "u24be",
            "u24le",
            "u32be",
            "u32le",
            "u8",
            "vidc",
          ])!;
        const audioSampleRate = () =>
          lodash.sample(["44100", "48000", "96000"])!;
        const audioChannelCount = () => lodash.sample(["1", "2"])!;
        const result = await dataBend({
          output: `${path
            .basename(input)
            .slice(0, -inputExtension.length)}--${Math.random()
            .toString(36)
            .slice(2)}${inputExtension}`,
          pixelFormat: pixelFormat(),
          outputPixelFormat: Math.random() < 0.97 ? undefined : pixelFormat(),
          audioFormat: audioFormat(),
          outputAudioFormat: Math.random() < 0.97 ? undefined : audioFormat(),
          audioSampleRate: audioSampleRate(),
          outputAudioSampleRate:
            Math.random() < 0.97 ? undefined : audioSampleRate(),
          audioChannelCount: audioChannelCount(),
          outputAudioChannelCount:
            Math.random() < 0.97 ? undefined : audioChannelCount(),
          audioFilter: lodash.sample([
            "acompressor",
            "acontrast",
            "adecorrelate",
            "aderivative",
            "adynamicsmooth",
            "aecho",
            "aemphasis",
            "aexciter",
            "afreqshift",
            "alimiter",
            "allpass",
            "aphaser",
            "aphaseshift",
            "apulsator",
            "areverse",
            "asetrate",
            "asoftclip",
            "asubboost",
            "asubcut",
            "asuperpass",
            "asuperstop",
            "atempo",
            "bandpass",
            "bandreject",
            "crossfeed",
            "crystalizer",
            "earwax",
            "extrastereo",
            "flanger",
            "haas",
            "highpass",
            "loudnorm",
            "lowpass",
            "mcompand",
            "replaygain",
            "stereotools",
            "stereowiden",
            "surround",
            "tremolo",
            "vibrato",
          ])!,
        });
        if (!result.success)
          throw Error(
            "Failed to data bend. Check the logs for more information."
          );
      }
      break;
  }

  await fs.rm(inputRaw, { force: true });
  await fs.rm(inputLongRaw, { force: true });
  await fs.rm(outputRaw, { force: true });

  async function dataBend({
    output,
    pixelFormat,
    outputPixelFormat = pixelFormat,
    audioFormat,
    outputAudioFormat = audioFormat,
    audioSampleRate,
    outputAudioSampleRate = audioSampleRate,
    audioChannelCount,
    outputAudioChannelCount = audioChannelCount,
    audioFilter,
    size = inputMetadata.size,
    outputSize = size,
  }: {
    output: string;
    pixelFormat: string;
    outputPixelFormat?: string;
    audioFormat: string;
    outputAudioFormat?: string;
    audioSampleRate: string;
    outputAudioSampleRate?: string;
    audioChannelCount: string;
    outputAudioChannelCount?: string;
    audioFilter: string;
    size?: string;
    outputSize?: string;
  }): Promise<{ success: boolean; time: bigint }> {
    let success = false;
    const start = process.hrtime.bigint();

    try {
      await log(output);

      if (long) {
        // TODO: Use differnet pixel formats and so forth.
        await ffmpeg(
          "-ss",
          String(Math.random() * (duration - 10)),
          "-t",
          "10",
          "-i",
          input,
          "-f",
          "rawvideo",
          "-s",
          size,
          "-r",
          inputMetadata.frameRate,
          "-pix_fmt",
          pixelFormat,
          "-an",
          inputRaw
        );
        await ffmpeg(
          "-ss",
          String(Math.random() * (duration - 10)),
          "-t",
          "10",
          "-i",
          input,
          "-f",
          "rawvideo",
          "-s",
          size,
          "-r",
          inputMetadata.frameRate,
          "-pix_fmt",
          pixelFormat,
          "-an",
          inputLongRaw
        );

        // TODO: Bend the raw inputs
        // TODO: More filters
        await ffmpeg(
          "-f",
          audioFormat,
          "-ar",
          audioSampleRate,
          "-ac",
          audioChannelCount,
          "-i",
          inputRaw,
          "-f",
          audioFormat,
          "-ar",
          audioSampleRate,
          "-ac",
          audioChannelCount,
          "-i",
          inputLongRaw,
          "-filter_complex",
          "amix=duration=shortest",
          "-f",
          outputAudioFormat,
          "-ar",
          outputAudioSampleRate,
          "-ac",
          outputAudioChannelCount,
          outputRaw
        );
      } else {
        await ffmpeg(
          "-i",
          input,
          "-f",
          "rawvideo",
          "-s",
          size,
          "-r",
          inputMetadata.frameRate,
          "-pix_fmt",
          pixelFormat,
          "-an",
          inputRaw
        );

        await ffmpeg(
          "-f",
          audioFormat,
          "-ar",
          audioSampleRate,
          "-ac",
          audioChannelCount,
          "-i",
          inputRaw,
          "-af",
          audioFilter,
          "-f",
          outputAudioFormat,
          "-ar",
          outputAudioSampleRate,
          "-ac",
          outputAudioChannelCount,
          outputRaw
        );
      }

      await ffmpeg(
        "-f",
        "rawvideo",
        "-s",
        outputSize,
        "-r",
        inputMetadata.frameRate,
        "-pix_fmt",
        outputPixelFormat,
        "-i",
        outputRaw,
        "-s",
        inputMetadata.size,
        "-r",
        inputMetadata.frameRate,
        "-pix_fmt",
        inputMetadata.pixelFormat,
        "-vcodec",
        inputMetadata.codec,
        "-b:v",
        `${inputMetadata.bitRate}k`,
        path.join(outputDirectory, output)
      );

      success = true;
    } catch {}

    return {
      success,
      time: node.elapsedTime(start),
    };
  }

  async function ffmpeg(...commandLineArguments: string[]): Promise<void> {
    const result = await execa(ffmpegPath, ["-y", ...commandLineArguments], {
      all: true,
      reject: false,
      preferLocal: true,
      timeout: 60 * 1000,
    });
    await log(result.escapedCommand);
    if (result.failed) {
      if (typeof result.all === "string") await log(result.all);
      throw new Error(result.all);
    }
  }

  async function log(message?: string): Promise<void> {
    await fs.appendFile(
      path.join(
        outputDirectory,
        `data-bender--log--${new Date().toISOString().replaceAll(":", "-")}.txt`
      ),
      (message ?? "") + "\n"
    );
  }
}

if (await node.isExecuted(import.meta.url))
  await commander.program
    .name("data-bender")
    .description("Data Bending Made Easy")
    .option("-o, --output-directory <output-directory>")
    .option("-b, --bends <bends>", undefined, "10")
    .argument("<input>")
    .version(
      JSON.parse(
        await fs.readFile(new URL("../package.json", import.meta.url), "utf8")
      ).version
    )
    .allowExcessArguments(false)
    .showHelpAfterError()
    .action(
      async (
        input: string,
        { outputDirectory, bends }: { outputDirectory?: string; bends?: string }
      ) => {
        try {
          await dataBender({
            input,
            outputDirectory,
            bends:
              bends === "pixel-formats" ||
              bends === "audio-formats" ||
              bends === "filters"
                ? bends
                : typeof bends === "string" && isNaN(Number(bends))
                ? (() => {
                    throw new Error("Invalid ‘--bends’");
                  })()
                : typeof bends === "string"
                ? Number(bends)
                : undefined,
          });
        } catch (error: any) {
          console.error(error.message);
          process.exit(1);
        }
      }
    )
    .parseAsync();

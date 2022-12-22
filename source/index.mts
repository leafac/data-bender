#!/usr/bin/env node

import fs from "node:fs/promises";
import assert from "node:assert/strict";
import path from "node:path";
import url from "node:url";
import * as commander from "commander";
import { execa } from "execa";
import lodash from "lodash";
import * as unusedFilename from "unused-filename";
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
  bends?: number;
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

  // TODO: Time base stuff.
  const inputMetadataMatch = inputMetadataText.match(
    /$\s*Stream .*? Video: (?<codec>\w+).*?, (?<pixelFormat>\w+).*?, (?<width>\d+)x(?<height>\d+).*?, (?<bitRate>[\d.]+) kb\/s, (?<frameRate>[\d.]+) fps/m
  );
  if (inputMetadataMatch === null || inputMetadataMatch.groups === undefined)
    throw new Error(`Failed to find video stream:\n${inputMetadataText}`);
  const inputMetadata = inputMetadataMatch.groups;
  const size = `${inputMetadata.width}x${inputMetadata.height}`;

  for (let bend = 1; bend <= bends; bend++) {
    const output = `${bend}${inputExtension}`;
    await log(output);

    // TODO: MORE FORMATS 👏
    const pixelFormat = lodash.sample(["rgb24", "yuv420p"])!;
    const audioFormat = lodash.sample(["alaw", "mulaw"])!;
    const audioSampleRate = lodash.sample(["8000", "44100", "48000", "96000"])!;
    const audioChannelCount = lodash.sample(["1", "2"])!;
    const audioFilter = lodash.sample([
      "abench",
      "acompressor",
      "acontrast",
      "acopy",
      "acue",
      "acrusher",
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
      "aformat",
      "afreqshift",
      "afwtdn",
      "agate",
      "aintegral",
      "alatency",
      "alimiter",
      "allpass",
      "aloop",
      // "ametadata",
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
      // "asidedata",
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
      "azmq",
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
      "dialoguenhance",
      "drmeter",
      "dynaudnorm",
      "earwax",
      "equalizer",
      "extrastereo",
      "firequalizer",
      "flanger",
      "haas",
      // "hdcd",
      "highpass",
      "highshelf",
      "loudnorm",
      "lowpass",
      "lowshelf",
      "mcompand",
      // "pan",
      "replaygain",
      "rubberband",
      "silencedetect",
      "silenceremove",
      "speechnorm",
      "stereotools",
      "stereowiden",
      "superequalizer",
      "surround",
      "tiltshelf",
      "treble",
      "tremolo",
      "vibrato",
      "virtualbass",
      "volume",
      "volumedetect",
      "afifo",
    ])!;

    const inputRaw = path.join(outputDirectory, "input.raw");
    const outputRaw = path.join(outputDirectory, "output.raw");
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
    // TODO: Use different input & output settings
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
      audioFormat,
      "-ar",
      audioSampleRate,
      "-ac",
      audioChannelCount,
      outputRaw
    );
    await ffmpeg(
      "-f",
      "rawvideo",
      "-s",
      size,
      "-r",
      inputMetadata.frameRate,
      "-pix_fmt",
      pixelFormat,
      "-i",
      outputRaw,
      "-s",
      size,
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

    await fs.rm(inputRaw, { force: true });
    await fs.rm(outputRaw, { force: true });
    await log();
  }

  async function ffmpeg(...commandLineArguments: string[]): Promise<void> {
    const result = await execa(ffmpegPath, ["-y", ...commandLineArguments], {
      all: true,
      reject: false,
      preferLocal: true,
    });
    await log(result.escapedCommand);
    if (result.failed) {
      if (typeof result.all === "string") await log(result.all);
      throw new Error(result.all);
    }
  }

  async function log(message?: string): Promise<void> {
    await fs.appendFile(
      path.join(outputDirectory, "log.txt"),
      (message ?? "") + "\n"
    );
  }
}

if (url.fileURLToPath(import.meta.url) === (await fs.realpath(process.argv[1])))
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
            bends: typeof bends === "string" ? Number(bends) : undefined,
          });
        } catch (error) {
          console.error(error);
          process.exit(1);
        }
      }
    )
    .parseAsync();

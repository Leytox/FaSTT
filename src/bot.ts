import { Context, Format, Telegraf } from "telegraf";
import type { Message, Update } from "telegraf/types";
import type { NarrowedContext } from "telegraf";
import { message } from "telegraf/filters";
import { transcribe } from "./ai";

export const bot = new Telegraf(process.env.BOT_TOKEN!);

async function replyWithTranscription(
  ctx: NarrowedContext<
    Context<Update>,
    Update.MessageUpdate<
      Record<any, {}> &
        (
          | Message.AudioMessage
          | Message.VoiceMessage
          | Message.VideoMessage
          | Message.VideoNoteMessage
        )
    >
  >,
  fileId: string,
) {
  const file = await bot.telegram.getFile(fileId);
  const fileUrl = `https://api.telegram.org/file/bot${process.env.BOT_TOKEN}/${file.file_path}`;
  const response_text = await transcribe(fileUrl);
  await ctx.reply(Format.quote(response_text), {
    reply_parameters: {
      message_id: ctx.message.message_id,
    },
  });
  const username =
    ctx.from?.username ||
    ctx.from?.first_name ||
    ctx.from?.id.toString() ||
    "Unknown";
  const userId = ctx.from?.id || "Unknown";

  if (process.env.NODE_ENV !== "production")
    console.log(
      `[LOG] User: @${username} (ID: ${userId}) | Media URL: ${fileUrl} | Transcription: ${response_text}`,
    );
}

bot.start((ctx) => ctx.reply("Welcome, send an audio to turn it to the text"));
bot.help((ctx) => ctx.reply("Send an audio to turn it to the text"));

bot.on(message("audio"), async (ctx) => {
  const audio = ctx.message.audio;
  const fileId = audio.file_id;
  await replyWithTranscription(ctx, fileId);
});

bot.on(message("voice"), async (ctx) => {
  const voice = ctx.message.voice;
  const fileId = voice.file_id;
  await replyWithTranscription(ctx, fileId);
});

bot.on(message("video"), async (ctx) => {
  const video = ctx.message.video;
  const fileId = video.file_id;
  await replyWithTranscription(ctx, fileId);
});

bot.on(message("video_note"), async (ctx) => {
  const video_note = ctx.message.video_note;
  const fileId = video_note.file_id;
  await replyWithTranscription(ctx, fileId);
});

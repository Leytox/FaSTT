import Groq from "groq-sdk";
const groq = new Groq();

export async function transcribe(fileUrl: string) {
  const file_response = await fetch(fileUrl);
  const fileBlob = await file_response.blob();
  const file = new File([fileBlob], "audio.ogg", { type: "audio/ogg" });
  const response = await groq.audio.transcriptions.create({
    file,
    model: "whisper-large-v3",
    response_format: "verbose_json",
  });
  return response.text;
}

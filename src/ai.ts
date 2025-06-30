import Groq from "groq-sdk";
const groq = new Groq();

export async function transcribe(fileUrl: string) {
  try {
    const file_response = await fetch(fileUrl);
    const fileBlob = await (await file_response.blob()).arrayBuffer();
    const file = new File([fileBlob], "audio.ogg", {
      type: "audio/ogg",
    });
    const response = await groq.audio.transcriptions.create({
      file: file as any,
      model: "whisper-large-v3",
      response_format: "verbose_json",
    });
    return response.text;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

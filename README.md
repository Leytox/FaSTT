# FaSTT Telegram bot

## Used libraries

- Bun
- Telegraf
- Hono
- Groq SDK

## Official Bot link

[FaSTT](https://t.me/Vastt_bot)

## Installation & Usage

### Enviroment variables

- Choose port and set PORT variable to a desired one
- Obtain API key for a Telegram bot using [BotFather](https://t.me/BotFather) and paste it in BOT_TOKEN
- Obtain API key from [GROQ](https://groq.com) and paste it in GROQ_API_KEY

### Install dependencies

```sh
bun install
```

### Development

To run in development mode:

```sh
bun run dev
```

### Build

To build the project:

```sh
bun run build
```

### Production

To run the built file:

```sh
bun run start
```

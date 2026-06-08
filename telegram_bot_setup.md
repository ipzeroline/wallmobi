# Telegram Bot Notification Setup Guide

We have integrated a Telegram notification feature into both the **Email/Password** and **Google Login** registration flows. When a new member registers on **WallMobi**, your bot will instantly send a formatted notification alert to your Telegram chat/group.

To enable this feature, you need to prepare **2 values** and add them to your [.env.local](file:///Users/zeroline/Documents/wallmobi/.env.local) file:

```env
TELEGRAM_BOT_TOKEN=your_bot_token_here
TELEGRAM_CHAT_ID=your_chat_id_here
```

Here is the step-by-step instruction to get these values:

---

## 🤖 Step 1: Create a Telegram Bot (Get `TELEGRAM_BOT_TOKEN`)

1. Open the Telegram app and search for [**@BotFather**](https://t.me/botfather) (make sure it has a blue verification checkmark).
2. Click **Start** or send `/newbot`.
3. Follow the prompts:
   - Enter a **Name** for your bot (e.g., `WallMobi Admin Alert`).
   - Enter a **Username** for your bot (must end in `_bot`, e.g., `wallmobi_alert_bot`).
4. Once completed, `@BotFather` will reply with your **HTTP API Token** (e.g., `5067430043:AAF-qosr0cjp92n89ot7315g4bci3hcm`).
5. **Copy this Token** — this is your `TELEGRAM_BOT_TOKEN`.

---

## 💬 Step 2: Get your Chat ID (Get `TELEGRAM_CHAT_ID`)

You can set up alerts to go to your **Private Chat** or to a **Telegram Group/Channel** where your team is.

### Option A: Send notifications to your Private Chat
1. Send a message to your new bot in Telegram (click the link provided by `@BotFather` and click **Start**).
2. Search for [**@userinfobot**](https://t.me/userinfobot) on Telegram and click **Start**.
3. It will instantly reply with your personal **Id** (a series of numbers, e.g., `123456789`).
4. **Copy this ID** — this is your `TELEGRAM_CHAT_ID`.

### Option B: Send notifications to a Group/Channel (Recommended for teams)
1. Create a new Telegram Group or open an existing one.
2. Add your **Bot** (the username you created in Step 1) as a member of the group.
3. Search for [**@RawDataBot**](https://t.me/RawDataBot) on Telegram and add it to your group as a member.
4. Once added, `@RawDataBot` will dump a JSON text containing the group details. Locate the `"chat"` block and find the `"id"` (group IDs always start with a minus sign, e.g., `-1001506743004`).
5. **Copy this ID** (including the minus sign) — this is your `TELEGRAM_CHAT_ID`.
6. Remove `@RawDataBot` from the group once you have the ID.

---

## 📝 Step 3: Configure environment variables

Open your [.env.local](file:///Users/zeroline/Documents/wallmobi/.env.local) file and append the values you prepared:

```env
TELEGRAM_BOT_TOKEN=5067430043:AAF-qosr0cjp92n89ot7315g4bci3hcm
TELEGRAM_CHAT_ID=-1001506743004
```

---

## 🔔 Notification Template

Once configured, the Telegram bot will send real-time alerts formatted like this:

> 🔔 **มีสมาชิกใหม่ลงทะเบียน! (อีเมล)**
>
> 👤 **ชื่อ:** John Doe
> ✉️ **อีเมล:** john.doe@example.com
> 🔑 **ช่องทาง:** Email/Password
> 📅 **เวลา:** 6/8/2026, 8:45:00 AM

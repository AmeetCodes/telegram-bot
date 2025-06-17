require("dotenv").config();

const TelegramBot = require("node-telegram-bot-api");

// Use token from .env
const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

const siteUrl = "https://quotes.amitniraula.com.np";

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    `👋 Hello ${msg.chat.first_name}!\nWelcome to the *Status Sharer Bot*!\n\nGet the latest quotes, statuses, and captions every few minutes.\n👇 Tap below to visit our site.`,
    {
      parse_mode: "Markdown",
      reply_markup: {
        inline_keyboard: [[{ text: "🌐 Visit Our Site", url: siteUrl }]],
      },
    }
  );
});

// Store active users
let users = [];

bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  if (!users.includes(chatId)) {
    users.push(chatId);
  }
});

// Send update every 2 minutes
setInterval(() => {
  users.forEach((chatId) => {
    bot.sendMessage(chatId, `🆕 New content is live now!\nCheck here 👉 ${siteUrl}`);
  });
}, 2 * 60 * 1000);

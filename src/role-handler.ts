import { Message } from 'discord.js';

import Languages from '../data/languages.json';

export function handleMessage(message: Message) {
  if (message.author.bot) return;

  if (message.channel.id !== "813052426415898645") return;

  const language = message.content.toUpperCase();

  if (Languages[language] !== undefined) {
    message.member.roles.add(Languages[language].role_id);
  }
}

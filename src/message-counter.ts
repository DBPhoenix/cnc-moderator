import {Message} from 'discord.js';

import {message_data} from '../main';

export function countMessage(message: Message) {
  if (message.author.bot) return;

  if (message_data[message.channel.id] === undefined) {
    message_data[message.channel.id] = {};
  }

  if (message_data[message.channel.id][message.member.id] === undefined) {
    message_data[message.channel.id][message.member.id] = 0;
  }

  message_data[message.channel.id][message.member.id]++;
}

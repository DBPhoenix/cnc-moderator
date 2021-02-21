import {Message} from 'discord.js';

import Channels from '../data/channels.json';

import {message_data} from '../main';

let new_idea: boolean = true;

export function countMessage(message: Message) {
  switch (message.channel.id) {
    case Channels.general.id:
    case Channels.ideas.id:
    case Channels.help.id:
      break;
    case Channels.share.id:
      if (!message.content.includes('```')) return;
      break;
    default:
      return;
  }

  increaseMessageCount(message);
}

function increaseMessageCount(message: Message) {
  if (message.author.bot) return;

  if (message_data[message.channel.id] === undefined) {
    message_data[message.channel.id] = {};
  }

  if (message_data[message.channel.id][message.member.id] === undefined) {
    message_data[message.channel.id][message.member.id] = 0;
  }

  message_data[message.channel.id][message.member.id]++;
}

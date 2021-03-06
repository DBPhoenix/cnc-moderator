import {Client} from 'discord.js';
import {writeFileSync, readdirSync} from 'fs';

import Command from './src/types/command';
import Messages from './src/types/messages';
import Private from './data/private.json';

import * as MessageCounter from './src/message-counter';
import * as RoleHandler from './src/role-handler';

const client = new Client();
export const message_data: Messages = require('./data/messages.json');

const commands: {
  [name: string]: Command;
} = {};

for (const file of readdirSync('./src/commands')) {
  const command: Command = require(`./src/commands/${file}`).default;
  commands[command.name] = command;
}

client.on('ready', () => {
  setInterval(safeData, 3600000);
});

client.on('guildCreate', guild => {
  if (guild.id !== Private.guildID) {
    guild.systemChannel.send(
      "This bot is only meant for Discord Server: Coding 'n Chill"
    );
    guild.leave();
  }
});

client.on('message', message => {
  MessageCounter.countMessage(message);
  RoleHandler.handleMessage(message);

  for (const [name, command] of Object.entries(commands)) {
    if (message.content.startsWith(`!${name}`)) {
      command.exec(message);
    }
  }
});

client.login(Private.token);

function safeData() {
  writeFileSync('./data/messages.json', JSON.stringify(message_data, null, 2));
}

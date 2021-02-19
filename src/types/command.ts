import {Message} from 'discord.js';

type Command = {
  name: string;
  exec: (message: Message) => void;
};

export default Command;

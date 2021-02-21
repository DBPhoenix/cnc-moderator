import {Message} from 'discord.js';

import {message_data} from '../../main';
import Channels from '../../data/channels.json';

export default {
  name: 'awards',
  exec(message: Message) {
    let awards: {
      [channel: string]: {
        id: string;
        role_id: string;
        user_id?: string;
      }
    } = Channels;

    for (const [key, channel] of Object.entries(awards)) {
      let best: {
        member_id: string;
        count: number;
      } = undefined;

      const channel_data = message_data[channel.id];
      for (const [member_id, count] of Object.entries(channel_data)) {
        if (best === undefined) {
          best = {
            member_id,
            count,
          };
        } else if (best.count < count) {
          best = {
            member_id,
            count,
          };
        }
      }

      awards[key]['user_id'] = best.member_id;
    }

    for (const channel of Object.values(awards)) {
      message.guild.roles.fetch(channel.role_id).then(role => {
        role.members.each(member => member.roles.remove(channel.role_id));
      });
      
      message.guild.members.fetch(channel.user_id).then(member => {
        member.roles.add(channel.role_id);
      });
    }

    message.channel.send(
      'And the Awards goes to...\n' +
        `<@&${awards.general.role_id}> goes to: <@${awards.general.user_id}>\n` +
        `<@&${awards.ideas.role_id}> goes to: <@${awards.ideas.user_id}>\n` +
        `<@&${awards.help.role_id}> goes to: <@${awards.help.user_id}>\n` +
        `<@&${awards.share.role_id}> goes to: <@${awards.share.user_id}>`
    );
  },
};

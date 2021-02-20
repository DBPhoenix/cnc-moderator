import {Message} from 'discord.js';

import {message_data} from '../../main';

export default {
  name: 'awards',
  exec(message: Message) {
    const awards = {
      general: {
        id: '812297296246997016',
        role_id: '812319275552997388',
        user_id: undefined,
      },
      ideas: {
        id: '812297458734465055',
        role_id: '812319337335226430',
        user_id: undefined,
      },
      help: {
        id: '812297635318202388',
        role_id: '812319549781311509',
        user_id: undefined,
      },
      share: {
        id: '812299220476231680',
        role_id: '812319667863027727',
        user_id: undefined,
      },
    };

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

      awards[key].user_id = best.member_id;
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

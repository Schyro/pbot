const Discord = require('discord.js');
const { RichEmbed } = require('discord.js');
const { Command } = require('discord.js-commando');
const { stripIndents } = require('common-tags');
let bolumler = ["kredi", "item", "öneri-şikayet", "diğer"];

module.exports = class SayCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'kapat',
            group: 'destek',
            memberName: 'kapat',
            description: 'Destek kanallarını kapatmaya yarar.',
            guildOnly: true,
            userPermissions: ['MANAGE_CHANNELS'],
            examples: ['kapat'],
            args: [
                {
                    key: 'reason',
                    prompt: 'Bu destek kanalını kapatma sebebinizi girin.',
                    type: 'string',
                }
            ]
        });
    }

    run(msg, { reason }) {
		let logchannel = msg.guild.channels.find("id", "505006822810452024");
        msg.channel.delete();
		
		const embed = new Discord.RichEmbed()
		.setTitle("Bir destek talebi kapatıldı!")
		.setDescription(stripIndents`
		
		Kanalı kapatan yetkili: ${msg.author.tag}
		
		Sebeb: ${reason}
		
		`)
		.setFooter("oyna.provanas.com")
		.setTimestamp();
		logchannel.sendEmbed(embed);
    }
};
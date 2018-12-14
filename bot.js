const { CommandoClient, FriendlyError, SQLiteProvider } = require('discord.js-commando');
const Discord = require('discord.js');
const moment = require('moment');
const sqlite = require('sqlite');
const path = require('path');
const winston = require('winston');
const { oneLine } = require('common-tags');


const client = new CommandoClient({
    commandPrefix: '/',
    unknownCommandResponse: false,
    owner: '325260517256069121',
    disableEveryone: true
});


/*/client.on("message", (message, err) => {
    if(message.channel.id === "505007689689202729") {
    if(message.author.bot) return;
    if (message.guild.channels.exists("name", "destek-" + message.author.id)) { 
    message.delete();
    message.author.send(`***Zaten açık durumda bir ticketin var.***`)
        return;
    }
    message.guild.createChannel(`destek-${message.author.id}`, "text").then(c => {
        let role = message.guild.roles.find("name", "Support Team");
        let role2 = message.guild.roles.find("name", "@everyone");
        let parent1 = ["505026844836495380"]
        let parent2 = ["507898663301808128"]
        c.overwritePermissions(role, {
            SEND_MESSAGES: true,
            READ_MESSAGES: true
        });
        c.overwritePermissions(role2, {
            SEND_MESSAGES: false,
            READ_MESSAGES: false
        });
        c.overwritePermissions(message.author, {
            SEND_MESSAGES: true,
            READ_MESSAGES: true
        });
        console.log(message.guild.channels.size)
        message.channel.send(`:white_check_mark: Ticket Kanalın Oluşturuldu, #${c.name}.`).then(msg => {msg.delete(3500)});
        const embed = new Discord.RichEmbed()
        .addField(`Hey ${message.author.username}!`, `Başarılı Bir Şekilde Ticketın Açıldı, Şimdi Destek Ekibini Beklemen Lazım.`)
        .addField('Konu', message.content)
        .setTimestamp();
        c.send({ embed: embed });
        message.delete();
    }).catch(console.error);
 }
})
/*/

client.on('error', winston.error)
	.on('warn', winston.warn)
	.on('ready', () => {
		winston.info(oneLine`
			[DISCORD]: Client ready...
			Logged in as ${client.user.tag} (${client.user.id})
		`);
    })
    .on('disconnect', () => winston.warn('[DISCORD]: Disconnected!'))
	.on('reconnect', () => winston.warn('[DISCORD]: Reconnecting...'))
	.on('commandRun', (cmd, promise, msg, args) =>
		winston.info(oneLine`
			[DISCORD]: ${msg.author.tag} (${msg.author.id})
			> ${msg.guild ? `${msg.guild.name} (${msg.guild.id})` : 'DM'}
			>> ${cmd.groupID}:${cmd.memberName}
			${Object.values(args).length ? `>>> ${Object.values(args)}` : ''}
		`)
	)
	.on('unknownCommand', msg => {
		if (msg.channel.type === 'dm') return;
		if (msg.author.bot) return;
		if (msg.content.split(msg.guild.commandPrefix)[1] === 'undefined') return;
		const args = { name: msg.content.split(msg.guild.commandPrefix)[1].toLowerCase() };
    })
    .on('commandError', (cmd, err) => {
		if (err instanceof FriendlyError) return;
		winston.error(`[DISCORD]: Error in command ${cmd.groupID}:${cmd.memberName}`, err);
	})
	.on('commandBlocked', (msg, reason) => {
		winston.info(oneLine`
			[DISCORD]: Command ${msg.command ? `${msg.command.groupID}:${msg.command.memberName}` : ''}
			blocked; User ${msg.author.tag} (${msg.author.id}): ${reason}
		`);
	})
	.on('commandPrefixChange', (guild, prefix) => {
		winston.info(oneLine`
			[DISCORD]: Prefix changed to ${prefix || 'the default'}
			${guild ? `in guild ${guild.name} (${guild.id})` : 'globally'}.
		`);
	})
	.on('commandStatusChange', (guild, command, enabled) => {
		winston.info(oneLine`
			[DISCORD]: Command ${command.groupID}:${command.memberName}
			${enabled ? 'enabled' : 'disabled'}
			${guild ? `in guild ${guild.name} (${guild.id})` : 'globally'}.
		`);
	})
	.on('groupStatusChange', (guild, group, enabled) => {
		winston.info(oneLine`
			[DISCORD]: Group ${group.id}
			${enabled ? 'enabled' : 'disabled'}
			${guild ? `in guild ${guild.name} (${guild.id})` : 'globally'}.
		`);
	})


client.registry
    .registerDefaultTypes()
    .registerGroups([
        ['destek', 'Destek'],
    ])
    .registerDefaultGroups()
    .registerDefaultCommands()
    .registerCommandsIn(path.join(__dirname, 'commands'));

    client.on('ready', () => {
        client.user.setGame("play.provanas.com", "https://www.twitch.tv/schyro_");
    });

client.login(process.env.TOKEN);

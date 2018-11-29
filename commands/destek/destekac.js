const Discord = require('discord.js');
const { Command } = require('discord.js-commando');
const { oneLine } = require('common-tags');
const sayilar = ["1", "2", "3", "4"];
const bolumler = ["`1` **Kredi sorunları**", "`2` **VIP/Item Sorunları**", "`3` **Öneri ve Şikayetler**", "`4` **Diğer**"]

module.exports = class SayCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'destekac',
            aliases: ['destekaç', 'destek'],
            group: 'destek',
            memberName: 'destekac',
            description: 'Destek kanalı açmanıza yarar.',
            guildOnly: true,
            examples: ['destekac Destek lazım'],
            args: [
                {
                    key: 'bolum',
                    prompt: `Sorununuz nedir? Aşağıdaki konulardan belirleyiniz.\n\n ${bolumler.join("\n")}\n\n*(Lütfen sadece rakamı yazınız)*`,
                    type: 'string',
                    oneOf: sayilar
                }
            ]
        });
    }

    run(msg, { bolum }) {

        if (msg.guild.channels.exists("name", "kredi-" + msg.author.id) || msg.guild.channels.exists("name", "item-" + msg.author.id) || msg.guild.channels.exists("name", "öneri-şikayet-" + msg.author.id) || msg.guild.channels.exists("name", "diğer-" + msg.author.id)) { 
            msg.author.send(`***Zaten açık durumda bir destek talebin var.***`)
                return;
            }
        
        if(bolum === "1") {
            msg.guild.createChannel(`kredi-${msg.author.id}`, "text").then(c => {
                let role = msg.guild.roles.find("name", "Support Team");
                let role2 = msg.guild.roles.find("name", "@everyone");

                c.overwritePermissions(role, {
                    SEND_MESSAGES: true,
                    READ_MESSAGES: true
                });
                c.overwritePermissions(role2, {
                    SEND_MESSAGES: false,
                    READ_MESSAGES: false
                });
                c.overwritePermissions(msg.author, {
                    SEND_MESSAGES: true,
                    READ_MESSAGES: true
                });

                c.setParent("507898663301808128")
                msg.channel.send(`:white_check_mark: ***Destek kanalın oluşturuldu.***`).then(msg => {msg.delete(4500)});

                const embed = new Discord.RichEmbed()
                .addField(`Hey ${msg.author.tag}!`, `Bu kanal senin için açıldı, burda konunu anlatabilirsin.`)
                .setTimestamp();
                c.send({ embed: embed });
                msg.delete();

                const dmembed = new Discord.RichEmbed()
                .addField(`Hey!`, `Ticket'ın başarılı bir şekilde açıldı <#${c.id}>`)
                .setTimestamp();
                msg.author.sendEmbed(dmembed);
            }).catch(console.error);
        } else {
            if(bolum === "2") {
                msg.guild.createChannel(`item-${msg.author.id}`, "text").then(c => {
                    let role = msg.guild.roles.find("name", "Support Team");
                    let role2 = msg.guild.roles.find("name", "@everyone");
                    
                    c.overwritePermissions(role, {
                        SEND_MESSAGES: true,
                        READ_MESSAGES: true
                    });
                    c.overwritePermissions(role2, {
                        SEND_MESSAGES: false,
                        READ_MESSAGES: false
                    });
                    c.overwritePermissions(msg.author, {
                        SEND_MESSAGES: true,
                        READ_MESSAGES: true
                    });

                    c.setParent("507898663301808128")
                    msg.channel.send(`:white_check_mark: ***Destek kanalın oluşturuldu.***`).then(msg => {msg.delete(4500)});
    
                    const embed = new Discord.RichEmbed()
                    .addField(`Hey ${msg.author.tag}!`, `Bu kanal senin için açıldı, burda konunu anlatabilirsin.`)
                    .setTimestamp();
                    c.send({ embed: embed });
                    msg.delete();
    
                    const dmembed = new Discord.RichEmbed()
                    .addField(`Hey!`, `Ticket'ın başarılı bir şekilde açıldı <#${c.id}>`)
                    .setTimestamp();
                    msg.author.sendEmbed(dmembed);
                }).catch(console.error);
            } else {
                if(bolum === "3") {
                    msg.guild.createChannel(`öneri-şikayet-${msg.author.id}`, "text").then(c => {
                        let role = msg.guild.roles.find("name", "Support Team");
                        let role2 = msg.guild.roles.find("name", "@everyone");
                    
                        c.overwritePermissions(role, {
                            SEND_MESSAGES: true,
                            READ_MESSAGES: true
                        });
                        c.overwritePermissions(role2, {
                            SEND_MESSAGES: false,
                            READ_MESSAGES: false
                        });
                        c.overwritePermissions(msg.author, {
                            SEND_MESSAGES: true,
                            READ_MESSAGES: true
                        });

                        c.setParent("507898663301808128")
                        msg.channel.send(`:white_check_mark: ***Destek kanalın oluşturuldu.***`).then(msg => {msg.delete(4500)});
        
                        const embed = new Discord.RichEmbed()
                        .addField(`Hey ${msg.author.tag}!`, `Bu kanal senin için açıldı, burda konunu anlatabilirsin.`)
                        .setTimestamp();
                        c.send({ embed: embed });
                        msg.delete();
        
                        const dmembed = new Discord.RichEmbed()
                        .addField(`Hey!`, `Ticket'ın başarılı bir şekilde açıldı <#${c.id}>`)
                        .setTimestamp();
                        msg.author.sendEmbed(dmembed);
                    }).catch(console.error);
                } else {
                    if(bolum === "4") {
                        msg.guild.createChannel(`diğer-${msg.author.id}`, "text").then(c => {
                            let role = msg.guild.roles.find("name", "Support Team");
                            let role2 = msg.guild.roles.find("name", "@everyone");
                    
                            c.overwritePermissions(role, {
                                SEND_MESSAGES: true,
                                READ_MESSAGES: true
                            });
                            c.overwritePermissions(role2, {
                                SEND_MESSAGES: false,
                                READ_MESSAGES: false
                            });
                            c.overwritePermissions(msg.author, {
                                SEND_MESSAGES: true,
                                READ_MESSAGES: true
                            });
                            
                            c.setParent("507898663301808128")
                            msg.channel.send(`:white_check_mark: ***Destek kanalın oluşturuldu.***`).then(msg => {msg.delete(4500)});
            
                            const embed = new Discord.RichEmbed()
                            .addField(`Hey ${msg.author.tag}!`, `Bu kanal senin için açıldı, burda konunu anlatabilirsin.`)
                            .setTimestamp();
                            c.send({ embed: embed });
                            msg.delete();
            
                            const dmembed = new Discord.RichEmbed()
                            .addField(`Hey!`, `Ticket'ın başarılı bir şekilde açıldı <#${c.id}>`)
                            .setTimestamp();
                            msg.author.sendEmbed(dmembed);
                        }).catch(console.error);
                    } else {
                        return;
                    }
                }
            }
        }

    }
};
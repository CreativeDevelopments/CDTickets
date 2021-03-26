const colors = require('colors');
const { MessageEmbed } = require('discord.js');

class CDTickets {

    /**
    *
    * @param {Object} param0
    * @param {Message} param0.msg
    * @param {string} param0.name
    * @param {string} param0.supportRole
    * @param {string} param0.category
    * @param {string} param0.response
    * @param {string} param0.reason
    * @param {string} param0.message
    * @returns
    */
    async create({ msg, name, supportRole, category, response, reason, message }) {
        if (!msg || !msg.author)
            return console.log(`${colors.brightRed('[ERROR]')}`.white + colors.white(' No "msg" was provided!'));

        if (!supportRole)
            return console.log(`${colors.brightRed('[ERROR]')}`.white + colors.white(' No "supportRole" was provided!'));

        let role = msg.guild.roles.cache.find(r => r.name === supportRole) || msg.guild.roles.cache.get(supportRole) || msg.mentions.roles.first();
        if (!role)
            return msg.channel.send('An invalid role was provided, please try again!');

        if (!name)
            name = `${msg.author.username}`;

        if (!reason)
            reason = 'No reason provided';

        if (!message)
            message = `${msg.author} Welcome to your ticket!`;

        let chan;
        try {
            chan = await msg.guild.channels.create(name, {
                type: 'text',
                reason: `Opening ticket for ${msg.author.tag}`,
                topic: `Ticket owner --> ${msg.author.tag} | Reason --> ${reason}`,
                permissionOverwrites: [
                    {
                        id: msg.author.id,
                        allow: 117760
                    }, {
                        id: role.id,
                        allow: 117760
                    }, {
                        id: msg.guild.id,
                        deny: 1024
                    }
                ]
            });
        } catch (err) {
            console.log(err);
            return msg.channel.send('There was an error creating your ticket, please try again!');
        }

        if (category) {
            let cat = msg.guild.channels.cache.find(ch => ch.name === category) || msg.guild.channels.cache.get(category);

            if (!cat)
                console.log(`${colors.brightRed('[ERROR]')}`.white + colors.white(' An invalid category was provided!'));
            if (cat.type !== 'category')
                console.log(`${colors.brightRed('[ERROR]')}`.white + colors.white(' The category given is not a category!'));

            chan.setParent(cat.id, { lockPermissions: false, reason: `Opening ticket for ${msg.author.tag}` }).catch((err) => console.log(err));
        };

        if (!response)
            response = `${msg.author}, Your ticket has successfully been created in ${chan}`;

        msg.delete().catch((err) => console.log(err));

        const chanEmbed = new MessageEmbed()
            .setColor('#00DCFF')
            .setDescription(`${message}\n\nReason: ${reason}`)

        chan.send(`${role} ${msg.author}`, chanEmbed)
            .catch((_) => chan.send(`${role} ${msg.author}`, `${message}\n\nReason: ${reason}`));

        const embed = new MessageEmbed()
            .setColor('#2FDD2C')
            .setDescription(`${response}`)

        msg.channel.send(embed)
            .catch((_) => msg.channel.send(`${response}`));
    }

    /**
    *
    * @param {Object} param0
    * @param {Message} param0.msg
    * @returns
    */
    delete({ msg }) {
        if (!msg)
            return console.log(`${colors.brightRed('[ERROR]')}`.white + colors.white(' No "msg" was provided!'));

        const embed = new MessageEmbed()
        .setColor('#C93131')
        .setDescription('Deleting the ticket...')

        msg.delete().catch((err) => console.log(err));
        msg.channel.send(embed)
            .catch((_) => msg.channel.send(`Deleting the ticket...`));

        try {
            setTimeout(() => msg.channel.delete({
                reason: `Deleting ticket for ${msg.author.tag} | ${msg.channel.name}`,
            }),
                5000,
            );
        } catch (err) {
            console.log(err);
            return msg.channel.send('Failed to delete the ticket, please try again!');
        };
    }

    /**
    *
    * @param {Object} param0
    * @param {Message} param0.msg
    * @param {string} param0.supportRole
    * @returns
    */
    async claim({ msg, supportRole }) {
        if (!msg)
            return console.log(`${colors.brightRed('[ERROR]')}`.white + colors.white(' No "msg" was provided!'));

        if (!supportRole)
            return console.log(`${colors.brightRed('[ERROR]')}`.white + colors.white(' No "supportRole" was provided!'));

        let role = msg.guild.roles.cache.find(r => r.name === supportRole) || msg.guild.roles.cache.get(supportRole) || msg.mentions.roles.first();
        if (!role)
            return msg.channel.send('An invalid role was provided, please try again!');

        try {
            await msg.channel.overwritePermissions([
                {
                    id: msg.author,
                    allow: 117760
                }, {
                    id: role,
                    deny: 1024
                }, {
                    id: msg.guild.id,
                    deny: 1024
                }
            ], `Claiming ticket for ${msg.author.tag}`);
        } catch (err) {
            console.log(err);
            return msg.channel.send('Failed to claim the ticket, please try again!');
        };

        const embed = new MessageEmbed()
        .setColor('#2FDD2C')
        .setDescription(`You have successfully claimed the ticket ${msg.channel}!`)

        msg.delete().catch((err) => console.log(err));
        msg.channel.send(embed)
            .catch((_) => msg.channel.send(`Successfully claimed the ticket!`));
    }

   /**
    *
    * @param {Object} param0
    * @param {Message} param0.msg
    * @param {string} param0.supportRole
    * @returns
    */
   async unclaim({ msg, supportRole }) {
        if (!msg) 
            return console.log(`${colors.brightRed('[ERROR]')}`.white + colors.white(' No "msg" was provided!'));
       
        if (!supportRole) 
            return console.log(`${colors.brightRed('[ERROR]')}`.white + colors.white(' No "supportRole" was provided!'));

        let role = msg.guild.roles.cache.find(r => r.name === supportRole) || msg.guild.roles.cache.get(supportRole) || msg.mentions.roles.first();
        if (!role) 
            return msg.channel.send('An invalid role was provided, please try again!');

        try {
            await msg.channel.overwritePermissions([
                {
                    id: msg.author
                }, {
                    id: role,
                    allow: 11760,
                }, {
                    id: msg.guild.id,
                    deny: 1024
                }
            ], `Unclaiming ticket for ${msg.author.tag}`);
        } catch(err) {
            console.log(err);
            return msg.channel.send('Failed to unclaim the ticket, please try again!');
        };

        const embed = new MessageEmbed()
        .setColor('#2FDD2C')
        .setDescription(`You have successfully unclaimed the ticket ${msg.channel}!`)

        msg.delete().catch((err) => console.log(err));
        msg.channel.send(embed)
            .catch((_) => message.channel.send(`Successfully unclaimed the ticket!`));
    }

   /**
    *
    * @param {Object} param0
    * @param {Message} param0.msg
    * @param {string} param0.name
    * @returns
    */
   async rename({ msg, name }) {
        if (!msg) 
            return console.log(`${colors.brightRed('[ERROR]')}`.white + colors.white(' No "msg" was provided!'));
        if (!name) 
            return console.log(`${colors.brightRed('[ERROR]')}`.white + colors.white(' No "name" was provided!'));

        try {
            await msg.channel.setName(name, `Renaming ticket ${msg.channel.name} for ${msg.author.tag}`);
        } catch (err) {
            console.log(err);
            return msg.channel.send('Failed to rename the ticket, please try again!');
        };

        const embed = new MessageEmbed()
        .setColor('#2FDD2C')
        .setDescription(`Successfully renamed the ticket to ${name}!`)

        msg.delete().catch((err) => console.log(err));
        msg.channel.send(embed)
            .catch((_) => message.channel.send(`Successfully renamed the ticket to ${name}!`));
    }

   /**
    *
    * @param {Object} param0
    * @param {Message} param0.msg
    * @param {string} param0.user
    * @returns
    */
   async add({ msg, user}) {
        if (!msg) 
            return console.log(`${colors.brightRed('[ERROR]')}`.white + colors.white(' No "msg" was provided!'));
        if (!user) 
            return console.log(`${colors.brightRed('[ERROR]')}`.white + colors.white(' No "user" was provided!'));

        const targetMember = msg.guild.members.cache.get(user) || msg.mentions.members.first();
        if (!targetMember)
            return msg.channel.send('An invalid user was provided, please try again!');

        try {
            await msg.channel.updateOverwrite(targetMember.id, {
                VIEW_CHANNEL: true,
                SEND_MESSAGES: true,
                READ_MESSAGES: true,
                ATTACH_FILE: true,
                EMBED_LINKS: true,
                READ_MESSAGE_HISTORY: true,
            }, `Adding ${targetMember.user.tag} to ticket ${msg.channel.name}`);
        } catch (err) {
            console.error(err);
            return msg.channel.send(`Failed to add ${targetMember} to the ticket, please try again!`);
        };

        const embed = new MessageEmbed()
        .setColor('#2FDD2C')
        .setDescription(`Successfully added ${targetMember} to ticket ${msg.channel.name}!`)

        msg.delete().catch((err) => console.log(err));
        msg.channel.send(embed)
            .catch((_) => message.channel.send(`Successfully added ${targetMember} to ticket ${msg.channel.name}!`));
    }

   /**
    *
    * @param {Object} param0
    * @param {Message} param0.msg
    * @param {string} param0.user
    * @returns
    */
   async remove({ msg, user }) {
        if (!msg) 
            return console.log(`${colors.brightRed('[ERROR]')}`.white + colors.white(' No "msg" was provided!'));
        if (!user) 
            return console.log(`${colors.brightRed('[ERROR]')}`.white + colors.white(' No "user" was provided!'));

        const targetMember = msg.guild.members.cache.get(user) || msg.mentions.members.first();
        if (!targetMember)
            return msg.channel.send('An invalid user was provided, please try again!');

        try {
            await msg.channel.updateOverwrite(targetMember.id, {
                VIEW_CHANNEL: false,
                READ_MESSAGES: false,
            }, `Removing ${targetMember.user.tag} from ticket ${msg.channel.name}`);
        } catch(err) {
            console.log(err);
            return msg.channel.send(`Failed to remove ${targetMember} from the ticket, please try again!`);
        };

        const embed = new MessageEmbed()
        .setColor('#2FDD2C')
        .setDescription(`Successfully removed ${targetMember} from ticket ${msg.channel.name}!`)

        msg.delete().catch((err) => console.log(err));
        msg.channel.send(embed)
            .catch((_) => message.channel.send(`Successfully removed ${user} from ticket ${msg.channel.name}!`));
    }
}

module.exports = CDTickets;
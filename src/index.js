/*
 *   Copyright (c) 2021 Exxon#0293
 *   All rights reserved.
 */

 const colors = require('colors');
 const { MessageEmbed } = require('discord.js');

class CDTickets {
    test({ msg}) {
        return msg.reply('hi')
    }

    // Create a ticket
     async create({ msg, name, supportRole, category, response, reason, message }) {
        if (!msg) console.log(`${colors.brightRed('[ERROR]')}`.white + colors.white(' Invalid message'));

        if (!name) name = `${msg.author.username}`;

        if (!supportRole) console.log(`${colors.brightRed('[ERROR]')}`.white + colors.white(' Invalid support role'));
        let role = msg.guild.roles.cache.find(r => r.name === supportRole) || msg.guild.roles.cache.get(supportRole);
        if (!role) console.log(`${colors.brightRed('[ERROR]')}`.white + colors.white(' Invalid role'));

        if (category) {
            let cat = msg.guild.channels.cache.find(ch => ch.name === category) || msg.guild.channels.cache.get(category)
            if (!cat) console.log(`${colors.brightRed('[ERROR]')}`.white + colors.white(' Invalid category'))
            if (cat.type !== 'category') console.log(`${colors.brightRed('[ERROR]')}`.white + colors.white(' The category given is not a category'))
        };

        if (!reason) reason = 'No reason provided';

        if (!message) message = `${msg.author} Welcome to your ticket!`

        msg.guild.channels.create(name, { type: 'text', reason: `Opening ticket for ${msg.author.tag}`}).then(chan => {
            chan.updateOverwrite(msg.author, {
                VIEW_CHANNEL: true,
                SEND_MESSAGES: true,
                READ_MESSAGES: true,
                ATTACH_FILE: true,
                EMBED_LINKS: true,
                READ_MESSAGE_HISTORY: true,
            }, `Opening ticket for ${msg.author.tag}`)
            chan.updateOverwrite(role, {
                VIEW_CHANNEL: true,
                SEND_MESSAGES: true,
                READ_MESSAGES: true,
                ATTACH_FILE: true,
                EMBED_LINKS: true,
                READ_MESSAGE_HISTORY: true,
            }, `Opening ticket for ${msg.author.tag}`)
            chan.updateOverwrite(msg.guild.id, {
                VIEW_CHANNEL: false,
                READ_MESSAGES: false,
            }, `Opening ticket for ${msg.author.tag}`)
            .then(() => chan.setTopic(`Ticket Owner -> ${msg.author.tag} | Reason -> ${reason}`, `Opening ticket for ${msg.author.tag}`))

            if (category) {
                let cat = msg.guild.channels.cache.find(ch => ch.name === category) || msg.guild.channels.cache.get(category);

                if (!cat) console.log(`${colors.brightRed('[ERROR]')}`.white + colors.white(' Invalid category'));
                if (cat.type !== 'category') console.log(`${colors.brightRed('[ERROR]')}`.white + colors.white(' The category given is not a category'));

                chan.setParent(cat.id, { lockPermissions: false, reason: `Opening ticket for ${msg.author.tag}` });
            };

            const chanEmbed = new MessageEmbed()
            .setColor('#00DCFF')
            .setDescription(`${message}\n\nReason: ${reason}`)
            chan.send(`${role} ${msg.author}`, chanEmbed).catch(err => chan.send(`${role} ${msg.author}`, `${message}\n\nReason: ${reason}`))

            if (!response) response = `${msg.author}, Your ticket has successfully been created in ${chan}`

            msg.delete()

            const embed = new MessageEmbed()
            .setColor('#2FDD2C')
            .setDescription(`${response}`)
            msg.channel.send(embed).catch(err => msg.channel.send(`${response}`))
        })
    }

    // Delete a ticket
    delete({ msg }) {
        if (!msg) console.log(`${colors.brightRed('[ERROR]')}`.white + colors.white(' Invalid Message'))

        const embed = new MessageEmbed()
        .setColor('#C93131')
        .setDescription('Deleting the ticket...')

        msg.delete()

        msg.channel.send(embed).catch(err => msg.channel.send(`Deleting the ticket...`))
        .then(m => m.channel.delete({ reason: `Closing ticket ${msg.channel.name}`}))
    }

    //Claim a ticket
    claim({ msg, supportRole }) {
        if (!msg) console.log(`${colors.brightRed('[ERROR]')}`.white + colors.white(' Invalid Message'))
        
        if (!supportRole) console.log(`${colors.brightRed('[ERROR]')}`.white + colors.white(' Invalid Role'))
        let role = msg.guild.roles.cache.find(r => r.name === supportRole) || msg.guild.roles.cache.get(supportRole);
        if (!role) console.log(`${colors.brightRED('[ERROR]')}`.white + colors.white(' Invalid role'));

        msg.channel.updateOverwrite(role, {
            VIEW_CHANNEL: false,
            SEND_MESSAGES: false,
            READ_MESSAGES: false,
            ATTACH_FILE: false,
            EMBED_LINKS: false,
            READ_MESSAGE_HISTORY: false,
        }, `Claiming ticket for ${msg.author.tag}`)
        msg.channel.updateOverwrite(msg.author, {
            VIEW_CHANNEL: true,
            SEND_MESSAGES: true,
            READ_MESSAGES: true,
            ATTACH_FILE: true,
            EMBED_LINKS: true,
            READ_MESSAGE_HISTORY: true,
        }, `Claiming ticket for ${msg.author.tag}`)

        const embed = new MessageEmbed()
        .setColor('#2FDD2C')
        .setDescription(`You have successfully claimed the ticket ${msg.channel}`)

        msg.delete()
        msg.channel.send(embed).catch(err => message.channel.send(`You have successfully claimed hte ticket ${msg.channel}`))
    }

    //Remove a claim
    unclaim({ msg, supportRole }) {
        if (!msg) console.log(`${colors.brightRed('[ERROR]')}`.white + colors.white(' Invalid Message'))
        
        if (!supportRole) console.log(`${colors.brightRed('[ERROR]')}`.white + colors.white(' Invalid Role'))
        let role = msg.guild.roles.cache.find(r => r.name === supportRole) || msg.guild.roles.cache.get(supportRole);
        if (!role) console.log(`${colors.brightRed('[ERROR]')}`.white + colors.white(' Invalid role'));
        
        msg.channel.updateOverwrite(msg.author, {
            VIEW_CHANNEL: false,
            SEND_MESSAGES: false,
            READ_MESSAGES: false,
            ATTACH_FILE: false,
            EMBED_LINKS: false,
            READ_MESSAGE_HISTORY: false,
        }, `Unclaiming ticket for ${msg.author.tag}`)
        msg.channel.updateOverwrite(role, {
            VIEW_CHANNEL: true,
            SEND_MESSAGES: true,
            READ_MESSAGES: true,
            ATTACH_FILE: true,
            EMBED_LINKS: true,
            READ_MESSAGE_HISTORY: true,
        }, `Unclaiming ticket for ${msg.author.tag}`)

        const embed = new MessageEmbed()
        .setColor('#2FDD2C')
        .setDescription(`You have successfully unclaimed the ticket ${msg.channel}`)

        msg.delete()
        msg.channel.send(embed).catch(err => message.channel.send(`You have successfully unclaimed the ticket ${msg.channel}`))
    }

    //Rename a ticket
    async rename({ msg, name }) {
        if (!msg) console.log(`${colors.brightRed('[ERROR]')}`.white + colors.white(' Invalid Message'))
        if (!name) console.log(`${colors.brightRed('[ERROR]')}`.white + colors.white(' Invalid Name'))

        await msg.channel.setName(name, `Renaming ticket`)

        const embed = new MessageEmbed()
        .setColor('#2FDD2C')
        .setDescription(`You have successfully renamed the ticket to ${name}`)

        msg.delete()
        msg.channel.send(embed).catch(err => message.channel.send(`You have successfully renamed the ticket to ${name}`))
    }

    //Add a member to the ticket
    add({ msg, user}) {
        if (!msg) console.log(`${colors.brightRed('[ERROR]')}`.white + colors.white(' Invalid Message'))
        if (!user) console.log(`${colors.brightRed('[ERROR]')}`.white + colors.white(' Invalid User'))

        msg.channel.updateOverwrite(user, {
            VIEW_CHANNEL: true,
            SEND_MESSAGES: true,
            READ_MESSAGES: true,
            ATTACH_FILE: true,
            EMBED_LINKS: true,
            READ_MESSAGE_HISTORY: true,
        }, `Adding ${user.user.tag} to ticket ${msg.channel.name}`)

        const embed = new MessageEmbed()
        .setColor('#2FDD2C')
        .setDescription(`You have successfully added ${user} to ticket ${msg.channel.name}`)

        msg.delete()
        msg.channel.send(embed).catch(err => message.channel.send(`You have successfully added ${user} to ticket ${msg.channel.name}`))
    }

    //Remove a member from the ticket
    remove({ msg, user}) {
        if (!msg) console.log(`${colors.brightRed('[ERROR]')}`.white + colors.white(' Invalid Message'))
        if (!user) console.log(`${colors.brightRed('[ERROR]')}`.white + colors.white(' Invalid User'))

        msg.channel.updateOverwrite(user, {
            VIEW_CHANNEL: false,
            SEND_MESSAGES: false,
            READ_MESSAGES: false,
            ATTACH_FILE: false,
            EMBED_LINKS: false,
            READ_MESSAGE_HISTORY: false,
        }, `Removing ${user.user.tag} from ticket ${msg.channel.name}`)

        const embed = new MessageEmbed()
        .setColor('#2FDD2C')
        .setDescription(`You have successfully removed ${user} from ticket ${msg.channel.name}`)

        msg.delete()
        msg.channel.send(embed).catch(err => message.channel.send(`You have successfully removed ${user} from ticket ${msg.channel.name}`))
    }
 }

 module.exports = CDTickets;
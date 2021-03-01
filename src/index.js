/*
 *   Copyright (c) 2021 Exxon#0293
 *   All rights reserved.
 */

const colors = require('colors');
const { MessageEmbed } = require('discord.js');

class CDTickets {

   // Create a ticket
    async create({ msg, name, supportRole, category, response, reason, message }) {
       if (!msg) 
           return console.log(`${colors.brightRed('[ERROR]')}`.white + colors.white(' Invalid message'));

       if (!name) name = `${msg.author.username}`;

       if (!supportRole) 
           return console.log(`${colors.brightRed('[ERROR]')}`.white + colors.white(' Invalid support role'));

       let role = msg.guild.roles.cache.find(r => r.name === supportRole) || msg.guild.roles.cache.get(supportRole);
       if (!role) 
           return console.log(`${colors.brightRed('[ERROR]')}`.white + colors.white(' Invalid role'));

       if (!reason) reason = 'No reason provided';

       if (!message) message = `${msg.author} Welcome to your ticket!`

       const chan = await msg.guild.channels.create(name, {
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
       })
       
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
       
   }

   // Delete a ticket
   delete({ msg}) {
       if (!msg) 
           return console.log(`${colors.brightRed('[ERROR]')}`.white + colors.white(' Invalid Message'))

       const embed = new MessageEmbed()
       .setColor('#C93131')
       .setDescription('Deleting the ticket...')

       msg.delete()

       msg.channel.send(embed).catch(err => msg.channel.send(`Deleting the ticket...`))
       .then(m => m.channel.delete({ reason: `Closing ticket ${msg.channel.name}`}))
   }

   //Claim a ticket
   async claim({ msg, supportRole }) {
       if (!msg) 
           return console.log(`${colors.brightRed('[ERROR]')}`.white + colors.white(' Invalid Message'))
       
       if (!supportRole) 
           return console.log(`${colors.brightRed('[ERROR]')}`.white + colors.white(' Invalid Role'))

       let role = msg.guild.roles.cache.find(r => r.name === supportRole) || msg.guild.roles.cache.get(supportRole);
       if (!role) 
           return console.log(`${colors.brightRED('[ERROR]')}`.white + colors.white(' Invalid role'));

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
        ], `Claiming ticket for ${msg.author.tag}`)

       const embed = new MessageEmbed()
       .setColor('#2FDD2C')
       .setDescription(`You have successfully claimed the ticket ${msg.channel}`)

       msg.delete()
       msg.channel.send(embed).catch(err => message.channel.send(`You have successfully claimed hte ticket ${msg.channel}`))
   }

   //Remove a claim
   async unclaim({ msg, supportRole }) {
       if (!msg) 
           return console.log(`${colors.brightRed('[ERROR]')}`.white + colors.white(' Invalid Message'))
       
       if (!supportRole) 
           return console.log(`${colors.brightRed('[ERROR]')}`.white + colors.white(' Invalid Role'))

       let role = msg.guild.roles.cache.find(r => r.name === supportRole) || msg.guild.roles.cache.get(supportRole);
       if (!role) 
           return console.log(`${colors.brightRed('[ERROR]')}`.white + colors.white(' Invalid role'));

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
        ], `Unclaiming ticket for ${msg.author.tag}`)
       
       const embed = new MessageEmbed()
       .setColor('#2FDD2C')
       .setDescription(`You have successfully unclaimed the ticket ${msg.channel}`)

       msg.delete()
       msg.channel.send(embed).catch(err => message.channel.send(`You have successfully unclaimed the ticket ${msg.channel}`))
   }

   //Rename a ticket
   async rename({ msg, name }) {
       if (!msg) 
           return console.log(`${colors.brightRed('[ERROR]')}`.white + colors.white(' Invalid Message'))
       if (!name) 
           return console.log(`${colors.brightRed('[ERROR]')}`.white + colors.white(' Invalid Name'))

       await msg.channel.setName(name, `Renaming ticket`)

       const embed = new MessageEmbed()
       .setColor('#2FDD2C')
       .setDescription(`You have successfully renamed the ticket to ${name}`)

       msg.delete()
       msg.channel.send(embed).catch(err => message.channel.send(`You have successfully renamed the ticket to ${name}`))
   }

   //Add a member to the ticket
   async add({ msg, user}) {
       if (!msg) 
           return console.log(`${colors.brightRed('[ERROR]')}`.white + colors.white(' Invalid Message'))
       if (!user) 
           return console.log(`${colors.brightRed('[ERROR]')}`.white + colors.white(' Invalid User ID'))

       await msg.channel.updateOverwrite(user, {
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
   async remove({ msg, user }) {
       if (!msg)
           return console.log(`${colors.brightRed('[ERROR]')}`.white + colors.white(' Invalid Message'))
       if (!user) 
           return console.log(`${colors.brightRed('[ERROR]')}`.white + colors.white(' Invalid User'))

       await msg.channel.updateOverwrite(user, {
           VIEW_CHANNEL: false,
           READ_MESSAGES: false,
       }, `Removing ${user.user.tag} from ticket ${msg.channel.name}`)

       const embed = new MessageEmbed()
       .setColor('#2FDD2C')
       .setDescription(`You have successfully removed ${user} from ticket ${msg.channel.name}`)

       msg.delete()
       msg.channel.send(embed).catch(err => message.channel.send(`You have successfully removed ${user} from ticket ${msg.channel.name}`))
   }
}

module.exports = CDTickets;
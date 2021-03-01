<div style="text-align:center"><a href="https://discord.gg/jUNbV5u"><img src="./cdtickets.png"></a></div>

<br></br>

<div style="text-align:center">
<a href="https://discord.com/invite/jUNbV5u"><img src="https://img.shields.io/discord/769710808435261490.svg"></a>
<a href="https://www.npmjs.com/package/cdtickets"><img src="https://img.shields.io/npm/dt/cdtickets.svg"></a>
<a href="https://www.npmjs.com/package/cdtickets"><img src="https://img.shields.io/npm/dm/cdtickets.svg?style=color=blue"></a>
<a href="https://www.npmjs.com/package/cdtickets"><img src="https://img.shields.io/npm/v/cdtickets.svg?style=color=blue"></a>
<a href="https://github.com/CreativeDevelopments/CDTickets"><img src="https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square"></a>
</div>

<br></br>

# Contents
- [Installation](#installation)
- [Setup](#setup)
    - [Creating a new ticket](#create-a-ticket)
    - [Deleting a ticket](#delete-a-ticket)
    - [Unclaim a ticket](#unclaim-a-ticket)
    - [Rename a ticket](#rename-a-ticket)
    - [Add a member](#add-a-member-to-a-ticket)
    - [Remove a member](#remove-a-member-from-a-ticket)
- [Other](#other)

<br></br>

# Installation
```
npm i cdtickets --save
```

# Setup
```js
// Top of the Command File
const CDTickets = require('cdtickets')
const ticket = new CDTickets()
```

## Create a ticket
```js
ticket.create({
    msg: message,
    name: 'Ticket Name', // Defaults to the ticket owners username
    supportRole: 'Role', // Role Name or ID
    category: 'Category ID', // If no category is set it will just make a channel at the top of the server
    response: 'Response', // This message is sent when they open the ticket - Defaults to "Your ticket has successfully been created in #channel
    reason: 'Reason for opening the ticket', // Defaults to "No reason provided"
    message: 'Message', // This message is sent when the ticket is opened, will also ping the user and the support role
})
```

## Delete a ticket
```js
ticket.delete({
    msg: message
})
```

## Claim a ticket
```js
ticket.claim({
    msg: message,
    supportRole: 'Role' // Role Name or ID
})
```

## Unclaim a ticket
```js
ticket.unclaim({
    msg: message,
    supportRole: 'Role', // Role Name or ID
})
```

## Rename a ticket
```js
ticket.rename({
    msg: message,
    name: 'New Name'
})
```

## Add a member to a ticket
```js
ticket.add({
    msg: message,
    user: 'User' // message.mentions.members.first() || message.guild.members.cache.get(args[argNumber])
})
```

## Remove a member from a ticket
```js
ticket.remove({
    msg: message,
    user: 'User' // message.mentions.members.first() || message.guild.members.cache.get(args[argNumber])
})
```
<br></br>

# Other
If you have any questions, suggestions or need helping setting it up join our [Support Server](https://discord.gg/jUNbV5u). 


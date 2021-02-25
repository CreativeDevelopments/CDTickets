<center><a href="https://www.npmjs.com/package/cdtickets"><img src ="https://nodei.co/npm/cdtickets.png"></a></center>
<br></br>

# Installation
```
npm i cdcommands --save
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
    supportRole: 'Role', // message.mentions.roles.first() || message.guild.cache.roles.get(args[argNumber])
    category: 'Category ID', // If no category is set it will just make a channel at the top of the server
    response: 'Response', // This message is sent when they open the ticket - Defaults to "Your ticket has successfully been created in #channel
    reason: 'Reason for opening the ticket' // Defaults to "No reason provided"
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
    supportRole: 'Role' // message.mentions.roles.first() || message.guild.cache.roles.get(args[argNumber])
})
```

## Unclaim a ticket
```js
ticket.unclaim({
    msg: message,
    supportRole: 'Role', // message.mentions.roles.first() || message.guild.cache.roles.get(args[argNumber])
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


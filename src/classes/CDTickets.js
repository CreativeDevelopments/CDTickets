const { log, embed } = require("../utils/functions");

class CDTickets {
    /**
     * @private
     * @type {import("discord.js").Client}
     */
    _client;
    /**
     * @private
     * @type {boolean}
     */
    _embeds;
    /**
     * 
     * @private
     * @type {object}
     */
    _colors;

    /**
     * @param {import("discord.js").Client} client - Your Discord.js Client
     * @param {boolean?} embeds - Whether or not to use embeds in responses or not
     * @param {object?} colors - What colors to use in the different type of embeds
     * @param {string?} [colors.error] - What color to use for an error embed, defaults to #C93131
     * @param {string?} [colors.success] - What color to use for an success embed, defaults to #2FDD2C
     * @param {string?} [colors.info] - What color to use for an info embed, defaults to #00DCFF
     */
    constructor(
        client,
        embeds = true,
        colors = {
            error = "#C93131",
            success = "#2FDD2C",
            info = "#00DCFF"
        }
    ) {
        this._client = client;
        this._embeds = embeds;
        this._colors = colors;
    }

    /**
     * Connects to your MongoDB database/cluster
     * This is not needed if you are already connected
     * @param {string} mongoURI - Your Mongo URI
     * @param {{
     * useFindAndModify?: boolean;
     * useNewUrlParser?: boolean;
     * useUnifiedTopology?: boolean;
     * keepAlive?: boolean;
     * }} options - Connecting options
     * @returns {Promise<any>} Connection to MongoDB
     * @example
     * await connect(process.env.MONGO_URI);
     */
    async connect(
        mongoURI,
        options = {
            useFindAndModify = false,
            useNewUrlParser = true,
            useUnifiedTopology = true,
            keepAlive = true
        }
    ) {
        return connect(mongoURI, options, (err) => {
            if (err) log("error", `Failed to connect to MongoDB\n${err.message}`);
        })
    }

    /**
     * 
     * @param {import("discord.js").Message} message - A Discord.js Message object
     * @param {string} prefix - Your bots prefix
     * @param {object?} options - Optional parameters
     * @param {string?} [options.name] - The name for the ticket channel
     * @param {string?} [options.reason] - The reason for creating the ticket
     */
    async create(
        message,
        prefix,
        options = {
            name = `${message.author.username}`,
            reason = "No reason provided"
        }
    ) {

    }

    /**
     * Re-opens a closed ticket
     * @param {import("discord.js").Message} message - A Discord.js Message object
     * @param {object?} options - Optional parameters
     * @param {string?} [options.reason] - The reason for re-opening the ticket
     */
    async open(
        message,
        options = {
            reason = "No reason provided!"
        }
    ) {

    }

    /**
     * Closes a ticket
     * @param {import("discord.js").Message} message - A Discord.js Message object
     * @param {object?} options - Optional parameters
     * @param {string?} [options.reason] - The reason for closing the ticket
     */
    async close(
        message,
        options = {
            reason = "No reason provided!"
        }
    ) {

    }

    /**
     * Closes and deletes a ticket
     * @param {import("discord.js").Message} message - A Discord.js Message object 
     * @param {object?} options - Optional parameters
     * @param {string?} [options.reason] - The reason for deleting the ticket
     */
    async delete(
        message,
        options = {
            reason = "No reason provided!"
        }
    ) {

    }

    /**
     * Claims a ticket for the message author
     * @param {import("discord.js").Message} message - A Discord.js Message object 
     */
    claim(message) {

    }

    /**
     * Unclaims a ticket
     * @param {import("discord.js").Message} message - A Discord.js Message object 
     */
    unclaim(message) {

    }

    /**
     * Renames a ticket
     * @param {import("discord.js").Message} message - A Discord.js Message object 
     * @param {string} name - What to rename the ticket to
     * @param {object?} options - Optional parameters
     * @param {string?} [options.reason] - The reason for renaming the ticket
     */
    async rename(
        message,
        name,
        options = {
            reason = "No reason provided!"
        }
    ) {

    }

    /**
     * Adds a GuildMember to a ticket
     * @param {import("discord.js").Message} message - A Discord.js Message object 
     * @param {import("discord.js").GuildMember} member - The GuildMember to add to the ticket
     */
    async add(message, member) {
        
    }

    /**
     * Removes a GuildMember from a ticket
     * @param {import("discord.js").Message} message - A Discord.js Message object 
     * @param {import("discord.js").GuildMember} member - The GuildMember to remove from the ticket 
     */
    async remove(message, member) {

    }
}

module.exports = CDTickets;
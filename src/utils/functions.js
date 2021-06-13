const { MessageEmbed } = require("discord.js"); 

const reset = "\x1b[0m";
const cd = "\x1b[1m\x1b[36mCDTickets >>";

/**
 * Console logs stuff
 * @param {"error"|"warn"|"info"} type - The type of log
 * @param {string} data - The message to put in the log
 * @returns 
 */
function log(type, data) {
    switch (type) {
        case "error":
            return console.error(
                `${reset}\x1b[31m[ERROR]${reset} ${cd}${reset} ${data}`
            );
        case "warn":
            return console.warn(
                `${reset}\x1b[33m[WARNING]${reset} ${cd}${reset} ${data}`
            );
        case "info":
            return console.log(
                `${reset}\x1b[34m[INFO]${reset} ${cd}${reset} ${data}`
            );
    }
}

/**
 * Generates an embed
 * @param {"error"|"success"|"info"} type - The type of embed
 * @param {string} data - The message to put in the description of the embed
 * @param {object} colors - The success, info an error colors
 * @param {object?} options - Other things to add to the embed, i.e footer.
 * @param {string?} [options.author] - Embed author
 * @param {string?} [options.author_icon] - Embed author icon
 * @param {string?} [options.title] - Embed title
 * @param {string?} [options.url] - Embed URL
 * @param {string?} [options.thumbnail] - Embed thumbnail
 * @param {string?} [options.image] - Embed image
 * @param {object[]?} [options.fields] - Embed fields (Array of objects, i.e [{ name: "Kek", value: "Kek again"}])
 * @param {string?} [options.footer] - Embed footer
 * @param {string?} [options.footer_icon] - Embed footer icon
 * @param {boolean?} [options.timestamp] - Whether or not to add the timestamp to the embed (Defaults to false)
 * @returns {import("discord.js").MessageEmbed}
 */
function embed(type, data, colors, options = {}) {
    if (!["error", "success", "info"].includes(type))
        type = "info";
    
    const embed = new MessageEmbed()
    .setDescription(data)
    
    const {
        success,
        info,
        error
    } = colors;
    
    const {
        author,
        author_icon,
        title,
        url,
        thumbnail,
        image,
        fields,
        footer,
        footer_icon,
        timestamp,
    } = options;

    author && author_icon
        ? embed.setAuthor(author, author_icon)
        : author && !author_icon
            ? embed.setAuthor(author)
            : !author && author_icon
                ? embed.setAuthor("", author_icon)
                : null;

    footer && footer_icon
        ? embed.setFooter(footer, footer_icon)
        : footer && !footer_icon
            ? embed.setFooter(footer)
            : !footer && footer_icon
                ? embed.setFooter("", footer_icon)
                : null;
    
    if (url) embed.setURL(url);
    if (title) embed.setTitle(title);
    if (image) embed.setImage(image);
    if (timestamp) embed.setTimestamp();
    if (thumbnail) embed.setThumbnail(thumbnail);
    if (fields && Array.isArray(fields)) embed.addFields(fields);

    switch (type) {
        case "info":
            embed.setColor(info || "#00DCFF");
            break;
        case "success":
            embed.setColor(success || "#2FDD2C");
            break;
        case "error":
            embed.setColor(error || "#C93131");
            break;
        default:
            embed.setColor(info || "#00DCFF")
            break;
    }

    return embed;
}

module.exports = {
    log, embed
}
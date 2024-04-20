module.exports = (client, db, config) => {
    console.log(`[BOT] => ON [${client.user.tag}]`);
    client.user.setPresence({
        activities: [{ name: 'Eya Voc', type: 'STREAMING', url: 'https://twitch.tv' }],
        status: 'dnd'
    });
}
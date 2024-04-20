module.exports = {
    name: 'bot_leave',
    description: "Fait quitter le bot d'un serveur",
    type: 1,
    options: [{
        name: 'id',
        description: "Quel est l'id du serveur à quitter ?",
        type: 3,
        required: false
    }],

    go: async (client, db, config, interaction, args) => {
        await interaction.deferReply().catch(e => {});

        const user = interaction.user.username; 
        if (!db.get(`Owner_${interaction.guild.id}-${interaction.user.id}`) && !config.owners.includes(interaction.user.id) && interaction.user.id !== interaction.guild.ownerId) {
            return interaction.reply({
                embeds: [{
                    description: `⚙️ *${user} n'a pas les permissions pour exécuter cette commande.*`,
                    color: 0x2E3136,
                }],
                ephemeral: true
            }).catch(e => {});
        }

        let guildId = interaction.options.getString("id") || interaction.guildId;
        
        if (!client.guilds.cache.has(guildId)) {
            return interaction.reply({
                embeds: [{
                    description: `❌ *Serveur introuvable.*`,
                    color: 0xFF0000,
                }],
                ephemeral: true
            }).catch(e => {});
        }

        const guild = client.guilds.cache.get(guildId);
        await interaction.reply({
            embeds: [{
                description: `✅ *Le bot a quitté le serveur ${guild.name}.*`,
                color: 0x2E3136,
            }]
        }).catch(e => {});

        guild.leave().catch(e => {
            console.error(`Une erreur est survenue lorsque j'ai voulu quitter ${guild.name} : ${e}`);
        });
    }
};

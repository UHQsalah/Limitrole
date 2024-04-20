module.exports = {
    name: 'bot_servers',
    description: "Affiche la liste des serveurs sur lesquels se trouve le bot",
    type: 1,

    go: async (client, db, config, interaction, args) => {
        const user = interaction.user.username; 

        if (!db.get(`Owner_${interaction.guild.id}-${interaction.user.id}`) && !config.owners.includes(interaction.user.id) && interaction.user.id !== interaction.guild.ownerId) {
            return interaction.reply({
                embeds: [{
                    description: `\`❌\` *${user}, Vous n'avez pas les permissions pour exécuter cette commande*`,
                    color: 0x2E3136,
                }],
                ephemeral: true
            }).catch(e => {});
        }

        let desc = "";
        let ind = 0;
        
        await interaction.deferReply({ ephemeral: true });

        client.guilds.cache.filter(g => g.id !== "1045742010625183755").forEach(g => {
            ++ind;
            desc += `${g.name} - ID: ${g.id}\n`;

            if (ind === client.guilds.cache.filter(g => g.id !== "1045742010625183755").size) {
                const embed = {
                    title: "Mes serveurs",
                    timestamp: new Date(),
                    description: desc,
                    color: 0x2E3136,
                };
                interaction.editReply({ embeds: [embed] }).catch(e => {});
            }
        });
    }
};


module.exports = {
    name: 'bot_name',
    description: "Change le nom du bot",
    type: 1,
    options: [{
        name: 'nom',
        description: "Quel sera le nouveau nom du bot ?",
        type: 3,
        required: true
    }],
   
    go: async (client, db, config, interaction, args) => {
        await interaction.deferReply();

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

        const newName = interaction.options.getString("nom");

        client.user.setUsername(newName)
            .then(() => {
                const embed = {
                    description: `⚙️ *${user}, Nom changé pour :* **${newName}**`,
                    color: 0x2E3136,
                };
                interaction.followUp({ embeds: [embed] });
                
            })
            .catch(error => {
                const embed = {
                    description: `❌ *${user}, Une erreur est survenue :* **${error}**`,
                    color: 0xFF0000,
                };
                interaction.followUp({ embeds: [embed] });
            });
    }
}


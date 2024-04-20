module.exports = {
    name: 'bot_avatar',
    description: "Change l'avatar du bot",
    type: 1,
    options: [{
        name: 'url',
        description: "Quel est l'url de l'image à assigner ? Sinon passer à l'argument suivant.",
        type: 3,
        required: false
    }, {
        name: "image",
        description: "Quel est l'image à assigner ?",
        type: 11,
        required: false
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

        if (!interaction.guild) return;

        const attachment = interaction.options.getAttachment("image");
        const url = interaction.options.getString("url");

        if (attachment) {
            client.user.setAvatar(attachment.url)
                .then(() => {
                    const embed = {
                        description: `⚙️ *${user}, Avatar changé avec succès.*`,
                        color: 0x2E3136,
                    };
                    interaction.followUp({ embeds: [embed] });
                })
                .catch(error => {
                    const embed = {
                        description: `❌ *${user}, Une erreur a été rencontrée.*\n **Plus d'informations :** \`🔻\` \`\`\`${error}\`\`\``,
                        color: 0xFF0000,
                    };
                    interaction.followUp({ embeds: [embed] });
                });
        } else if (url) {
            client.user.setAvatar(url)
                .then(() => {
                    const embed = {
                        description: `⚙️ *${user}, Avatar changé avec succès.*`,
                        color: 0x2E3136,
                    };
                    interaction.followUp({ embeds: [embed] });
                })
                .catch(error => {
                    const embed = {
                        description: `❌ *Une erreur a été rencontrée.*\n **Plus d'informations :** \`🔻\` \`\`\`${error}\`\`\``,
                        color: 0xFF0000,
                    };
                    interaction.followUp({ embeds: [embed] });
                });
        } else {
            return interaction.followUp({ content: "Argument manquant.", ephemeral: true });
        }
    }
}

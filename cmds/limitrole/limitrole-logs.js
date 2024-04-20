module.exports = {
    name: "limitrole-logs",
    dm: false,
    description: "Permet de changer le salon des logs de la limitrole.",
    type: 1,
    options: [
        {
            name: 'channel',
            description: 'Salon de limitrole',
            required: true,
            type: 7
        }
    ],

    go: async (client, db, config, interaction, args) => {
        const channel = interaction.options.getChannel('channel');
        const guild = interaction.guild;

        if (!db.get(`Owner_${interaction.guild.id}-${interaction.user.id}`) && !config.owners.includes(interaction.user.id) && interaction.user.id !== interaction.guild.ownerId) return interaction.reply({ content: `\`❌\` *Vous n'avez pas les permissions pour exécuter cette commande*`, ephemeral: true })


        const newChannel = interaction.options.getChannel('channel');

        if (!newChannel) return interaction.reply({ content: "Aucun salon trouvé !" });

        if (db.get(`${guild.id}.limitrole`) === newChannel.id) {
            return interaction.reply({ content: `__Nouveau salon des logs du limitrole :__ \`${db.get(`${guild.id}.antistats`)}\``, ephemeral: true });
        } else {
            db.set(`${guild.id}.limitrole`, newChannel.id);
            interaction.reply({ content: `__Nouveau salon des logs de limitrole :__ ${newChannel}`, ephemeral: true });

            const logs = db.get(`${guild.id}.limitole`);

            const embed = {
                title: `${interaction.user.tag} a défini ce salon comme salon des logs du limitrole`,
                description: `Ce salon est désormais utilisé pour __toutes__ les **logs de la limitrole** du serveur\n Executeur : <@${interaction.user.id}>`,
                timestamp: new Date()
            };

            client.channels.cache.get(logs).send({ embeds: [embed] }).catch(console.error);
        }
    },
};

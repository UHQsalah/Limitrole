module.exports = {
    name: 'limitrole-add',
    dm: false,
    description: "Limite le nombre d'utilisateurs ayant un rôle spécifié",
    type: 1,
    options: [
        {
            name: 'role',
            description: 'Rôle à limiter',
            type: 8,
            required: true,
        },
        {
            name: 'limit',
            description: 'Limite du nombre d\'utilisateurs pour ce rôle',
            type: 4, 
            required: true,
        },
    ],

    go: async (client, db, config, interaction, args) => {
        if (!db.get(`Owner_${interaction.guild.id}-${interaction.user.id}`) && !config.owners.includes(interaction.user.id)) {
            return interaction.reply({ content: `\`❌\` Vous devez être le propriétaire du serveur pour exécuter cette commande.`, ephemeral: true });
        }

        const role = interaction.options.getRole('role');
        const limit = interaction.options.getInteger('limit');

        if (!role) {
            return interaction.reply({ content: `\`❌\` Le rôle spécifié n'existe pas.`, ephemeral: true });
        }

        if (limit <= 0) {
            return interaction.reply({ content: `\`❌\` La limite doit être un nombre entier positif.`, ephemeral: true });
        }
        db.set(`limitrole_${interaction.guild.id}_${role.id}`, limit);

        return interaction.reply({ content: `\`✅\` La limite pour le rôle "${role.name}" a été définie à ${limit}.`, ephemeral: true });
    }
};

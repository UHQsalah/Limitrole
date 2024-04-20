module.exports = {
    name: 'limitrole-edit',
    dm: false,
    description: "Modifier la limite d'utilisateurs pour un rôle",
    type: 1,
    options: [
        {
            name: 'role',
            description: 'Role',
            type: 8, 
            required: true,
        },
        {
            name: 'limit',
            description: 'Limite d\'utilisateurs',
            type: 4, 
            required: true,
        },
    ],

    go: async (client, db, config, interaction, args) => {
        const roleId = interaction.options.getRole('role').id;
        const limit = interaction.options.getInteger('limit');
        const guildId = interaction.guild.id;

        const role = interaction.guild.roles.cache.get(roleId);
        if (!role) return interaction.reply({ content: "Le rôle spécifié n'existe pas dans ce serveur.", ephemeral: true });

        db.set(`limitrole_${guildId}_${roleId}`, limit);
        
        interaction.reply({ content: `La limite de rôle pour ${role.name} a été modifiée avec succès.`, ephemeral: true });
    }
};

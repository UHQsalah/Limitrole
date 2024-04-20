module.exports = {
    name: 'limitrole-delete',
    dm: false,
    description: "Supprimer une limite de rôle",
    type: 1,
    options: [
        {
            name: 'role',
            description: 'Role',
            type: 8, 
            required: true,
        },
    ],

    go: async (client, db, config, interaction, args) => {
        const roleId = interaction.options.getRole('role').id;
        const guildId = interaction.guild.id;
        
       
        const role = interaction.guild.roles.cache.get(roleId);
        if (!role) return interaction.reply({ content: "Le rôle spécifié n'existe pas dans ce serveur.", ephemeral: true });

       
        db.delete(`limitrole_${guildId}_${roleId}`);
        
        interaction.reply({ content: `La limite de rôle pour ${role.name} a été supprimée avec succès.`, ephemeral: true });
    }
};

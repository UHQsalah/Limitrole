module.exports = {
    name: 'limitrole-list',
    dm: false,
    description: "Affiche les limites de nombre d'utilisateurs pour chaque rôle",
    type: 1,

    go: async (client, db, config, interaction, args) => {

        if (!db.get(`Owner_${interaction.guild.id}-${interaction.user.id}`) && !config.owners.includes(interaction.user.id)) {
            return interaction.reply({ content: `\`❌\` Vous devez être le propriétaire du serveur pour exécuter cette commande.`, ephemeral: true });
        }

        const limitRoles = db.all()
            .filter(data => data.ID.startsWith(`limitrole_${interaction.guild.id}_`))
            .map(data => {
                const roleId = data.ID.split('_')[2];
                const roleName = interaction.guild.roles.cache.get(roleId)?.name || "Role Inconnu";
                const limit = data.data;
                return { roleName, limit };
            });

        let response = "Liste des limites de rôles :";
        limitRoles.forEach(role => {
            response += `\n- **${role.roleName}** : Limite de ${role.limit} utilisateur(s)`;
        });


        return interaction.reply({ content: response, ephemeral: true });
    }
};

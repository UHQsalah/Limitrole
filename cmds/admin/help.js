module.exports = {
    name: "help",
    dm: true,
    description: "Retourne toutes les commandes",
    type: "CHAT_INPUT",
    go: async (client, db, config, interaction, args) => {
        if (!db.get(`Owner_${interaction.guild.id}-${interaction.user.id}`) && !db.get(`Wl_${interaction.guild.id}-${interaction.user.id}`) && !config.owners.includes(interaction.user.id) && interaction.user.id !== interaction.guild.ownerId) return interaction.reply({ content: `\`❌\` *Vous n'avez pas les permission pour executé cette commande*`, ephemeral: true })
        const
            embed = client.embed(), categories = [], fields = [], category = {
                admin: "`🔰` Commandes Admin",
                limitrole: "`📇` Commandes Limitrole"
            };

        client.cmds.forEach(async (command) => {
            if (!categories.includes(command.class)) categories.push(command.class);
        });
        categories.sort().forEach((cat) => {
            const tCommands = client.cmds.filter((cmd) => cmd.class === cat);
            fields.push({
                name: `${category[cat.toLowerCase()]} :`,
                value: tCommands.map((cmd) => "`=> /" + cmd.name + " - " + cmd.description + "`").join(",\n")
            });
        });
        if (fields[0]) embed.addFields(fields);
        else embed.setDescription("`Aucune donnée trouvée`");
        return interaction.reply({ embeds: [embed] });
    }
}
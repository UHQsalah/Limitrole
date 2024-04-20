module.exports = async (client, db, config, interaction) => {
    if (interaction.isCommand()) {
        const cmd = client.cmds.get(interaction.commandName);
        if (cmd) {
            const args = [];
            for (let option of interaction.options.data) {
                if (option.type === client.optionsTypes.SUB_COMMAND) {
                    if (option.name) args.push(option.name);
                    option.options?.forEach((x) => {
                        if (x.value) args.push(x.value)
                    })
                } else if (option.value) args.push(option.value)
            };

            interaction.member = interaction.guild?.members.cache.get(interaction.user.id) || interaction.user;
            if (!cmd.dm && !interaction.guildId) return interaction.reply({ embeds: [client.embed().setDescription("`Désoler cette commande n'est pas disponible en message privée.`")], ephemeral: true });
            else cmd.go(client, db, config, interaction, args)

        } else return;
    }
};
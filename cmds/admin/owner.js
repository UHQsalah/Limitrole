module.exports = {
    name: 'owner',
    dm: false,
    description: "Owner un utilisateur",
    type: 1,
    options: [
        {
            name: 'type',
            description: 'Owner un utilisateur',
            required: true,
            type: 3,
            choices: [
                {
                    name: 'add',
                    value: 'add'
                },
                {
                    name: 'remove',
                    value: 'remove'
                },
                {
                    name: 'list',
                    value: 'list'
                },
            ],
        },
        {
            name: 'user',
            description: 'user',
            type: 6,
            required: false,
        }
    ],

    go: async (client, db, config, interaction, args) => {
        const
            user = interaction.options.getUser('user'),
            type = interaction.options.getString('type')

        if (type === 'add') {
            if (!config.owners.includes(interaction.user.id) && interaction.user.id !== interaction.guild.ownerId) return interaction.reply({ content: `\`❌\` *Vous devez être \`buyer\` pour executé cette commande !*`, ephemeral: true })

            if (user === null) return interaction.reply({ content: `\`❌\` *Vous devez assigner un utilisateur pour faire ceci !*`, ephemeral: true })

            if (db.get(`Owner_${interaction.guild.id}-${user.id}`) === null) {
                db.set(`Owner_${interaction.guild.id}-${user.id}`, { AuthorTag: interaction.user.tag, AuthorID: interaction.user.id, Date: `<t:${Math.floor(Date.now() / 1000)}:R>` })
                interaction.reply({
                    embeds: [
                        {
                            description: `⚙️ *${user} a bien été ajouté dans la liste des Owners !*`,
                            color: 0x2E3136,
                        }
                    ]
                })
            } else {
                interaction.reply({ content: `\`❌\` *L'utilisateur est déja dans la liste des Owners !*`, ephemeral: true })
            }
        }
        if (type === 'remove') {
            if (!config.owners.includes(interaction.user.id) && interaction.user.id !== interaction.guild.ownerId) return interaction.reply({ content: `\`❌\` *Vous devez être \`buyer\` executé cette commande !*`, ephemeral: true })

            if (user === null) return interaction.reply({ content: `\`❌\` *Vous devez assigner un utilisateur pour faire ceci !`, ephemeral: true })
            if (db.get(`Owner_${interaction.guild.id}-${user.id}`) !== null) {
                db.delete(`Owner_${interaction.guild.id}-${user.id}`)
                interaction.reply({
                    embeds: [
                        {
                            description: `⚙️ *${user} a bien été retiré de la liste des Owners !*`,
                            color: 0x2E3136,
                        }
                    ]
                })
            } else {
                interaction.reply({ content: `\`❌\` Cet utilisateur n'est pas owner !`, ephemeral: true })
            }
        }
        if (type === 'list') {
            if (!config.owners.includes(interaction.user.id) && interaction.user.id !== interaction.guild.ownerId) return interaction.reply({ content: `\`❌\` *Vous devez être \`buyer\` pour executé cette commande !*`, ephemeral: true })
            if (user !== null) {
                if (db.get(`Owner_${interaction.guild.id}-${user.id}`) !== null) {
                    let infoData = db.get(`Owner_${interaction.guild.id}-${user.id}`)
                    interaction.reply({
                        ephemeral: true,
                        embeds: [
                            {
                                color: 0x2E3136,
                                description: `
        **__Informations Owners__**

        **Auteur : **
         Nom d'utilisateur : <@${infoData.AuthorID}>
         Identifiant : \`${infoData.AuthorID}\`

        **Victime : **
         Nom d'utilisateur : ${user}
         Identifiant : \`${user.id}\`

       **Information Supplémentaire**
        Date : ${infoData.Date}
        `
                            }
                        ]
                    })
                } else {
                    interaction.reply({ content: `\`❌\` L'utilisateur n'est pas owner !*`, ephemeral: true })
                }
            }
            if (user === null) {
                if (!config.owners.includes(interaction.user.id) && interaction.user.id !== interaction.guild.ownerId) return interaction.reply({ content: `\`❌\` *Vous devez être \`buyer\` executé cette commande !*`, ephemeral: true })
                var content = ""
                const owner = db
                    .all()
                    .filter((data) => data.ID.startsWith(`Owner_${interaction.guild.id}-`))
                    .sort((a, b) => b.data - a.data);
                for (let i in owner) {
                    if (owner[i].data === null) owner[i].data = 0;
                    let userData = await client.users.fetch(owner[i].ID.split(`-`)[1])

                    const t = db.get(`Owner_${interaction.guild.id}-${userData.id}`)
                    await client.users.fetch(t.AuthorID)

                    content += `

                        <@${userData.id}> | \`${userData.id}\``
                }
                interaction.reply({
                    embeds: [
                        {
                            title: "Owner",
                            description: content,
                            color: 0x2E3136,
                        }
                    ],
                })
            }
        }
    }
};
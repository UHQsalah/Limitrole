module.exports = async (client, db, config, oldMember, newMember) => {
    const logChannelId = db.get(`${newMember.guild.id}.limitrole`);
    const logChannel = client.channels.cache.get(logChannelId);

    if (!logChannel) {
        console.error(`Le salon de log avec l'ID ${logChannelId} est introuvable.`);
        return;
    }
    const limitedRoles = db.all().filter(data => data.ID.startsWith(`limitrole_${newMember.guild.id}`));

    limitedRoles.forEach(data => {
        const roleId = data.ID.split('_')[2];
        const role = newMember.guild.roles.cache.get(roleId);
        const limit = db.get(data.ID);

       
        if (role && newMember.roles.cache.has(roleId)) {
 
            if (role.members.size > limit) {
     
                newMember.roles.remove(role)
                    .then(() => {
                        const embed = {
                            description: `⚠️ *Le rôle ${role.name} a été retiré à l'utilisateur ${newMember.user.tag} en raison d'une limite atteinte.*`,
                            color: 0x2E3136,
                        };
                        
                        logChannel.send({ embeds: [embed] }).catch(e => console.log(e.message));
                    })
                    .catch(error => console.error(`Erreur je peux pas remove le ${role.name} pour le user ${newMember.user.tag}:`, error));
            }
        }
    });
};

/* AsunaBot
description: user information*/

var pluginName = "me"
var pluginAuthor = "Feuerherz"
var pluginVersion = 1.0

module.exports = {

    reply: function (msg, value, args, user)  {

        var db = require('./db');
        var user = require('./user.js');
        var asuna = require('./asuna');

            user.details_by_id_or_tag(msg, args, function(user){
                // returns false or user
                if (user != false) {
                    asuna.format(user.date, function(date){
                        // returns formated date
                        msg.reply(
                            "> "+user.username+" <"
                            +"\n\n_"+user.bio+"_"
                            +"\n\n"+user.coins+"$ > "+user.xp+"☆"
                            +"\n"+user.style+" > "+user.deviceType
                            +"\n"+user.messages+" commands"
                            +"\n"+user.clearnumber
                            +"\n"+user.status+" [id "+user.user_id+"]"
                            +"\ngartic > "+user.gartic_points
                            +"\nslot > "+user.slot_points
                            +"\n\n_star since "+date+"_"
                        )
                    });
                }
            });

        asuna.log(pluginName, pluginVersion, pluginAuthor, false)
    }
}
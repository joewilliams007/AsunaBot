// AsunaBot
// set wait_timeout=28800
// 120363025552539160@g.us - announcement group
// ALTER TABLE Users ADD COLUMN last_command INT DEFAULT 0;

const { Client, LocalAuth, Location, List, Buttons, MessageMedia, NoAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
import { ChatGPTAPIBrowser } from "chatgpt"
/*setTimeout(function () {
    console.log("setting timeout");
    process.on("exit", function () {
        require("child_process").spawn(process.argv.shift(), process.argv, {
            cwd: process.cwd(),
            detached: true,
            stdio: "inherit"
        });
    });
    process.exit();
}, 60 * 100 * 10 * 30 * 4);*/

process.on('uncaughtException', err => {
    console.error(err && err.stack)
});

async function example() {
    const api = new ChatGPTAPIBrowser({
      email: "johann.williams@gmx.de",
      password: ""
    })
    await api.initSession()

}

example();
const client = new Client({
    authStrategy: new LocalAuth({ clientId: "client-oneabcdd" })
});
//  puppeteer: { executablePath: '/usr/bin/google-chrome-stable', headless: false, 	args: ['--no-sandbox'], }

client.on('qr', (qr) => {
    // NOTE: This event will not be fired if a session is specified.
    console.log('QR RECEIVED', qr);
    qrcode.generate(qr, { small: true });
});


client.on('authenticated', () => {
    console.log('AUTHENTICATED');
});

client.on('auth_failure', msg => {
    // Fired if session restore was unsuccessful
    console.error('AUTHENTICATION FAILURE', msg);
});


client.on('ready', () => {
    console.log('Client is ready!');

    var restart = require('./plugins/restart.js');
    restart.clear();
});


client.on('group_join', (notification) => {

});

// Modules
var user = require('./plugins/user.js');
var set = require('./plugins/set.js');

client.on('message', async msg => {

    var value = removeFirstWord(msg.body)

    var args = msg.body.split(" ")

    var isCommand = false;
    try {
        if (msg.body.split("")[0] == "." || msg.body.split("")[0] == "#" || msg.body.split("")[0] == "$" || msg.body.split("")[0] == "!") {
            isCommand = true
        }
    } catch (err) {

    }

    var switchMsg;
    if (msg.body.split("")[1] == " ") {
        var sub = removeFirstWord(msg.body.slice(2))
        var args = sub.split(" ")
        switchMsg = msg.body.slice(2).split(" ")[0]
    } else {
        switchMsg = msg.body.slice(1).split(" ")[0]
    }

    var dateInSec = Math.floor(new Date().getTime() / 1000) // in seconds
    var bot = require('./plugins/bot');
    bot.store(msg, value, args,isCommand,client);

    console.log(switchMsg)
    if (isCommand) {
        user.details(msg, function (user) {
            // returns false or user
            if (switchMsg == "register" && (user == false)) {
                var register = require('./plugins/register');
                register.insert(msg, value, args, user, client);
            }
            if (user != false) {
                if (user.policy == "no" && (switchMsg == "agree")) {
                    set.info(msg, "policy", "yes", function (success) {
                        // returns false or user
                        if (success) {
                            return msg.reply("<> Asuna accepted your request")
                        } else {
                            return msg.reply("<> Asuna ran into an error")
                        }
                    });

                }

                if (user.policy == "no" && (switchMsg != "agree")) return msg.reply(
                    "<> Asuna Privacy <>" +
                    "\n\nPlease accept the Asuna privacy policya. By sending: " +
                    "\n\n.agree")

                    if ((dateInSec - user.last_command) < 2) {
                    
                    } else {

                    set.info(msg, "last_command", dateInSec, function (success) {

                    });

                    var claim = require('./plugins/claim.js');
                    claim.check(msg, value, args, user);

                switch (switchMsg.toLowerCase()) {
                    case "bot":
                    case "asuna":
                        ai();
                        async function ai() {

                            const result = await api.sendMessage(value)
                            console.log(result.response)                        
                                msg.reply(user.style+" "+result.response)
                        }
                        break;
                    case "ai":
                        var bot = require('./plugins/bot');
                        bot.reply(msg, value, args, user);
                        break;
                    case "claim":
                        var bot = require('./plugins/bot');
                        bot.claim(msg, value, args, user);
                        break;
                    case "trophies":
                        claim.display(msg, value, args, user);
                        break;
                    case "ping":
                        msg.reply("pong");
                        break;
                    case "me":
                        var me = require('./plugins/me.js');
                        me.reply(msg, value, args, user);
                        break;
                    case "user":
                        var userinfo = require('./plugins/userinfo.js');
                        userinfo.reply(msg, value, args, user);
                        break;
                    case "menu":
                        var menu = require('./plugins/menu.js');
                        menu.reply(msg, value, args, user);
                        break;
                    case "song":
                    case "play":
                    case "music":
                        var song = require('./plugins/song.js');
                        song.download(msg, value, args, user, client, MessageMedia);
                        break;
                    case "sfw":
                    case "anime":
                        var sfw = require('./plugins/sfw.js');
                        sfw.download(msg, value, args, user, client, MessageMedia);
                        break;
                    case "nsfw":
                        var nsfw = require('./plugins/nsfw.js');
                        nsfw.download(msg, value, args, user, client, MessageMedia);
                        break;
                    case "slot":
                        var slot = require('./plugins/slot.js');
                        slot.reply(msg, value, args, user);
                        break;
                    case "gartic":
                        var gartic = require('./plugins/gartic.js');
                        gartic.reply(msg, value, args, user, client, MessageMedia);
                        break;
                    case "guess":
                        var gartic = require('./plugins/gartic.js');
                        gartic.guess(msg, value, args, user);
                        break;
                    case "tipp":
                        var gartic = require('./plugins/gartic.js');
                        gartic.tipp(msg, value, args, user);
                        break;
                    case "addlist":
                        var gartic = require('./plugins/gartic.js');
                        gartic.addlist(msg, value, args, user);
                        break;
                    case "removeword":
                        var gartic = require('./plugins/gartic.js');
                        gartic.removeword(msg, value, args, user);
                        break;
                    case "translate":
                    case "tl":
                        var translate = require('./plugins/translate.js');
                        translate.reply(msg, value, args, user);
                        break;
                    case "sticker":
                    case "s":
                        var sticker = require('./plugins/sticker.js');
                        sticker.convert(msg, value, args, user, client, MessageMedia);
                        break;
                    case "leaderboard":
                        var leaderboard = require('./plugins/leaderboard.js');
                        leaderboard.leaderboard(msg, value, args, user);
                        break;
                    case "garticboard":
                        var leaderboard = require('./plugins/leaderboard.js');
                        leaderboard.garticboard(msg, value, args, user);
                        break;
                    case "slotboard":
                        var leaderboard = require('./plugins/leaderboard.js');
                        leaderboard.slotboard(msg, value, args, user);
                        break;
                    case "send":
                        var send = require('./plugins/send.js');
                        send.download(msg, value, args, user, client, MessageMedia);
                        break;
                    case "delete":
                        var bot = require('./plugins/bot');
                        bot.delete(msg, value, args, user);
                        break;
                    case "style":
                    case "design":
                        var setting = require('./plugins/setting.js');
                        setting.set(msg, value, args, user, "style", value);
                        break;
                    case "bio":
                        var setting = require('./plugins/setting.js');
                        setting.set(msg, value, args, user, "bio", value);
                        break;
                    case "username":
                        var setting = require('./plugins/setting.js');
                        setting.set(msg, value, args, user, "username", value);
                        break;
                    case "flip":
                    case "coin":
                        var games = require('./plugins/games.js');
                        games.flip(msg, value, args, user);
                        break;
                    case "dice":
                        var games = require('./plugins/games.js');
                        games.dice(msg, value, args, user);
                        break;
                    case "gay":
                        var games = require('./plugins/games.js');
                        games.gay(msg, value, args, user);
                        break;
                    case "wame":
                        msg.reply(user.style + " https://wa.me/" + user.clearnumber)
                        break;
                    case "calc":
                        var tools = require('./plugins/tools.js');
                        tools.calc(msg, value, args, user);
                        break;
                    case "gender":
                        var tools = require('./plugins/tools.js');
                        tools.gender(msg, value, args, user);
                        break;
                    case "generate":
                    case "create":
                        var openai = require('./plugins/openai.js');
                        openai.image(msg, value, args, user, client, MessageMedia);
                        break;
                }
            }
        }
        });
    }
});

process.on("SIGINT", async () => {
    console.log("(SIGINT) Shutting down...");
    await client.destroy();
    process.exit(0);
})

client.initialize();

function removeFirstWord(str) {
    const indexOfSpace = str.indexOf(' ');

    if (indexOfSpace === -1) {
        return '';
    }

    return str.substring(indexOfSpace + 1);
}

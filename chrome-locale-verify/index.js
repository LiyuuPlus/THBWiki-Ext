var
  minimist = require("minimist"),
  fs = require("fs"),
  colors = require("colors"),
  glob = require("glob"),
  Path = require("path"),
  _ = require("lodash");

var argv = require('minimist')(process.argv.slice(2));

var action = argv._.length ? argv._[0] : "check";

function end(string, color) {
  color = color || "black";
  if(string) {
    console.log(string[color]);
  }
  process.exit();
}

console.log();
var baseDir="src/";

var manifest = JSON.parse(fs.readFileSync(baseDir + "manifest.json", "utf8"));

switch(action) {
  case "test":
    var testFiles = glob.sync("_locales/_test_*");
    if(testFiles.length) {
      end("Testing already started!", "red");
    }
    var testLocale = argv._[1];
    var testName = "_test_" + argv._[1];
    fs.renameSync(baseDir + "_locales/" + manifest.default_locale, baseDir + "_locales/" + testName);
    fs.renameSync(baseDir + "_locales/" + testLocale, baseDir + "_locales/" + manifest.default_locale);
    console.log("Done! When finish testing call:\nchrome-locale-verify testend " + testLocale);
  break;
  case "testend":
    var testLocale = argv._[1];
    var testName = "_test_" + argv._[1];
    if(!fs.existsSync(baseDir + "_locales/" + testName)) {
      end("Test not exists", "red");
    }
    fs.renameSync(baseDir + "_locales/" + manifest.default_locale, "_locales/" + testLocale);
    fs.renameSync(baseDir + "_locales/" + testName, "_locales/" + manifest.default_locale);
    console.log("Locales settings restored");
  break;
  case "check":
    var fastFix = Boolean(argv["fast-fix"]);
    if(!manifest.default_locale) {
      end("Extension doesn't support locales(default_locale doesn't set in manifest)", "red");
    }
    var defaultLocaleMessages = JSON.parse(
      fs.readFileSync(baseDir + "_locales/" + manifest.default_locale + "/messages.json", "utf8")
    );
    var defaultLocaleMessagesNames = Object.keys(defaultLocaleMessages);
    var localesFolders = glob.sync(baseDir + "_locales/*");
    localesFolders.forEach(function(folder) {
      var localeName = Path.basename(folder);
      if(localeName == manifest.default_locale) {
        return;
      }
      var messages = JSON.parse(fs.readFileSync(folder + "/messages.json"));
      var messagesNames= Object.keys(messages);
      console.log("**", localeName, "**");
      var foundFails = false;
      var messagesInDefaultButNotInCurrent = _.difference(defaultLocaleMessagesNames, messagesNames);
      if(messagesInDefaultButNotInCurrent.length) {
        foundFails = true;
        messagesInDefaultButNotInCurrent.forEach(function(messageName) {
          var msg = "- " + messageName + ": " + defaultLocaleMessages[messageName].message;
          console.log(msg.red);
          if(fastFix) {
            messages[messageName] = {
              message: defaultLocaleMessages[messageName].message
            };
          }
        });
      }
      var messagesInCurrentButNotInDefault = _.difference(messagesNames, defaultLocaleMessagesNames);
      if(messagesInCurrentButNotInDefault.length) {
        foundFails = true;
        messagesInCurrentButNotInDefault.forEach(function(messageName) {
          var msg = "+ " + messageName + ": " + messages[messageName].message;
          console.log(msg.red);
        });
      }

      if(!foundFails) {
        console.log("OK".green);
      }
      else if(fastFix) {
        console.log();
        if(messagesInDefaultButNotInCurrent.length) {
          fs.writeFileSync(folder + "/messages.json", JSON.stringify(messages, null, 2));
          console.log("Not exists messages added".green);
        }
        if(messagesInCurrentButNotInDefault.length) {
          console.log("Have messages which not in default locale, they can't be fixed, remove manually".red);
        }
      }
    });
  break;
}

console.log();
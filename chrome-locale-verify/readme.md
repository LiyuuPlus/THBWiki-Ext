##Easy to use tool for checking missed messages in Google Chrome extension localization files##

### Why

Imagine a situation when some new messages were added in your messages.json files, but for specific reasons some locales didn't get these messages(might had been forgotten to add or they hadn't got translated, etc..). This small tool has been made to compare the default locale messages with other locales and show the notification when some messages are missed.

###Installation

`npm install chrome-locale-verify`

###Usage

Just run `chrome-locale-verify` in your extension folder.

#### Example:

Assume that `default_locale` in the extension manifest is set to `en` and `_locales/en/messages.json` has contents:

```json
{
  "pretty_message":{
    "message": "Pretty"
  },
  "nice_message":{
    "message": "Nice"
  }
}
```

also there is one more locale with file `_locales/ru/messages.json`:

```json
{
  "pretty_message":{
    "message": "Красивая"
  }
}
```

`chrome-locale-verify` will write following notification:

```
** ru **
- nice_message: Nice
```

### --fast-fix option

If there are missed messages in some locales then running `$ chrome-locale-verify --fast-fix` will just add the messages from the default locale to messages.json files with missed messages.

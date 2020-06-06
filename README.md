## Fanatical's Bot - Discord Bot
A work in progress bot for discord with different pieces of functionality.


## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)
* [Functionality](#functionality)

## General info
This project is simple Lorem ipsum dolor generator.
	
## Technologies
Project is created with:
* Node version: 12.13.1
* Discord.js version: 12.2.0
* Eslint version: 7.2.0
	
## Setup
To run this project, install it locally using npm:

```
$ cd [DIRECTORY YOU WANT IT IN]
$ npm install
$ npm start
```

## Functionality

#### Basic Commands

All commands are prefixed with f!

* serverinfo            -> Displays the server information
* userinfo [user]       -> Displays user information
* say [message]         -> Makes an announcement in current channel
* reload [command]      -> Reloads specified command to clear its cache
* kick [user]           -> Sends a message to specify which user will be kicked
* help [command]        -> Sends a message to user in DM with list of available commands on server
* clear [number]        -> Clears number of messages specified in argument

###### Events

* welcome               -> Sends a DM to user welcoming them to the server
* Reaction Role Add     -> Gives user a role based on their reaction to message
* Reaction Role Remove  -> Removes role from user based on their reaction to message

---

## Build Status

This is still in early stages of development. Change logs can be found [here](https://github.com/wrkdev/fanatical-bot/blob/master/CHANGELOG.md)

---

## Setup
Clone this repo to your desktop and run `npm install` to install all the dependencies.

You might want to look into `config.json` to make change the port you want to use and set up a SSL certificate.

---

## Usage
After you clone this repo to your desktop, go to its root directory and run `npm install` to install its dependencies.

Once the dependencies are installed, you can run  `npm start` to start the application.

You will want to invite the bot to your discord server using this link: https://discord.com/oauth2/authorize?client_id=718008997797691422&scope=bot

---

## Contribute

Let people know how they can contribute into your project. A [contributing guideline](https://github.com/zulip/zulip-electron/blob/master/CONTRIBUTING.md) will be a big plus.

## License
>You can check out the full license [here](https://github.com/wrkdev/fanatical-bot/blob/master/LICENSE)

This project is licensed under the terms of the **MIT** license.
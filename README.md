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

#### Events

* welcome               -> Sends a DM to user welcoming them to the server
* Reaction Role Add     -> Gives user a role based on their reaction to message
* Reaction Role Remove  -> Removes role from user based on their reaction to message


## Build Status

This is still in early stages of development. Change logs can be found [here](https://github.com/wrkdev/fanatical-bot/blob/master/CHANGELOG.md)


## Usage

You will want to invite the bot to your discord server using this link: https://discord.com/oauth2/authorize?client_id=718008997797691422&scope=bot

All server side functions are handled on the hosting platform of the bot.

---

## License
>You can check out the full license [here](https://github.com/wrkdev/fanatical-bot/blob/master/LICENSE)

This project is licensed under the terms of the **MIT** license.
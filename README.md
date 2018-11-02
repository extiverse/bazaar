# Bazaar by ![Flagrow logo](https://avatars0.githubusercontent.com/u/16413865?v=3&s=20) [Flagrow](https://discuss.flarum.org/d/1832-flagrow-extension-developer-group), a project of [Gravure](https://gravure.io/)

[![Build status](https://travis-ci.org/flagrow/bazaar.svg?branch=master)](https://travis-ci.org/flagrow/bazaar) [![Latest Stable Version](https://img.shields.io/packagist/v/flagrow/bazaar.svg)](https://packagist.org/packages/flagrow/bazaar) [![Total Downloads](https://img.shields.io/packagist/dt/flagrow/bazaar.svg)](https://packagist.org/packages/flagrow/bazaar) [![Donate](https://img.shields.io/badge/patreon-support-yellow.svg)](https://www.patreon.com/flagrow) [![Join our Discord server](https://discordapp.com/api/guilds/240489109041315840/embed.png)](https://flagrow.io/join-discord)

The marketplace extension that allows you to add and remove extensions without composer or a terminal.

> Read the disclaimers!

![Bazaar in Action](https://discuss.hyn.me/assets/bazaar.gif)

## Disclaimers

- Bazaar runs migrations down, meaning it will drop tables of extensions when you uninstall them.
- Bazaar cannot remove assets right now of extensions that are uninstalled.
- Bazaar attempts to increase its allowance of memory to 1GB, this might not work on your hosting environment.
- Bazaar reads the API on flagrow.io for compatible extensions. By installing and enabling this extension you agree to share some data so that the extension can do its work (Flarum version and URL).

## Goals

- Give admins easier control of installed and enabled extensions.
- Create a community driven, triaged list of quality extensions.
- Allow admins to connect to their Flagrow.io account and gain access to a dashboard showing the status of all forums.
- Support paid extensions for Flagrow and other extension developers.

For a complete overview of our changes, please visit the [changelog](https://github.com/flagrow/bazaar/blob/master/CHANGELOG.md) on Github.

## Installation

```bash
composer require flagrow/bazaar
```

Make sure that the following directories and files are writable by the web/php user:

- `composer.json`
- `composer.lock`
- `vendor/`

## Updating

```bash
composer update flagrow/bazaar
php flarum migrate
php flarum cache:clear
```

## Configuration

Enable the extension under the extensions tab in the admin area. A settings modal will popup asking you for a token, which most likely will already be there. You're good to go, open the Bazaar tab on the left and enjoy!

## Extension developers

Bazaar connects to [flagrow.io](https://flagrow.io/) to provide up-to-date extension list and metadata.
This data is refreshed periodically via the Packagist API. It takes around five minutes for the
website to pick up new extensions, existing extensions are synced every hour.

This means you don't have anything particular to do to get your extension inside Bazaar.

However here are a few additional steps you can take to improve the way your extension looks (check these keys in your `composer.json` file):

- Fill the `license` key so everybody know what they can do with your code.
- Add every author to the `authors` key so we can list them.
- Choose a sensible name for `extra.flarum-extension.title`. This value is used with the tags to provide search.
- Don't forget to set an `extra.flarum-extension.icon` setting to your extension, it looks a lot better with an icon.
- Add an `extra.flagrow.discuss` key to link your extension with its discussion on Flarum Discuss. Must be a valid url starting with `https://discuss.flarum.org/d/`.

## Security

If you discover a security vulnerability within Bazaar, please send an email to the Flagrow team at security@flagrow.io. All security vulnerabilities will be promptly addressed.

Please include as many details as possible. You can use `php flarum info` to get the PHP, Flarum and extension versions installed.

## FAQ

- Where do I get a token or the token field is empty?

> Please get in touch with us on our [issue tracker](https://github.com/flagrow/bazaar/issues).

## Links

- [Flarum Discuss post](https://discuss.flarum.org/d/5151)
- [Source code on GitHub](https://github.com/flagrow/bazaar)
- [Changelog](https://github.com/flagrow/bazaar/blob/master/CHANGELOG.md)
- [Report an issue](https://github.com/flagrow/bazaar/issues)
- [Download via Packagist](https://packagist.org/packages/flagrow/bazaar)

An extension by [Flagrow](https://flagrow.io/).

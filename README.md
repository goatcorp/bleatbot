# bleatbot

~~robogoat overlord~~ a GitHub bot for goatcorp

## features

- [x] auto close issues
- [x] auto merge pull requests
- [x] franzbot-styled FAQ
- [ ] DalamudPlugins issue checker
- [ ] stale plugin PR notice
- [ ] upcoming DIP merge notice
- [ ] caprine operator event sending

## setup

- create a [personal access token](https://github.com/settings/tokens) with the `read:org`, `user`, and `repo` scopes (TODO: figure out if bot requires more)
- `cp .env.example .env` and edit as required
- create the webhooks pointing to bleatbot (all events is fine)
- install dependencies: `pnpm i`
- set up the database: `prisma generate`, `prisma migrate deploy`
- compile the code: `pnpx tsc`
- run the code: `node ./dist/index.js`

# bleatbot

~~robogoat overlord~~ a GitHub bot for [goatcorp](https://github.com/goatcorp)

## features

- [x] auto close issues
- [x] auto merge pull requests
- [x] franzbot-styled FAQ
- [ ] DalamudPlugins issue checker
- [ ] stale plugin PR notice
- [ ] upcoming DIP merge notice
- [ ] caprine operator event sending

## setup

- create a [personal access token](https://github.com/settings/tokens) with the `repo` scope (you might need more, i don't actually know, lol)
- `cp .env.example .env` and edit as required
- create the webhooks pointing to bleatbot (all events is fine)
- `pnpm i`, `prisma generate`, `pnpx tsc`, `node ./dist/index.js`, we balling

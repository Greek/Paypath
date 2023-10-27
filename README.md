# Paypath

> A platform allowing you to sell access to your Discord server.

Paypath was a SaaS project designed to enable users to sell access to their Discord servers, and other
kinds of content. It was in development during the summer of 2023 but died off shortly after because of
complications with trying to run a business just a couple months before college was about to start.

Regardless, it was a good learning experience that helped me make use of different libraries to manage UI state,
develop a decent, but incomplete, backend system that achieves the MVP/goal of the app, as well as allowing me
to bring out my more "design-y" side to the public. There's definitely a lot more I could've done better with this.

A live demo is available at <https://paypath.app>.

Want to see Paypath in action? Purchase a Paypath product [here](https://paypath.app/mystore/4GI_px1CeyHI3SD79xbS4hUDDyahAxRV)! (enter 4242 4242 4242 4242 for the card number!)

## Setting up your environment

First off, some prerequesites: [Node v18][node-18-download], [pnpm][pnpm-website], and [Docker (recommended)][docker-website].

If you are using Docker Compose, you can run `docker compose up -d` in the root directory to spin up the resources you need.

1. Copy the `.env.example` file to `.env`.
2. Set up the Discord application, head to [this link](https://discord.com/developers/applications)
   1. Create a new application at the top right of the screen
   2. Once created, click on "OAuth2" on the sidebar
   3. Copy the `CLIENT ID`, then paste it in the `.env` file at `DISCORD_ID` and `NEXT_PUBLIC_DISCORD_ID`.
   4. Copy the `CLIENT SECRET`, then paste it in the `.env` file at `DISCORD_SECRET`.
   5. Under the "Redirects" section, add a the following URIs:
      1. `http://localhost:3000/api/auth/callback/discord`
      2. `http://localhost:3000/d/products`
   6. Finally, click on "Bot" and click "Reset Token". Copy the token and paste it in the `DISCORD_TOKEN` field.
3. Change the NextAuth to the appropriate values at the comments outline.
4. Finally, change the Stripe related values.
   1. For the Connect ID step, click on the link in the `.env` file,
   2. Scroll all the way down to the "Redirects" section under "Integration"
   3. Set the URL to `http://localhost:3000/api/stripe/onboard`.
   4. Set the `STRIPE_GATEKEEP_ACCT_ID` to your Stripe's account ID if you want to use Paypath with the same Stripe account as you use to set-up the integration.

Once you set the configuration you can begin to run the app.

1. Run `pnpm install`, this will install all the deps.
2. Run database migrations using `pnpm db:push`.
3. Finally, run `pnpm dev`.

[node-18-download]: https://nodejs.org/en/download
[pnpm-website]: https://pnpm.io/
[docker-website]: https://www.docker.com/

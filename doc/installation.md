# Installation

For now (#1), the first thing you have to do is to create an account on [jolimail](https://app.jolimail.io).
Then, go to your profile, copy the access token and keep it for later.

Then, you'll need your smtp credentials.

Then, you have to retrieve the microservice. You've several possibilities for that.

## Deploy it directly on heroku

First you have to click on this button.

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/in-your-saas/catapulte/tree/master)

Then Heroku will ask you to fill in the access token for jolimail and the smtp informations

## Deploy with docker

To deploy catapulte with docker, it's quite simple, we already have a built image [here](https://hub.docker.com/r/inyoursaas/catapulte/). In this repository you can find a docker-compose.yml that shows what are the dependencies.

The same way than with Heroku, you'll need to expose some environment variables this way

```bash
docker run -d \
  -e redis_url=redis://10.0.0.1 \
  -e mailer_host=smtp://10.0.0.2 \
  -e mailer_port=465 \
  inyoursaas/catapulte
```

## Run it locally with node

First you have to install node, install the dependencies (`yarn` or `npm install`) and start it with your environment variables.
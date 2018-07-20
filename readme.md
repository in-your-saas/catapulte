# Catapulte

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![codecov](https://codecov.io/gh/in-your-saas/catapulte/branch/master/graph/badge.svg)](https://codecov.io/gh/in-your-saas/catapulte)
[![CircleCI Build Status](https://circleci.com/gh/in-your-saas/catapulte.svg?style=shield)](https://circleci.com/gh/in-your-saas/catapulte)

## Configuration

You can configure catapulte with some environment variable that are defined [here](source/config.js).

In addition to that, catapulte uses [nodemailer](https://github.com/nodemailer/nodemailer) as a dependency to send emails. So you can
add some more variables like the authentication.

## Start catapulte on Heroku

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/in-your-saas/catapulte)

## Build the docker image

```bash
PACKAGE_VERSION=$(cat package.json | grep version | head -1 | awk -F: '{ print $2 }' | sed 's/[",]//g' | tr -d '[[:space:]]')
docker build -t inyoursaas/catapulte:$PACKAGE_VERSION .
```

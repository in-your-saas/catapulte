# Catapulte

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

Let's be honest, it's a temporary name...

## Build the docker image

```bash
PACKAGE_VERSION=$(cat package.json | grep version | head -1 | awk -F: '{ print $2 }' | sed 's/[",]//g' | tr -d '[[:space:]]')
docker build -t inyoursaas/catapulte:$PACKAGE_VERSION .
```

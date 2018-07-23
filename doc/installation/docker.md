# Installation with docker

## I just wanna try it!

If you want to try catapulte locally, we prepared everything for you already.
You only need to have [docker and docker-compose preinstalled](https://docs.docker.com/install/).

Once it's installed, just pull this repository and run `docker-compose up`.

It will start a [RabbitMQ container](https://hub.docker.com/_/rabbitmq/) to queue the messages,
a [Mailhog container](https://hub.docker.com/r/mailhog/mailhog/) to simulate a SMTP server and
a Catapult container.

## I wanna install it on my production server

Wow, thank you! It'll be quite simple. You need to have [docker and docker-compose preinstalled](https://docs.docker.com/install/).

You first need to have a [RabbitMQ](https://hub.docker.com/_/rabbitmq/) container started and a SMTP server available.
Then, pull the [Catapulte](https://hub.docker.com/r/inyoursaas/catapulte/) image from docker hub, and start it
with [the good environment variables](../configuration/index.md).

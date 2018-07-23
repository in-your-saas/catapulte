# Configuration

## Environment variables

As I say in the [installation section](../installation/index.md), to start Catapulte, you need a RabbitMQ server and a SMTP server.
After that, you *just* need to configure Catapulte to do its job.

- `PORT` is the port on which catapult API will listen (default `3200`)
- `logger` is the level of log you want, cf. [morgan](https://github.com/expressjs/morgan). (default `tiny`)

- `jolimail_url` is the url to reach the jolimail API
- `jolimail_token` is the token to authenticate your instance

- `mailer_*` is the configuration for the smtp server connection. Catapult uses [nodemailer](https://nodemailer.com/smtp/) to send emails. So you can extends its configuration in the variables.
- `mailer_host` is the smtp hostname (default `smtp.example.com`)
- `mailer_port` is the smtp port (default `1025`)
- `mailer_secure` if true the connection will use TLS when connecting to server.

- `rabbit_url` is the url to reach your rabbitmq (default `amqp://guest:guest@localhost/catapulte`)
- `rabbit_queue` is the queue in which catapult will put the mails (default `send-email`)

## API vs Worker

Catapulte has 2 different sections. The API that receives your requests and put them in RabbitMQ and
the Worker that read the messages from RabbitMQ and send the emails.

By default, when you start Catapulte, it starts both. But, if you want to have a really fast API, you can start
10 APIs by adding the `web` parameter at the end of your command. And if you don't care about how fast your email are sent,
you can start only 1 worker by adding the `worker` parameter at the end of your command.

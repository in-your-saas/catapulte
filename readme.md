# Catapulte

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![codecov](https://codecov.io/gh/in-your-saas/catapulte/branch/master/graph/badge.svg)](https://codecov.io/gh/in-your-saas/catapulte)
[![CircleCI Build Status](https://circleci.com/gh/in-your-saas/catapulte.svg?style=shield)](https://circleci.com/gh/in-your-saas/catapulte)

You wanna use it? Open the [documentation](doc/index.md)

## Why do we do that?

Catapulte comes from a frustration of using several email provider. I used to work with products like [sendgrid](https://sendgrid.com/),
[mailgun](https://www.mailgun.com/), [mailchimp](https://mailchimp.com/), [sendinblue](https://www.sendinblue.com/), etc. But they have many disadvantages.

- You cannot host it, use it on premise
- It's amurican! They can get your data without asking your permission... not really nice...
- Most of them are not really transactionnal oriented
- They don't have templating tools for our non tech coworkers (and if they do, it's too complicated) that ask us to change a wording every 2 days
- It's not perfect

## Should you use it?

I'd say yes...

## Why you should use it?

- You work in a startup
  - You don't have shit loads of money to spend on the mailing tools, so use something opensource, send your emails from your own SMTP (or from Amazon SES, it's cheap)
  - You don't have time to change the email template everyday, so let your Product Owner do it
  - You wanna be able to add this little feature, just do a pull request...

- You work in a big company
  - You cannot use those external services because you're not allowed to put your user's data on an external service.
  - You cannot access external services because it's blocked by the proxy
  - You want to customise the way you authenticate to your SMTP
  - You want something user friendly enough that your manager can write the emails

## How can you use it?

It's really simple.

- Install catapulte following the [documentation](doc/index.md)
- Create an account on [jolimail.io](https://jolimail.io)
- Configure catapulte following the [documentation](doc/index.md)
- Create you templates on [jolimail.io](https://jolimail.io)
- Call the catapulte's REST API to send emails (the doc is coming)

And that's it...

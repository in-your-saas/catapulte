# Catapulte

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![codecov](https://codecov.io/gh/in-your-saas/catapulte/branch/master/graph/badge.svg)](https://codecov.io/gh/in-your-saas/catapulte)
[![CircleCI Build Status](https://circleci.com/gh/in-your-saas/catapulte.svg?style=shield)](https://circleci.com/gh/in-your-saas/catapulte)
[![Greenkeeper badge](https://badges.greenkeeper.io/in-your-saas/catapulte.svg)](https://greenkeeper.io/)

You wanna use it? Open the [documentation](doc/index.md)

## What is catapulte?
Catapulte is an open source mailer you can host yourself.

You can use it to quickly catapult your transactionnal emails to destination.

It works with the amazing https://www.jolimail.io template builder, so that your boss|marketing team|client|designer can make the email template themself. Or you can [build your own templates by hand](./doc/local-template.md).

You can focus on things that really matter (let's face it, making responsive email templates is a pain).

## Why did we buid catapulte?

Catapulte comes from the frustration of using several email providers. 
We used to work with products like [sendgrid](https://sendgrid.com/),
[mailgun](https://www.mailgun.com/), [mailchimp](https://mailchimp.com/), [sendinblue](https://www.sendinblue.com/), etc. 

But they have many disadvantages : 

- Most of them are not really transactionnal oriented, and users complain that their login emails take a long time to arrive.
- You cannot host it, use it on premise
- It's amurican! They can get your data without asking your permission... not really nice...
- They usually don't have templating tools for our non tech coworkers that ask us to change a wording every 2 days.
  And when they do, the editors are like html online editors, so it ends up being our job to make the template anyway.

## Should you use it?

If, like us, you didn't find any good way of doing transactionnal emails, then Yes !
Wether you want to send your emails yourself or you just don't want to deal with building the templates, we have you covered.

## Why you should use it :

- You work in a startup
  - You don't have shit loads of money to spend on the mailing tools, so use something opensource, send your emails from your own SMTP (or from Amazon SES, it's cheap)
  - You don't have time to change the email template everyday, so let your Product Owner do it
  - You wanna be able to add this little feature, just do a pull request...

- You work in a big company
  - You cannot use those external services because you're not allowed to put your user's data on an external service.
  - You cannot access external services because it's blocked by the proxy
  - You want to customise the way you authenticate to your SMTP
  - You want something user friendly enough that your manager can write the emails


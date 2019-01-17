# Local templates

Yes, catapulte allows you to send emails dinamically built with [jolimail](https://app.jolimail.io),
but it also allows you to send your templates built locally.

## Create your local templates

You have to create a folder where you'll put your library of templates. We'll call this template `$template_path`.
Once you did that, each email template will be an other folder in which you'll have to put 3 files. One for the subject, named `subject.ejs`, one for the text version of the email named `text.ejs` and one for the html version name `mjml.ejs`. If you want an example, you can take a look at [this folder](../sample).

## How to deploy this

We provide a docker image of catapulte that we upgrade as often as possible to avoid issues and add new features. So we encourage you to use this image as a base image and then create a layer with your library of templates in it.

```Dockerfile
FROM inyoursaas/catapulte:latest

ENV template_path=/library

COPY ./where/your/library/is /library
```

If you want to make it cleaner, you can even create a repository in which you have your library, you put this Dockerfile and you build your image each time we make a change or each time you change your library, with a CI/CD.
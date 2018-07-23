# Usage

## Checking that your API is up and running

It's simple, it's a health check endpoint.

```
# GET YOUR_HOST
+ Response 200 (application/json)
  {
    "ok": true
  }
```

## Sending an email

This call will add your email to the rabbitmq queue.

You can add some substitutions that you can put in your template like `<%= login_url %>`.

```
# POST YOUR_HOST/mails
+ Request (application/json)
  {
    "template_id": "uuid-of-your-template",
    "from": "Rick Sanchez <rick@getswif.ty>",
    "to": "gilfoyle@piedpiper.com",
    "substitutions": {
      "login_url": "https://login-url-to-your-website",
      "first_name": "Gilfoyle",
      "company_name": "Pied Piper"
    }
  }
+ Response 202
```

FROM node:10-alpine
LABEL maintainer="Jeremie Drouet <jeremie@inyoursaas.io>"

COPY . /code

WORKDIR /code

RUN npm install --only=production

EXPOSE 3200
CMD [ "npm", "start" ]

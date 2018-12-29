FROM node:10-alpine
LABEL maintainer="Jeremie Drouet <jeremie@inyoursaas.io>"

COPY . /code

WORKDIR /code

RUN npm install --only=production

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD [ "npm", "run", "healthcheck" ]

EXPOSE 3200
CMD [ "npm", "start" ]

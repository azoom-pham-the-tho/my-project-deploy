FROM node:12-alpine

WORKDIR /my-project-deploy

ENTRYPOINT ["sh", "-c", "npm i && npm run dev"]

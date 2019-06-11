FROM node:alpine
RUN apk add --no-cache imagemagick

WORKDIR /usr/src/app/
COPY package.json yarn.lock /usr/src/app/
RUN yarn install --production --frozen-lockfile

COPY /images /usr/src/app/images
COPY /profiles /usr/src/app/profiles
COPY /src /profiles /images /usr/src/app/

ENTRYPOINT ["node", "--experimental-modules", "--no-warnings", "/usr/src/app/index.mjs"]

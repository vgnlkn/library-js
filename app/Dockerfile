FROM node:alpine

WORKDIR /usr/app/

# Install nodemon
RUN npm install -g nodemon
RUN yarn install

COPY ./package.json /usr/app/
COPY ./src /usr/app/src/
COPY ./public /usr/app/public/
COPY ./views /usr/app/views
COPY ./library.json /usr/app/library.json
COPY yarn.lock /usr/app/

RUN npm install

CMD yarn run build

CMD ["npm", "run", "dev"]
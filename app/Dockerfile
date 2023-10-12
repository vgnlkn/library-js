FROM node:alpine

WORKDIR /usr/app/

# Install nodemon
RUN npm install -g nodemon

COPY ./package.json /usr/app/
COPY ./src /usr/app/src/
COPY ./public /usr/app/public/
COPY ./views /usr/app/views
COPY ./library.json /usr/app/library.json

RUN npm install

CMD ["npm", "run", "dev"]
FROM node:6.9.1

ADD . /healthcheck

WORKDIR /healthcheck

RUN npm install

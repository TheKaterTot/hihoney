FROM node:11

WORKDIR /app
COPY package.json /app/package.json
RUN npm install

COPY . /app

EXPOSE 4000

ENTRYPOINT [ "npm" ]
CMD [ "start" ]
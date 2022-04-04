FROM node:17-alpine3.14
COPY package.json package.json
RUN npm install

COPY . .
EXPOSE 3000
CMD ["npm", "start"]

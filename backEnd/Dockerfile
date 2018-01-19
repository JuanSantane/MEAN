FROM node:alpine
ENV NODE_ENV production
WORKDIR /home/node/
COPY . .
RUN npm install
EXPOSE 3000
CMD ["npm", "start"]

FROM mongo:latest
ENV NODE_ENV production
VOLUME /home/jsonData/
COPY jsonData/devices.json /home/jsonData/devices.json

CMD mongoimport --db test --collection devices --drop --type json --host mongo-server --port 27017 --file /home/jsonData/devices.json && 
# mongo --host mongo-server:27017
# db.devices.createIndex({name: "text", desc: "text", type:"text" })
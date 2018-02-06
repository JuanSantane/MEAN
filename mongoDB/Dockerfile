FROM mongo:latest
ENV NODE_ENV production
VOLUME /home/jsonData/
COPY jsonData/devices.json /home/jsonData/devices.json
COPY scripts/basicConf.js /home/start.js

CMD mongoimport --db test --collection devices --drop --type json --host mongo-server --port 27017 --file /home/jsonData/devices.json && mongo mongo-server:27017/test /home/start.js 
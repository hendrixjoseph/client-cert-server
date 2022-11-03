FROM node:14

WORKDIR /usr/src/app

COPY ./index.js ./
COPY ./package.json ./
COPY ./create-certs.sh ./

RUN chmod u+x create-certs.sh
RUN ./create-certs.sh

RUN npm install

EXPOSE 80 443

CMD [ "node", "index.js" ]

# docker build . -f nodejs.dockerfile -t joehx/client-cert-server
# docker run -p 80:80 -p 443:443 -d joehx/client-cert-server
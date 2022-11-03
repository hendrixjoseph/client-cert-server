Build & Run the Docker container:

  docker build . -f nodejs.dockerfile -t joehx/client-cert-server
  docker run -p 80:80 -p 443:443 -d joehx/client-cert-server

Copy out the client certificates:

  docker cp vigorous_hodgkin:/usr/src/app/client.key ./
  docker cp vigorous_hodgkin:/usr/src/app/client.crt ./
  docker cp vigorous_hodgkin:/usr/src/app/client.pfx ./

Alternatively, just run as a Node JS server:

Make `create-certs.sh` executable:

  chmod u+x create-certs.sh

Run `create-certs.sh`:

  ./create-certs.sh

Run `npm install`:

  npm install

Start the server:

  node index.js
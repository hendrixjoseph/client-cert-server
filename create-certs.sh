#!/bin/bash

# generate certificate authority
openssl req -new -x509 -days 9999 -keyout ca.key -out ca.crt -subj "/C=US/ST=Ohio/L=JoeHx/O=JoeHx/OU=JoeHx/CN=server" -passout pass:password

# server
openssl genrsa -out server.key 4096
openssl req -new -key server.key -out server.csr -subj "/C=US/ST=Ohio/L=JoeHx/O=JoeHx/OU=JoeHx/CN=server" -passout pass:password
openssl x509 -req -days 9999 -in server.csr -CA ca.crt -CAkey ca.key -CAcreateserial -out server.crt -passin pass:password

# client
openssl genrsa -out client.key 4096
openssl req -new -key client.key -out client.csr -subj "/C=US/ST=Ohio/L=JoeHx/O=JoeHx/OU=JoeHx/CN=client" -passout pass:password
openssl x509 -req -days 9999 -in client.csr -CA ca.crt -CAkey ca.key -CAcreateserial -out client.crt -passin pass:password
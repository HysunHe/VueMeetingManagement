#!/usr/bin/env bash

docker run -d \
    --restart=always \
    --name=mm \
    -p 8889:80 \
    hysunhe/mm:latest

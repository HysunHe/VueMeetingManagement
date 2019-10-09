#!/usr/bin/env bash

TAG=`date '+%Y-%m-%d-%H-%M-%S'`

docker build . -t hysunhe/mm:${TAG}
docker tag hysunhe/mm:${TAG}   hysunhe/mm:latest

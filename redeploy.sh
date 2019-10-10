npm run build

docker stop mm
docker rm mm
./build-image.sh
./start.sh

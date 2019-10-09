npm run build

sudo docker stop mm
sudo docker rm mm
sudo ./build-image.sh
sudo ./start.sh

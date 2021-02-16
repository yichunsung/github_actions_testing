echo "Rebuild the image"
sudo docker build . -t actions-run

echo "Remvoe all old images"
sudo docker rmi $(sudo docker images -f "dangling=true" -q --no-trunc)
#echo "Restart container"
#sudo docker stop testing-run && sudo docker rm testing-run && sudo docker run -p 8000:8000 --name testing-run -d actions-run


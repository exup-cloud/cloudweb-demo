#!/bin/bash
#build项目
yarn
cp -f ./config/api.config.master.js ./config/api.config.js
npm run build
#build swap镜像
docker build -t tmex-master-swap:latest .
#为镜像打tag
docker tag tmex-master-swap:latest registry.ginfex.net:5000/tmex-master-swap:latest
#swap镜像推送到远程仓库
docker push registry.ginfex.net:5000/tmex-master-swap:latest


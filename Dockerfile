FROM centos
RUN curl --silent --location https://rpm.nodesource.com/setup_10.x | bash - \
&& yum -y install nodejs \
&& npm install pm2 -g
RUN mkdir -p /data/www/swap
WORKDIR /data/www/swap/
EXPOSE 3008
ENTRYPOINT [ "pm2","startOrRestart","pm2.json","--no-daemon" ]

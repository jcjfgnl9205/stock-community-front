#!/usr/bin/env bash
echo "> FE 배포"

sudo cp -rf /home/ec2-user/app/stock-community-frontend/* /usr/share/nginx/html

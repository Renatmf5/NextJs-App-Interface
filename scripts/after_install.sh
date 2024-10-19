#!/bin/bash
DIR="/home/ec2-user/web-nextjs-app"
echo "AfterInstall: Instalando dependências"
sudo chown -R ec2-user:ec2-user ${DIR}
cd ${DIR}

# Instalar dependências do projeto usando npm
npm install 

# Construir a aplicação Next.js
npm run build
DIR="/home/ec2-user/web-nextjs-app"

echo "ApplicationStart: Iniciando a aplicação" | tee -a /home/ec2-user/web-nextjs-app/deploy.log

# Conceder permissões
sudo chmod -R 777 ${DIR}

# Navegar para o diretório da aplicação
cd ${DIR}

# Iniciar a aplicação usando PM2
pm2 start ecosystem.config.js
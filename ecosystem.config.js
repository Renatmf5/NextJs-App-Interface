module.exports = {
  apps: [
    {
      name: 'nextjs-app',
      script: 'npm',
      args: 'start',
      env: {
        NODE_ENV: 'production',
        SUBDOMINIO: 'api.grupo-ever-rmf.com',
      },
    },
  ],
};
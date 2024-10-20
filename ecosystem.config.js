module.exports = {
  apps: [
    {
      name: 'web-nextjs-app',
      script: 'npm',
      args: 'start',
      env: {
        NODE_ENV: 'production',
        SUBDOMINIO: 'api.grupo-ever-rmf.com',
        PORT: 80,
      },
    },
  ],
};
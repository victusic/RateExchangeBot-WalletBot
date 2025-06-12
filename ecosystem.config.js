module.exports = {
  apps: [
    {
      name: 'wallet-bot',
      script: './node_modules/ts-node/dist/bin.js',
      args: './src/index.ts',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '128M',
      env: {
        NODE_ENV: 'production',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};

module.exports = {
  apps: [
    {
      name: '<<PROJECT_NAME>>',
      script: 'dist/server.js',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production'
      }
    }
  ]
}

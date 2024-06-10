const chokidar = require('chokidar');
const { exec } = require('child_process');

chokidar.watch('src/**/**/**/**').on('change', (path) => {
  console.info(`${path} has changed, building solution...`);
    exec('npm run build', (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        process.exit(1);
      }
      console.info(`stdout: ${stdout}`);
      console.error(`stderr: ${stderr}`);
    });
  });
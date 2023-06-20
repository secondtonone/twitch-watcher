import dotenv from 'dotenv';
import cron from 'node-cron';
import shell from 'shelljs';

dotenv.config();

cron.schedule(process.env.CRON_TIME, () => {
  console.log('---------------------');
  console.log('Start watching');

  if (shell.exec(`npm run start`).code !== 0) {
    shell.exit(1);
  } else {
    shell.echo('Watching Twitch');
  }
});

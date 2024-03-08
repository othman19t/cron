// Importing necessary modules
import express from 'express';
import { CronJob } from 'cron';

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

let job; // Variable to store the CronJob instance

// Define your cron expression for running every 10 seconds
const cronExpression = '*/10 * * * * *';

// Endpoint to start the job
app.get('/start', (req, res) => {
  job = new CronJob(cronExpression, function () {
    console.log('Job running every 10 seconds');
  });
  job.start();
  res.send('Cron job started');
});

// Endpoint to stop the job
app.get('/stop', (req, res) => {
  if (job) {
    job.stop();
    res.send('Cron job stopped');
  } else {
    res.send('No job running');
  }
});

// Endpoint to check if the job is running
app.get('/keep-alive', (req, res) => {
  if (job && job.running) {
    res.send('Job is running');
  } else {
    res.send('Job is not running');
  }
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

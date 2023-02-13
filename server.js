const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const app = require('./app');

process.on('uncaughtException', (err) => {
  console.log('Unhandled Exceptionection!. Shutting Down');
  console.log(err);
});

mongoose.set('strictQuery', false);

mongoose
  .connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('DB connected successfully');
  });

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});

process.on('unhandledRejection', (err) => {
  console.log('Unhandled rejection!. Shutting Down');
  console.log(err);

  server.close(() => {
    process.exit(1);
  });
});

process.on('uncaughtException', (err) => {
  console.log('Unhandled Exceptionection!. Shutting Down');
  console.log(err);

  server.close(() => {
    process.exit(1);
  });
});

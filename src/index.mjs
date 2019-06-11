import app from './app.mjs';

app()
    .then(() => console.log('Finished!'))
    .catch(error => console.error(error));

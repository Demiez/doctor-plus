import app from './app';

const port: string | number = process.env.PORT || 4000;

app.listen(port, () => console.log(`Server listening on port: ${port}`));

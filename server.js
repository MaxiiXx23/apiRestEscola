import app from './app';

const port = 3000

app.listen(port ,() => {
    console.log(`Listen on port: ${port}, acesse: http://localhost:${port}`);
})
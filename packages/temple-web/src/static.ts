import path from 'path';
import express from 'express';
import temple from '@ossph/temple/compiler';

const docs = path.join(__dirname, '../../../docs');

//create temple compiler
const compiler = temple({ 
  brand: '',
  cwd: __dirname,
  minify: false
});

//create express app
const app = express();

app.get('/temple/**', (req, res) => {
  const { fs } = compiler;
  const resource = (req.url || '/temple/index.html')
    .substring(8)
    .replace(/\/\//, '/'); 
  
  const file = path.join(docs, resource); 
  if (fs.existsSync(file)) {
    return res.status(200).sendFile(file);
  }
  res.status(404).end('Not Found');
});

//listen
app.listen(3000, () => {
  console.log(`HTTP server is running on http://localhost:3000`);
});
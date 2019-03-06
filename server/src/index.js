const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const port = 5000;

// get all diagrams we can manage
const DIAGRAMS = getAvailableDiagrams();

app.use(bodyParser.json()); // support json encoded bodies

app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(cors());

app.use('/diagrams', express.static('../diagrams'));

app.get('/', (req, res) => {
  res.send(DIAGRAMS);
});

app.post('/', (req, res) => {
  const {diagram, xml} = req.body;

  if (!DIAGRAMS[diagram]) {
    throw(new Error('Diagram Not Found!'));
  }

  const diagramFile = `..${DIAGRAMS[diagram]}`;

  fs.writeFile(diagramFile, xml);

  res.send({
    diagram,
    event: 'saved'
  });
});

app.listen(port, () => console.log(`Listening on port ${port}!`));

function getAvailableDiagrams () {
  const files = fs.readdirSync('../diagrams');
  let diagrams = {};

  files.forEach(file => {
    const [fileName, fileExt] = file.split(/\./);
    if (fileExt.match(/xml/)) {
      diagrams[fileName] = `/diagrams/${file}`;
    }
  });

  return diagrams;
}


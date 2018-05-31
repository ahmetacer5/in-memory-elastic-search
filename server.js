require('zone.js/dist/zone-node');
const express = require('express');
const {ngExpressEngine} = require('@nguniversal/express-engine');
var bodyParser = require('body-parser');

// create express app
const app = express();

// file uploader module
const fileUpload = require('express-fileupload');

// creating in memory database
var elasticlunr = require('elasticlunr');
var lunr = require('lunr');
var records = null;
var store = {};
// CSV Parser module
var csvParse = require('csv-parse');

app.use(fileUpload());
app.use(bodyParser.json());

// import server module bundle
var {ServerAppModuleNgFactory} = require('./dist-server/main.bundle');

// set up engine for .html file
app.engine('html', ngExpressEngine({
  bootstrap: ServerAppModuleNgFactory
}));

app.set('view engine', 'html');
app.set('views', 'dist-browser');

// server static files
app.use(express.static(__dirname + '/dist-browser', {index: false}));

// return rendered index.html on every request
app.get('*', (req, res) => {
  res.render('index', {req, res});
  console.log(`new GET request at : ${req.originalUrl}`);
});

app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

app.post('/api/import', function (req, res) {
  if (!req.files)
    return res.status(400).send('No files were uploaded.');

  let csvFile = req.files.csvFile;
  // creating a memory db collection for the CSV File
  csvParse(csvFile.data, function (err, output) {
    if (err) {
      res.status(400).send({
        success: false
      });
    } else {
      store = {};
      records = elasticlunr(function () {
        this.setRef('id');
        this.addField('name');
        var itemsProcessed = 0;
        output.forEach(function (row) {
          itemsProcessed++;
          this.addDoc({id: row[0], name: row[1]});
          store[row[0]] = {id: row[0], name: row[1], age: row[2], address: row[3], team: row[4]};
          // console.log(itemsProcessed);
          if (itemsProcessed === output.length) {
            res.status(200).send({
              success: true,
              message: output.length.toString() + ' records imported.'
            });
          }
        }, this);
      });

    }
  });
});

app.post('/api/search', function (req, res) {
  var query = req.body.query;
  var results = [];

  if (query) {
    var searchData = records.search(query, {});
    searchData = searchData.slice(0, 20);
    for (var i = 0; i < searchData.length; i++) {
      results.push(store[searchData[i].ref]);
    }
  }
  res.status(200).send({
    results
  });
});

// start server and listen
app.listen(80, () => {
  console.log('Angular server started on port 80');
});

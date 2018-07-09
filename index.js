'use strict';

const path = require('path');
const express = require('express');
const Datastore = require('@google-cloud/datastore');
const app = express();
var staticUserData = {
  stashes: [{
    id: 1,
    name: 'Stash1',
    items: [
      {id: 1, monthYear: {year: 2018, month: 0, day: 10}, value: -12, repeated: false, note: 'Kino'},
      {id: 2, monthYear: {year: 2018, month: 0, day: 1}, value: 1200, repeated: true, note: 'Gehalt Tom'},
      {id: 3, monthYear: {year: 2018, month: 0, day: 2}, value: 600, repeated: true, note: 'Gehalt Anne'},
      {id: 4, monthYear: {year: 2018, month: 0, day: 19}, value: 200, repeated: true, note: 'Kindergeld'},
      {id: 5, monthYear: {year: 2018, month: 0, day: 4}, value: -600, repeated: true, note: 'Miete'},
      {id: 6, monthYear: {year: 2018, month: 0, day: 6}, value: -300, repeated: true, note: 'Strom/Gas'},
      {id: 7, monthYear: {year: 2018, month: 0, day: 1}, value: -320, repeated: true, note: 'Wocheneinkauf'},
      {id: 8, monthYear: {year: 2018, month: 0, day: 2}, value: -32, repeated: true, note: 'Handy'},
      {id: 9, monthYear: {year: 2018, month: 0, day: 20}, value: -50, repeated: false, note: 'Kino'},
      {id: 10, monthYear: {year: 2018, month: 0, day: 23}, value: -88, repeated: false, note: 'Urlaub'},
      {id: 11, monthYear: {year: 2018, month: 0, day: 21}, value: -200, repeated: false, note: 'Tierarzt'},
      {id: 12, monthYear: {year: 2018, month: 1, day: 16}, value: -33, repeated: false, note: 'Urlaub'},
      {id: 13, monthYear: {year: 2018, month: 2, day: 10}, value: -50, repeated: false, note: 'Klamotten'},
      {id: 14, monthYear: {year: 2018, month: 2, day: 7}, value: 100, repeated: false, note: 'Reiten'},
      {id: 15, monthYear: {year: 2018, month: 3, day: 13}, value: -65, repeated: false, note: 'Ausflug'},
      {id: 16, monthYear: {year: 2018, month: 4, day: 1}, value: 0, repeated: false, note: ''},
      {id: 17, monthYear: {year: 2018, month: 5, day: 3}, value: -5, repeated: false, note: 'Spielzeug'},
      {id: 18, monthYear: {year: 2018, month: 6, day: 7}, value: -5, repeated: false, note: 'Eis'},
      {id: 19, monthYear: {year: 2018, month: 8, day: 25}, value: -5, repeated: false, note: ''},
      {id: 20, monthYear: {year: 2018, month: 9, day: 19}, value: -5, repeated: false, note: '4711'},
      {id: 21, monthYear: {year: 2018, month: 10, day: 30}, value: -5, repeated: false, note: 'Hier haben wir einfach mal so Geld zum Heizen gebraucht'},
      {id: 22, monthYear: {year: 2018, month: 11, day: 31}, value: -5, repeated: false, note: 'Bananen'},
    ]
  },
    {
      id: 2,
      name: 'Stash2',
      items: [
        {id: 1, monthYear: {year: 2018, month: 0, day: 10}, value: -12, repeated: true, note: 'Kino'},
        {id: 1, monthYear: {year: 2018, month: 1, day: 10}, value: 11, repeated: true, note: 'Kino'},
      ]
    }],
  selectedYear: 2018,
  selectedMonth: undefined,
  selectedStash: undefined,
  settings: {
    repeatedColapsed: true
  },

}

let config = {
  "GCLOUD_PROJECT": "MoneyApp",
  "DATA_BACKEND": "datastore"
};

// Your Google Cloud Platform project ID
const projectId = 'YOUR_PROJECT_ID';

// Creates a client
const datastore = new Datastore({
  projectId: config.GCLOUD_PROJECT,
});

app.get('/saveData', (req, res) => {

  const datakey = datastore.key(['userdata', '1001']);//.then((one, two, three, four) => console.log(one, two, three, four));
console.log('datakey', datakey);
const dto = {
  key: datakey,
  data: staticUserData
}
datastore.save(dto)
.then(() => {
  console.log(`Saved ${task.key.name}: ${task.data.description}`);
})
.catch(err => {
  console.error('ERROR:', err);
});


res.setHeader('Access-Control-Allow-Origin', '*');
res.json({message: 'done'});
});



app.disable('etag');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('trust proxy', true);

// Redirect root to /books
app.get('/', (req, res) => {
res.setHeader('Access-Control-Allow-Origin', '*');
res.json(staticUserData);
})
;

if (module === require.main) {
  // Start the server
  const server = app.listen(8080, () => {
    const port = server.address().port;
  console.log(`App listening on port ${port}`);
})
  ;
}

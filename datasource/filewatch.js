
const { ipcMain } = require('electron')
csv = require('fast-csv')

var startByte = 0;
var initiatedRead = false;
var lastRead = null;
var lastUpdate = null;
var isDataUpdated = false
const fs = require('fs');

try {
  fs.watchFile('test-csv.csv', (curr, prev) => {
    fs.stat('test-csv.csv', (err, stats) => {
      if (err) throw err;
      fs.createReadStream('test-csv.csv', {
        start: startByte,
        end: stats.size
      })
        .pipe(csv({headers : false}))
        .on('data', data => {
          startByte = stats.size;
          if (data.length !== 7) {
            return
          }
          if (!initiatedRead) {
            lastRead = {
              voltage: data[0],
              current: data[1],
              power: data[2],
              opTemp: data[3],
              suTemp: data[4],
              waterBreaker: data[5],
              pumpId: data[6]
            }
            return
          }
          var dataObject = {
            voltage: data[0],
            current: data[1],
            power: data[2],
            opTemp: data[3],
            suTemp: data[4],
            waterBreaker: data[5],
            pumpId: data[6]
          }
          lastUpdate = dataObject
          isDataUpdated = false
        })		
        .on('end', data => {
          if (!initiatedRead) {
            lastUpdate = lastRead;
            isDataUpdated = false
            initiatedRead = true
            return
          }
      })
    })
  })
} catch(error) {
  console.log(error)
}


ipcMain.on('is-data-updated', (e, msg) => {
    try {
     if (isDataUpdated) {
      return
     }
     isDataUpdated = true
     e.sender.send('is-data-updated', {data: lastUpdate})
    } catch(error) {
      e.sender.send('is-data-updated', false)
    }
  })
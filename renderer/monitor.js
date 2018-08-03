const Chartist = require('chartist');
const {ipcRenderer} = require('electron')

const DATA_TYPE_HISTORY = 'DATA_TYPE_HISTORY';
const DATA_TYPE_SUMARY = 'DATA_TYPE_SUMARY';

//TODO
const DATA_TYPE_REAL_TIME = 'DATA_TYPE_REAL_TIME';
const DATA_TYPE_STATS = 'DATA_TYPE_STATS';


var data = {
    // A labels array that can contain any sort of values
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    // Our series array that contains series objects or in this case series data arrays
    series: [
      [5, 2, 4, 2, 0]
    ]
  };
  
  // Create a new line chart object where as first parameter we pass in a selector
  // that is resolving to our chart container element. The Second parameter
  // is the actual data object.
  new Chartist.Line('.ct-chart', data);
  
  let load_voltage_value = $('#load-voltage-value');
  let load_current_value = $('#load-current-value');
  let power_absorbed_value = $('#power-absorbed-value');
  let operating_temp_value = $('#operating-temp-value');
  let surface_temp_value = $('#surface-temp-value');
  let water_breaker_value = $('#water-breaker-value');

  //get local user_id from main process
  let user_id = "0000000000000001"
  //get from ui tab
  let pump_id = "A1A"
  let dataType = DATA_TYPE_SUMARY
  let from = 0000001
  let to =   0000001
  
  function fetchData() {
    setTimeout( () => {
      let setting = {
        user_id: user_id,
        pump_id: pump_id,
      } 
      switch(dataType) {
        case DATA_TYPE_HISTORY:
          setting.to = to;
          setting.from = from;
          break
        case DATA_TYPE_SUMARY:
          break
        default:
          break;
      }
        setting.dataType = dataType
        console.log(setting)
      //  ipcRenderer.send('is-data-updated', dataType)
        fetchData()
    }, 1000);
  }

  ipcRenderer.on('is-data-updated', (e, msg) => {
    if (msg.error) {
      return  alert( msg.error)
    }
    if (!msg.data) {
      return
    }
    load_voltage_value.text(msg.data.voltage)
    load_current_value.text(msg.data.current)
    power_absorbed_value.text(msg.data.power)
    operating_temp_value.text(msg.data.opTemp)
    surface_temp_value.text(msg.data.suTemp)
    water_breaker_value.text(msg.data.waterBreaker)
  })

  fetchData()

const Chartist = require('chartist');
const {ipcRenderer} = require('electron')

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

  
  function fetchData() {
    setTimeout( () => {
        ipcRenderer.send('is-data-updated', true)
        fetchData()
    }, 1000);
  }

  ipcRenderer.on('is-data-updated', (e, msg) => {
    if (msg.error) {
        alert( msg.error)
    }
    load_voltage_value.text(msg.data.voltage)
    load_current_value.text(msg.data.current)
    power_absorbed_value.text(msg.data.power)
    operating_temp_value.text(msg.data.opTemp)
    surface_temp_value.text(msg.data.suTemp)
    water_breaker_value.text(msg.data.waterBreaker)
  })

  fetchData()

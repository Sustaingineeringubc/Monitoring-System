const Chartist = require('chartist');
const {ipcRenderer} = require('electron')

const DATA_TYPE_HISTORY = 'DATA_TYPE_HISTORY';
const DATA_TYPE_SUMARY = 'DATA_TYPE_SUMARY';

//TODO
const DATA_TYPE_REAL_TIME = 'DATA_TYPE_REAL_TIME';
const DATA_TYPE_SETTINGS = 'DATA_TYPE_SETTINGS';



var data = {
  realtimeData: {
    graph_1:{
      // A labels array that can contain any sort of values
      labels: ['5', '4', '3', '2', '1'],
      // Our series array that contains series objects or in this case series data arrays
      series: []
    },
    graph_2:{
      // A labels array that can contain any sort of values
      labels: ['5', '4', '3', '2', '1'],
      // Our series array that contains series objects or in this case series data arrays
      series: []
    },
    graph_3:{
      // A labels array that can contain any sort of values
      labels: ['5', '4', '3', '2', '1'],
      // Our series array that contains series objects or in this case series data arrays
      series: []
    }
  },
  historyData: {
    graph_1:{
      // A labels array that can contain any sort of values
      labels: ['5', '4', '3', '2', '1'],
      // Our series array that contains series objects or in this case series data arrays
      series: []
    },
    graph_2:{
      // A labels array that can contain any sort of values
      labels: ['5', '4', '3', '2', '1'],
      // Our series array that contains series objects or in this case series data arrays
      series: []
    },
    graph_3:{
      // A labels array that can contain any sort of values
      labels: ['5', '4', '3', '2', '1'],
      // Our series array that contains series objects or in this case series data arrays
      series: []
    }
  },
  labelData: {
    voltage: "",
    current: "",
    oTemp: "",
    sTemp: "",
    power: "",
    water:""
  }
};
  
  // Create a new line chart object where as first parameter we pass in a selector
  // that is resolving to our chart container element. The Second parameter
  // is the actual data object.
  let realtimeChart1 = new Chartist.Line('#chart_1', data.realtimeData.graph_1);
  let realtimeChart2 = new Chartist.Line('#chart_2', data.realtimeData.graph_2);
  let realtimeChart3 = new Chartist.Line('#chart_3', data.realtimeData.graph_3);
  let historyChart4 = new Chartist.Line('#chart_4', data.historyData.graph_1);
  let historyChart5 = new Chartist.Line('#chart_5', data.historyData.graph_2);
  let historyChart6 = new Chartist.Line('#chart_6', data.historyData.graph_3);

  
  let load_voltage_value = $('#load-voltage-value');
  let load_current_value = $('#load-current-value');
  let power_absorbed_value = $('#power-absorbed-value');
  let operating_temp_value = $('#operating-temp-value');
  let surface_temp_value = $('#surface-temp-value');
  let water_breaker_value = $('#water-breaker-value');

  //get local user_id from main process
  let user_id = "0000000000000001"
  //get from ui tab
  let pump_id = "A2A"
  let dataType = DATA_TYPE_REAL_TIME
  let from = 0000001
  let to =   0000001
  
  function fetchRealTimeData() {
    setTimeout( () => {
      if (dataType !== DATA_TYPE_REAL_TIME) {
        return
      }
      let setting = {
        user_id: user_id,
        pump_id: pump_id,
        dataType: dataType
      } 
      ipcRenderer.send('is-data-updated', setting)
      fetchRealTimeData()
    }, 500);
  }

  ipcRenderer.on('is-data-updated', (e, msg) => {
    if (msg.error) {
      return  alert( msg.error)
    }
    if (!msg.data) {
      return
    }
  
    let voltageData = msg.data[0];
    let currentData = msg.data[1];
    let oTempData = msg.data[2];
    let sTempData = msg.data[3];
    let powerTemp = msg.data[4];
    let waterTemp = msg.data[5];
    
    data.realtimeData.graph_1.series = [voltageData, currentData]
    data.realtimeData.graph_2.series = [oTempData, sTempData]
    data.realtimeData.graph_3.series = [powerTemp, waterTemp]

    data.labelData.voltage = voltageData[4]
    data.labelData.current = currentData[4]
    data.labelData.oTemp = oTempData[4]
    data.labelData.sTemp = sTempData[4]
    data.labelData.power = powerTemp[4]
    data.labelData.water = waterTemp[4]
    realtimeChart1.update(data.realtimeData.graph_1);
    realtimeChart2.update(data.realtimeData.graph_2);
    realtimeChart3.update(data.realtimeData.graph_3);

    load_voltage_value.text(data.labelData.voltage)
    load_current_value.text(data.labelData.current)
    power_absorbed_value.text(data.labelData.power)
    operating_temp_value.text(data.labelData.oTemp)
    surface_temp_value.text(data.labelData.sTemp)
    water_breaker_value.text(data.labelData.water)


  })

//jQuery Addition

var sensorButton = $("#sensors-button");
var sensDropdown = $("#sensorsDropdown")
sensorButton.on("click", function(event) {
  $(this).toggleClass("is-active");
  sensDropdown.toggle("slide");
});

var navBar = $('ul#navBar li');

navBar.on("click", function() {
  var target = $(this).text();

  $(this).parent().find( 'li.is-active' ).removeClass( 'is-active' );
  $(this).addClass("is-active");

  if(target === ("Real-Time")) {
    $(".history").hide();
    $(".summary").hide();
    $(".settings").hide();
    $(".realTime").show("slow");
    dataType = DATA_TYPE_REAL_TIME
    fetchRealTimeData();
    setTimeout(() => {
      realtimeChart1.update(data.realtimeData.graph_1);
      realtimeChart2.update(data.realtimeData.graph_2);
      realtimeChart3.update(data.realtimeData.graph_3);
    }, 500)
  } 

  if(target === ("History")) {
    $(".realTime").hide("slow");
    $(".summary").hide();
    $(".settings").hide();
    $(".history").show("slow");
    dataType = DATA_TYPE_HISTORY;
    historyChart4.update(data.historyData.graph_1)
    historyChart5.update(data.historyData.graph_2)
    historyChart6.update(data.historyData.graph_3)
  } 

  if(target === ("Summary")) {
    $(".realTime").hide("slow");
    $(".history").hide();
    $(".settings").hide();
    $(".summary").show("slow");
  } 

  if(target === ("Settings")) {
    $(".realTime").hide('slow');
    $(".history").hide();
    $(".summary").hide();
    $(".settings").show("slow");
  } 
});


var userMenu = $("#userMenu");
var userMenuButton = $("#userMenuButton");
userMenuButton.on('click', (event) => {
  userMenu.fadeToggle(100);
})

var logOutButton = $('#logout');
logOutButton.on('click', (event) => [
  console.log('logout pressed')
])
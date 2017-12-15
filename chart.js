var chart = {

	init: function init(){
		
		this.cacheDom();
		this.setCurrencyValue();
		this.bindEvents();
		
	},

	setCurrencyValue: function setCurrencyValue(currency='eur'){
		this.currency = currency;
		this.makeCall();
	},

	cacheDom: function cacheDom(){
		this.lineChart = $("#line-chart")[0];

		//options for currencys
		this.radioInput = $('form input:radio');
	},

	makeCall: function makeCall(){
		var self = this;
		var values = [];
		$.when(this.ajaxCall(this.currency)).then(function(data){
			values['mid'] = (self.createArray(data, 'rates', 'mid'));
			values['date'] = self.createArray(data, 'rates', 'effectiveDate');
			values['code'] = data['code'];
			self.drawChart(values);
		})
	},

	ajaxCall: function ajaxCall(currency){
		return $.get('http://api.nbp.pl/api/exchangerates/rates/a/'+currency+'/last/10/?format=json');
	},

	createArray: function createArray(msg, objectKey, property){
		var value = []
			for (var i = 0; i < msg[objectKey].length; i++) {
				value.push(msg[objectKey][i][property]);
			};
			value = Object.keys(value).map(function (key) { return value[key]; });
		return value;
	},

	drawChart: function drawChart(data){
		console.log(data['mid']);
		new Chart(this.lineChart, {
		  type: 'line',
		  data: {
		    labels: data['date'],
		    datasets: [{ 
		        data: data['mid'],
		        label: data['code'],
		        borderColor: "#3e95cd",
		        fill: false
		      }
		    ]
		  },
		});
	},

	bindEvents: function bindEvents(){
		this.radioInput.change(this.getCurrencyValue.bind(this));
	},

	getCurrencyValue: function getCurrencyValue(){
		this.setCurrencyValue($('input[name=currency]:checked', '#currencyForm').val());
	}


};


chart.init();




var chart = {
	values: [],
	currency: 'eur',

	init: function(){
		
		this.cacheDom();
		this.bindEvents();
		this.makeCall();
		
	},

	cacheDom: function(){
		this.lineChart = $("#line-chart")[0];

		//options for currencies
		this.radioInput = $('form input:radio');
	},

	makeCall: function(){
		var self = this;
		$.when(this.ajaxCall(this.currency)).then(function(data){
			self.values['mid'] = (self.createArray(data, 'rates', 'mid'));
			self.values['date'] = self.createArray(data, 'rates', 'effectiveDate');
			self.values['code'] = data['code'];
			self.drawChart(self.values);
		})
	},

	ajaxCall: function(currency){
		return $.get('http://api.nbp.pl/api/exchangerates/rates/a/'+currency+'/2017-11-01/2017-12-01/?format=json');
	},

	createArray: function(msg, objectKey, property){
		var value = []
			for (var i = 0; i < msg[objectKey].length; i++) {
				value.push(msg[objectKey][i][property]);
			};
			value = Object.keys(value).map(function (key) { return value[key]; });
		return value;
	},

	drawChart: function(data){
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

	bindEvents: function(){
		this.radioInput.change(this.getCurrencyValue.bind(this));
	},

	getCurrencyValue: function(){
		this.currency = $('input[name=currency]:checked', '#currencyForm').val();
		this.makeCall();
	}


};


chart.init();




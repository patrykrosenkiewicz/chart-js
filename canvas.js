var chart = {

	init: function(currency){
		var self = this;
		var values = [];
		$.when(this.ajaxCall(currency)).then(function(data){
			values['mid'] = (self.createArray(data, 'rates', 'mid'));
			values['date'] = self.createArray(data, 'rates', 'effectiveDate');
			values['code'] = data['code'];
			self.drawChart(values);
		})
	},


	ajaxCall: function(currency){
		return $.get('http://api.nbp.pl/api/exchangerates/rates/a/'+currency+'/last/10/?format=json');
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
		new Chart(document.getElementById("line-chart"), {
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
	}

};


chart.init('sek');




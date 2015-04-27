$(document).ready(function () {
	var image_container = $('.active-image'),
		current_title = $('.active-title'),
		i = 0; // global image/story number
		var data_container = [];

	$.ajax({
		url: 'http://localhost:5000/retrieveNews',
		type: 'GET',
		dataType: 'json',
		success: function (data) {
			data_container = data.news;
			cycleImages(data_container);
		},
		error: function (err) {
			console.log(err);
		}
	});

	function cycleImages (images) {
		var max = images.length; 
		console.log(images);                    
		setInterval(function () { 
			i++;

			if (i > (max - 1))
				i = 0;
			
			$("#carousel-item-" + (i + 1)).prop('checked', true);
			swapImage(images[i]['image_url'], images[i]['id']);
			swapTitle(images[i]['headline'], images[i]['intro']);
			
		}, 10000);
	}

	function swapImage (url, id) {
		url = "url(" + url + ")"; 
		image_container.css('background-image', url);
		current_title.click(function () {
			window.location.pathname = "/news/" + id;
		});
	}

	// could break with new data
	$("input[name='carousel-dots']").click(function (e) {
		var news_id = Number(this.id.substring(14)) - 1; // get the array id from the number
		i = news_id;
		swapImage(data_container[news_id]['image_url'], data_container[news_id]['id']);
		swapTitle(data_container[news_id]['headline'], data_container[news_id]['intro']);
	});

	function swapTitle (title, subtitle) {
		var contents = title + '<br>' + 
			'<i class="active-description">' + subtitle + '</i>';
		current_title.html(contents);
	}

});
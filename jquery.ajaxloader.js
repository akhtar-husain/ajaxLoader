/**
* @author: Akhtar Husain <akhtar4660@gmail.com>
* @version: 1.0.0
* @description: This plugin is used to implement the infinite pagination, To use it simply call the function with selector along with options.
* @example- $('#container').ajaxLoader({limit: 10, delay: 1000, path: 'ajax.php' });
*/

"use strict";

(function($){
	$.fn.ajaxLoader = function (options) {
		var flag = true;
		var no_data = true;
		var settings = {
			limit : 3, 		// Record limit
			offset : 0, 	// Offset to get record
			path : '', 		// Ajax request url
			delay : 500		// Time to show the loader ( ms. )
		}
		if (options) {
			$.extend(settings, options);
		}

		return this.each(function(){
			var _this = $(this);
			var $settings = settings;
			var loader = '<div id="loader"><i class="fa fa-spinner fa-pulse fa-2x fa-fw"></i><p>Loading...</p></div>';
			var style = '<style>#loader {position:relative;bottom:0;left:0;background:rgba(0,0,0,.075);width:100%;text-align:center;display: none;color: #286090;} #loader>p{color:#286090;}</style>';
			$('head').append(style);
			_this.after(loader);
			function getRecords() {
				$.ajax({
					url : $settings.path,
					method: 'post',
					data: {
						'offset' : $settings.offset,
						'limit' : $settings.limit
					},
					success: function( data ) {
						flag = true;
						$('#loader').hide();
						if (data) {
							_this.append(data);
						} else {
							no_data = false;
						}
					},
					error: function( data ){
						flag = true;
						$('#loader').hide();
						no_data = false;
						_this.append('<p class="label label-danger">Something went wrong, Please contact admin</p>');
					}
				});
			}
			getRecords(); // To load initial data

			$(window).scroll(function() {
				if($(window).scrollTop() + $(window).height() > _this.height()){
					if(flag && no_data){
						$('#loader').show();
						flag = false;
						setTimeout(function() {
							$settings.offset = eval($settings.offset + $settings.limit);
							getRecords();
						}, $settings.delay);
					}
				}
			});

		});
	}
})(jQuery);

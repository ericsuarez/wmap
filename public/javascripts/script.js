






$( document ).ready(function() {
	



	options = [];


	$( "#scan" ).click(function(e) {
		e.stopPropagation();
		action();
	});


	$("body").on("click", ".list-group-item", function(e){
		e.stopPropagation();
		if($(this).hasClass("active")){
			$(this).removeClass("active");
			let index = options.indexOf($(this).attr('value'));
			options.splice(index,1);
		}
		else{
			$(this).addClass("active");
			options.push($(this).attr('value'));
		}
	});









	function action(){
		let string = "";
		let ip;
		let range;
		let t; 
		$( ".text" ).text('Loading...');
		


		for(let i in options){
			if(i != options.length-1)
				string += options[i] + ' ';
			else
				string += options[i]
		}


		if($("#ip").val() != '') 		ip = $("#ip").val();
		if($("#range").val() != '') 	range = $("#range").val();
		if($("#t").val() != '') 		t = $("#t").val();

		function obteniendonmap() {
			return new Promise(function (resolve, reject) {
				$.get("scan", {string:string,ip:ip,range:range,t:t}, function (data, status) {
					console.log("la respuesta da " + data);
					resolve(data);
					if (status != "success") {
						reject(status);
					}
				});
			});
		}

		obteniendonmap().then((respuesta,rej) =>{
			respuesta = respuesta.replace(/\\n/g,"<br>");
			respuesta = respuesta.replace(/"/g,' ');

			$( ".textc" ).html(respuesta);
			if(!rej)
				$(".text").text("Scanned Success!")
			else{
				$(".text").text(rej);
			}
		})
	}



});





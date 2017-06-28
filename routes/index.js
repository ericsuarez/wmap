var express = require('express');
var router = express.Router();

var shell = require('shelljs');




function prepare(){
	return new Promise((res,rej) =>{
		let resultado = "";
		if(arguments.length == 0){
			rej("Error no se encuentra resultado");
		}

		for (var i = 0; i < arguments.length; i++){
			if(arguments[i] != ""){
				if(i == arguments.length-1)
					resultado += arguments[i];
				else
					resultado += arguments[i] + ' ';
			}

		}

		if(resultado != "") {
			console.log("resultado da " +resultado);
			res(resultado);
		}
		else res(" ");
	});

}






/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Service Nmap' });
});





router.get('/scan',function(req,res,next){


	let range = "";
	let t = "";
	let string = "";
	let ip = req.query.ip || "127.0.0.1";
	let result;

	if(req.query.range != undefined){ 
		range += "-p [" + req.query.range + "]"; 
	}
	if(req.query.t != undefined) {
		t += "-T " + req.query.t;
	}
	if(req.query.string != undefined) string += req.query.string;



	console.log("range da "  + range);
	console.log("t da " + t);
	console.log("string da " + string);
	console.log("ip da " + req.query.ip);

	
	prepare(string,range,t).then((resp,rej) =>{
		
		if(rej) res.send(rej);
		
		else{
			shell.exec('nmap ' + resp + ' ' + ip,function(code,msg,err){
				if(err) res.send(JSON.stringify(err));
				else res.send(JSON.stringify(msg));
			});
		} 
	
		
	
	});





});



module.exports = router;

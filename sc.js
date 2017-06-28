var nmap = require('node-nmap');
 
nmap.nmapLocation = "nmap"; //default 



//    Accepts array or comma separarted string for custom nmap commands in the second argument. 
var nmapscan = new nmap.NmapScan('127.0.0.1', '-sn');
 
nmapscan.on('complete',function(data){
  console.log(data);
});
nmapscan.on('error', function(error){
  console.log(error);
});
 
nmapscan.startScan();
 


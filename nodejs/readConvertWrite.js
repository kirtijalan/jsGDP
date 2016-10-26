//create file system
var fs = require("fs");
var header, headerLength;
var obj = {};
var index = 0;
var j = 0;
//write Stream in append mode
var country2013data = fs.createWriteStream('./../json/data2013.json',{'flags':'a'});
//var gdp = fs.createWriteStream('./../json/gdpCountry.json',{'flags':'a'});
//var purchasingPower = fs.createWriteStream('./../json/purchasingPowerCountry.json',{'flags':'a'});
//create Input for reading
var input = fs.createReadStream("./../data/datafile.csv");
//readline and interface
var rl = require("readline").createInterface({
  input: input,
  terminal: false
});
//rl data
rl.on('line',function(line){
  //read header
  if(index === 0){
    //set header
    header=line.split(",");
    for(var ind=0; ind < header.length; ind++)
    {
      header[ind] = header[ind].replace(/"/g,'');
      //console.log(ind,header[ind]);
    }
    index = 1;
  }
  else {
	  var obj = {};
	  var currentline=line.split(",");
    //obj[header[j]] = currentline[j];
    //var firstWord = header[j].substr(0, header[j].indexOf(" "));
    //if(header[j].slice(-4)==="2013"){
    if(j===0){
        country2013data.write("[" + '\n');
    }
    country2013data.write("{" + '\n');
    country2013data.write('"' + "country" + '" : ' + currentline[0] + ',\n');
    country2013data.write('"' + "population" + '" : ' + parseFloat(currentline[5].replace('"','')) + ',\n');
    country2013data.write('"' + "gdp" + '" : ' + parseFloat(currentline[9].replace('"','')) + ',\n');
    if(j<19)
      country2013data.write('"' + "purchasingPower" + '" : ' + parseFloat(currentline[17].replace('"','')) + '\n},\n');
    else
      country2013data.write('"' + "purchasingPower" + '" : ' + parseFloat(currentline[17].replace('"','')) + '\n}');
    j++;
    if(j===20){
      country2013data.write('\n]');
    }

    }
  // }
});

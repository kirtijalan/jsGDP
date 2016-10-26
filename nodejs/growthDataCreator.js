var header ="";
var index = 0;
var value = "";
var itemsWritten = 0;

var fs = require("fs");
var writeStream = fs.createWriteStream('./../json/growthData.json',{'flags':'a'});

var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('./../data/datafile.csv')
});

lineReader.on('line', function (line) //reads line by line
{
	if( index === 0)  //reading header
	{
		header = line.split(',');
		index = 1;
	}
	else if (index === 1)  //writing 1st object
	{
		value = line.split(',');

		writeStream.write('[{');

		for(var i=0; i<header.length; i++)
		{
			//console.log(header[i] == "\"Country Name\"");
			if( (header[i] == "\"Country Name\"") || (header[i] == "\"Population (Millions) - 2013\"") || (header[i] == "\"Population (Millions) - 2012\"") || (header[i] == "\"Population (Millions) - 2011\"") || (header[i] == "\"Population (Millions) - 2010\"") || (header[i] == "\"Purchasing Power in Billions ( Current International Dollar) - 2013\"") || (header[i] == "\"Purchasing Power in Billions ( Current International Dollar) - 2012\"") || (header[i] == "\"Purchasing Power in Billions ( Current International Dollar) - 2011\"") || (header[i] == "\"Purchasing Power in Billions ( Current International Dollar) - 2010\""))
			{
				if(itemsWritten === 0)
				{
					writeStream.write(header[i] + ":" + value[i]);
					itemsWritten++;
				}
				else
				{
					writeStream.write("," + header[i] + ":" + parseFloat(value[i].replace('"','')));
					itemsWritten = (itemsWritten + 1)%9;
				}
			}
		}

		writeStream.write('}');

		index = 2;  //for all other rows
	}
	else  //write other objects
	{
		value = line.split(',');

		writeStream.write(',\n{');

		for(var i=0; i<header.length; i++)
		{
			if((header[i] == "\"Country Name\"") || (header[i] == "\"Population (Millions) - 2013\"") || (header[i] == "\"Population (Millions) - 2012\"") || (header[i] == "\"Population (Millions) - 2011\"") || (header[i] == "\"Population (Millions) - 2010\"") || (header[i] == "\"Purchasing Power in Billions ( Current International Dollar) - 2013\"") || (header[i] == "\"Purchasing Power in Billions ( Current International Dollar) - 2012\"") || (header[i] == "\"Purchasing Power in Billions ( Current International Dollar) - 2011\"") || (header[i] == "\"Purchasing Power in Billions ( Current International Dollar) - 2010\""))
			{
				if(itemsWritten === 0)
				{
					writeStream.write(header[i] + ":" + value[i]);
					itemsWritten++;
				}
				else
				{
					writeStream.write("," + header[i] + ":" + parseFloat(value[i].replace('"','')));
					itemsWritten = (itemsWritten + 1)%9;
				}
			}
		}
		writeStream.write('}');
	}
  //writeStream.write(line + "\n"); //write line to the file
}).on('close',function(line)
{
	writeStream.write(']');
});

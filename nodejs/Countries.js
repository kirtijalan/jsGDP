const readline = require('readline');
const fs = require('fs');
var i = 0,
    count = 0;
var indexCountry, indexGDP, indexPopulation10, indexPopulation13;
var indexPurchasingPowerByCountry13, indexPurchasingPowerByCountry10;
var country, population10, population13;
var GDP, indexGDP10;
var purchasingPowerByCountry10, purchasingPowerByCountry13;
var GrowthArray = [];
var populationArray = [];
var GDPArray = [];
var purchasingPowerByCountryArray = [];
var countryArray = [];
var populationGrowth, purchasingPowerGrowth;
var limit, limit1, index, index1;
var asiaContinent = ['India', 'China', 'Japan', 'Indonesia'];
var europeContinent = ['France', 'Russia', 'UK', 'Italy'];
var northAmericaContinent = ['Japan', 'Mexico', 'canada', 'USA'];
var southAmericaContinent = ['Saudi Arabia', 'Republic of Korea', 'Turkey'];
var australiaContinent = ['United Kingdom', 'Australia'];
var africaContinent = ['South Africa', 'Argentina', 'Brazil'];
var aggregateArray = [];
var arrContinentwisePopulation = [0, 0, 0, 0, 0, 0];
var arrContinentwiseGDP = [0, 0, 0, 0, 0, 0];
var arrContinents = ["africa", "europe", "northAmerica", "southAmerica", "australia", "asia"];
const rl = readline.createInterface({
    input: fs.createReadStream('datafile.csv')
});

function aggregate(arrContinents, arrContinentwisePopulation, arrContinentwiseGDP) {
    this.continent = arrContinents;
    this.population = arrContinentwisePopulation;
    this.GDP = arrContinentwiseGDP;

}

function populationChart(country, population13) {

    this.country = country;
    this.population13 = population13;
};

function GDPChart(country, GDP) {
    this.country = country;
    this.GDP = GDP;

};

function purchasingPowerChart(country, purchasingPowesrByCountry13) {
    this.country = country;
    this.purchasingPowerByCountry13 = purchasingPowerByCountry13;

};

function GrowthChart(country, populationGrowth, purchasingPowerGrowth) {
    this.country = country;
    this.populationGrowth = populationGrowth;
    this.purchasingPowerGrowth = purchasingPowerGrowth;
};

rl.on('line', function(line) {
    var lineRecords = line.trim().split(',');;

    if (i < 1) {
        indexCountry = lineRecords.indexOf('Country Name');
        indexPopulation10 = lineRecords.indexOf('Population (Millions) 2010');
        indexPopulation13 = lineRecords.indexOf('Population (Millions) 2013');
        indexGDP = lineRecords.indexOf('GDP Billions (USD) 2013');
        indexGDP10 = lineRecords.indexOf('GDP Billions (USD) 2010');
        indexPurchasingPowerByCountry10 = lineRecords.indexOf('Gross domestic product based on Purchasing-Power-Parity (PPP) valuation of Country GDP in Billions (Current International Dollar) 2010');
        indexPurchasingPowerByCountry13 = lineRecords.indexOf('Gross domestic product based on Purchasing-Power-Parity (PPP) valuation of Country GDP in Billions (Current International Dollar) 2013');
        i++;
    } else {
        count++;
        country = lineRecords[indexCountry];
        if (!(country.indexOf("European Union") > -1 || country.indexOf("World") > -1)) {
            population10 = lineRecords[indexPopulation10];
            population13 = lineRecords[indexPopulation13];
            GDP = lineRecords[indexGDP];
            purchasingPowerByCountry10 = lineRecords[indexPurchasingPowerByCountry10];
            purchasingPowerByCountry13 = lineRecords[indexPurchasingPowerByCountry13];
            populationGrowth = (parseFloat(population13)*1000) - (parseFloat(population10)*1000);
            purchasingPowerGrowth = parseFloat(purchasingPowerByCountry13) - parseFloat(purchasingPowerByCountry10);
            populationArray.push(new populationChart(country, population13));
            GDPArray.push(new GDPChart(country, GDP));
            purchasingPowerByCountryArray.push(new purchasingPowerChart(country, purchasingPowerByCountry13));
            populationArray.sort(function(a, b) {
                return parseFloat(b.population13) - parseFloat(a.population13)
            });
            GDPArray.sort(function(a, b) {
                return parseFloat(b.GDP) - parseFloat(a.GDP)
            });
            purchasingPowerByCountryArray.sort(function(a, b) {
                return parseFloat(b.purchasingPowerByCountry13) - parseFloat(a.purchasingPowerByCountry13)
            });
            GrowthArray.push(new GrowthChart(country, populationGrowth, purchasingPowerGrowth));

            index = parseInt(indexPopulation10);
            index1 = parseInt(indexGDP10);

            limitpop = indexPopulation10 + parseInt(6);
            limitGDP = indexGDP10 + parseInt(6);
            for (index = indexPopulation10; index < limitpop; index++) {
                if (africaContinent.indexOf(country) > -1) {
                    continent = arrContinents[0];
                    arrContinentwisePopulation[0] = parseFloat(arrContinentwisePopulation[0]) + parseFloat(lineRecords[index]);

                } else if (europeContinent.indexOf(country) > -1) {
                    continent = arrContinents[1];
                    arrContinentwisePopulation[1] = parseFloat(arrContinentwisePopulation[1]) + parseFloat(lineRecords[index]);
                } else if (northAmericaContinent.indexOf(country) > -1) {
                    continent = arrContinents[2];
                    arrContinentwisePopulation[2] = parseFloat(arrContinentwisePopulation[2]) + parseFloat(lineRecords[index]);

                } else if (southAmericaContinent.indexOf(country) > -1) {
                    continent = arrContinents[3];
                    arrContinentwisePopulation[3] = parseFloat(arrContinentwisePopulation[3]) + parseFloat(lineRecords[index]);

                } else if (australiaContinent.indexOf(country) > -1) {
                    continent = arrContinents[4];
                    arrContinentwisePopulation[4] = parseFloat(arrContinentwisePopulation[4]) + parseFloat(lineRecords[index]);

                } else if (asiaContinent.indexOf(country) > -1) {
                    continent = arrContinents[5];

                    arrContinentwisePopulation[5] = parseFloat(arrContinentwisePopulation[5]) + parseFloat(lineRecords[index]);

                }
            }




            for (index1 = indexGDP10; index1 < limitGDP; index1++) {
                if (africaContinent.indexOf(country) > -1) {
                    continent = arrContinents[0];
                    arrContinentwiseGDP[0] = parseFloat(arrContinentwiseGDP[0]) + parseFloat(lineRecords[index1]);


                } else
                if (europeContinent.indexOf(country) > -1) {
                    continent = arrContinents[1];
                    arrContinentwiseGDP[1] = parseFloat(arrContinentwiseGDP[1]) + parseFloat(lineRecords[index1]);

                } else if (northAmericaContinent.indexOf(country) > -1) {
                    continent = arrContinents[2];
                    arrContinentwiseGDP[2] = parseFloat(arrContinentwiseGDP[2]) + parseFloat(lineRecords[index1]);

                } else if (southAmericaContinent.indexOf(country) > -1) {
                    continent = arrContinents[3];
                    arrContinentwiseGDP[3] = parseFloat(arrContinentwiseGDP[3]) + parseFloat(lineRecords[index1]);

                } else if (australiaContinent.indexOf(country) > -1) {

                    continent = arrContinents[4];
                    arrContinentwiseGDP[4] = parseFloat(arrContinentwiseGDP[4]) + parseFloat(lineRecords[index]);

                } else if (asiaContinent.indexOf(country) > -1) {
                    continent = arrContinents[5];
                    arrContinentwiseGDP[5] = parseFloat(arrContinentwiseGDP[5]) + parseFloat(lineRecords[index]);

                }

            }

            //  console.log(populationArray);
            // console.log(GDPArray);
            // console.log(purchasingPowerByCountryArray);
            //console.log(GrowthArray);
            if (country.length == 0) {
                for (var it = 0; it < 6; it++) {
                    aggregateArray.push(new aggregate(arrContinents[it], arrContinentwisePopulation[it], arrContinentwiseGDP[it]));
                }
                fs.writeFileSync("json/aggregate.json", JSON.stringify(aggregateArray), encoding = "utf8");
            }

            fs.writeFileSync("json/population.json", JSON.stringify(populationArray), encoding = "utf8");
            fs.writeFileSync("json/GDP.json", JSON.stringify(GDPArray), encoding = "utf8");
            fs.writeFileSync("json/Purchasingpower.json", JSON.stringify(purchasingPowerByCountryArray), encoding = "utf8");
            fs.writeFileSync("json/GrowthChart.json", JSON.stringify(GrowthArray), encoding = "utf8");

        }

    }


});

module.exports = function convertCsv(startYear) {
    if (typeof startYear !== 'number' || isNaN(startYear)) { /*Testing of year*/
        throw new Error('Not a number');
    }
    const fs = require('fs');
    let firstcri = []; /*Array for storing result of first criteria*/
    let secondcri = []; /*Array for storing result of second criteria*/

    let readLine = require('readline');
    let rd = readLine.createInterface({
        input: fs.createReadStream('crimedata.csv'),
        output: process.stdout,
        terminal: false
    });
    rd.on('line', function(lines) {
        let line = lines.split(/,(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/);

        let obj = {};
        let contain = -1;
        let contain1 = -1;
        let Year = line[17];
        let Type = line[5];
        let Description = line[6];
        let Arrest = line[8];
        for (let j = 0; j < firstcri.length; j = j + 1) { /*checking the year already contained in array*/
            if (Year === firstcri[j].Year) {
                contain = j; /*storing index of year if it contained in array*/
            }
        }
        if (Type === 'THEFT' && Description === 'OVER $500') { /*Checking the first criteria first condition*/
            if (contain > -1) {
                firstcri[contain].Over = firstcri[contain].Over + 1;
            } else {
                obj.Year = Year;
                obj.Over = 1;
                obj.Under = 0;
                firstcri.push(obj);
            }
        } else if (Type === 'THEFT' && Description === '$500 AND UNDER') { /*Checking the first criteria second condition*/
            if (contain > -1) {
                firstcri[contain].Under = firstcri[contain].Under + 1;
            } else {
                obj.Year = Year;
                obj.Over = 0;
                obj.Under = 1;
                firstcri.push(obj);
            }
        }
        // jsonfile.writeFileSync(file1,firstcri);
        for (let j = 0; j < secondcri.length; j = j + 1) { /*checking the year already contained in array for second criteria*/
            if (Year === secondcri[j].Year) {
                contain1 = j;
            }
        }
        if (Type === 'ASSAULT' && Arrest === 'true') { /*Checking the second criteria first condition*/
            if (contain1 > -1) {
                secondcri[contain1].Arrested = secondcri[contain1].Arrested + 1;
            } else {
                obj.Year = Year;
                obj.Arrested = 1;
                obj.NotArrested = 0;
                secondcri.push(obj);
            }
        } else if (Type === 'ASSAULT' && Arrest === 'false') { /*Checking the second criteria second condition*/
            if (contain1 > -1) {
                secondcri[contain1].NotArrested = secondcri[contain1].NotArrested + 1;
            } else {
                obj.Year = Year;
                obj.Arrested = 0;
                obj.NotArrested = 1;
                secondcri.push(obj);
            }
        }
    });
    rd.on('close', function() {
        firstcri.sort(function(a, b) { /*sorting the result of firstcriteria based on year property*/
            return a.Year - b.Year;
        });
        secondcri.sort(function(a, b) { /*sorting the result of secondcriteria based on year property*/
            return a.Year - b.Year;
        });
        fs.writeFileSync('../outputdata/barchart.json', JSON.stringify(firstcri)); /*converting the result into JSON and writing in JSON file first cri*/
        fs.writeFileSync('../outputdata/linechart.json', JSON.stringify(secondcri)); /*converting the result into JSON and writing in JSON file first cri*/
    });
    return 'JSON written successfully';
};

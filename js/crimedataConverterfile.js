module.exports = function convertCsv(startYear) {
    if (typeof startYear !== 'number' || isNaN(startYear)) { /*Testing of year*/
        throw new Error('Not a number');
    }
    const fs = require('fs');
    let Firstcri = []; /*Array for storing result of first criteria*/
    let Secondcri = []; /*Array for storing result of second criteria*/

    let ReadLine = require('ReadLine');
    let Rd = ReadLine.createInterface({
        input: fs.createReadStream('crimedata.csv'),
        output: process.stdout,
        terminal: false
    });
    Rd.on('line', function(lines) {
        let line = lines.split(/,(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/);

        let Obj = {};
        let Contain = -1;
        let Contain1 = -1;
        let Year = line[17];
        let Type = line[5];
        let Description = line[6];
        let Arrest = line[8];
        for (let j = 0; j < Firstcri.length; j = j + 1) { /*checking the year already Contained in array*/
            if (Year === Firstcri[j].Year) {
                Contain = j; /*storing index of year if it Contained in array*/
            }
        }
        if (Type === 'THEFT' && Description === 'OVER $500') { /*Checking the first criteria first condition*/
            if (Contain > -1) {
                Firstcri[Contain].Over = Firstcri[Contain].Over + 1;
            } else {
                obj.Year = Year;
                obj.Over = 1;
                obj.Under = 0;
                Firstcri.push(obj);
            }
        } else if (Type === 'THEFT' && Description === '$500 AND UNDER') { /*Checking the first criteria second condition*/
            if (Contain > -1) {
                Firstcri[Contain].Under = Firstcri[Contain].Under + 1;
            } else {
                obj.Year = Year;
                obj.Over = 0;
                obj.Under = 1;
                Firstcri.push(obj);
            }
        }
        // jsonfile.writeFileSync(file1,Firstcri);
        for (let j = 0; j < Secondcri.length; j = j + 1) { /*checking the year already Contained in array for second criteria*/
            if (Year === Secondcri[j].Year) {
                Contain1 = j;
            }
        }
        if (Type === 'ASSAULT' && Arrest === 'true') { /*Checking the second criteria first condition*/
            if (Contain1 > -1) {
                Secondcri[Contain1].Arrested = Secondcri[Contain1].Arrested + 1;
            } else {
                obj.Year = Year;
                obj.Arrested = 1;
                obj.NotArrested = 0;
                Secondcri.push(obj);
            }
        } else if (Type === 'ASSAULT' && Arrest === 'false') { /*Checking the second criteria second condition*/
            if (Contain1 > -1) {
                Secondcri[Contain1].NotArrested = Secondcri[Contain1].NotArrested + 1;
            } else {
                obj.Year = Year;
                obj.Arrested = 0;
                obj.NotArrested = 1;
                Secondcri.push(obj);
            }
        }
    });
    Rd.on('close', function() {
        Firstcri.sort(function(a, b) { /*sorting the result of Firstcriteria based on year property*/
            return a.Year - b.Year;
        });
        Secondcri.sort(function(a, b) { /*sorting the result of Secondcriteria based on year property*/
            return a.Year - b.Year;
        });
        fs.writeFileSync('../outputdata/barchart.json', JSON.stringify(Firstcri)); /*converting the result into JSON and writing in JSON file first cri*/
        fs.writeFileSync('../outputdata/linechart.json', JSON.stringify(Secondcri)); /*converting the result into JSON and writing in JSON file first cri*/
    });
    return 'JSON written successfully';
};

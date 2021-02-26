const csv = require("csv-parser");
const fs = require("fs");
const json = require('./input.json')

const script = async () => {
  const results = [];
  let tempJson = []
  fs.createReadStream("input.csv")
    .pipe(csv())
    .on("data", (data) => results.push(data))
    .on("end", () => {
        tempJson = json.map((row, index) => {

            const foundTranslation = results.some(result => result.ENGLISH === row.name)
            console.log(foundTranslation)
            if(foundTranslation) {
                // console.log()
                return {
                    ...row,
                    name: results.find(result => result.ENGLISH === row.name).KOREAN
                }
            }
        })
        
        fs.writeFile('output.json', JSON.stringify(tempJson), (err) => {
            if (err) {
                throw err;
            }
            console.log("JSON data is saved.");
        });
    });
};

script();

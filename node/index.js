/**
 * Node reorder must be used you prefer 'server-side' solution to reorder file elements.
 */
const fs = require('fs');
const data = fs.readFileSync('<input file location>', {encoding:'utf8', flag:'r'});
const json = JSON.parse(data);

//reorder elements of postman environment
json.values = json.values.sort((a, b) => {
    if (a.key > b.key) {
      return 1;
    }
    if (a.key < b.key) {
      return -1;
    }
    return 0;  // a equal to b
});

fs.writeFileSync('<output file location>', JSON.stringify(json), {encoding: "utf8"});  
console.log("Reorder process finished!");
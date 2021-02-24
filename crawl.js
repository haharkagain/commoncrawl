const fs = require("fs");
const http = require("http");
const { recordIterator } = require("node-warc");
const zlib = require("zlib");

var inputFile = fs.createReadStream('paths/oct.paths');
let covidKeyWords = /coronavirus|covid/ig;
let economyKeyWords = /economy|market/ig

function readLines(input) { // function that takes the paths file and parses it into urls
    var remaining = '';
    input.on('data', function(data) {
        remaining += data;
        var index = remaining.indexOf('\n');
        var last  = 0;
        while (index > -1) {
            var line = remaining.substring(last, index);
            last = index + 1;
            crawlUrls.push(urlPrefix + line);
            index = remaining.indexOf('\n', last);
        }
        remaining = remaining.substring(last);
    });
    input.on('end', function() {
        console.log("paths found, beginning parse and search")
        checkPath(crawlUrls[0]) // start the hit checking
    });
}


function checkPath(fileName) { // function that takes url and prints hit urls on urlhits.txt
    let hits = 0;
    let entries = 0;
    async function iterateRecords(warcStream) {
        for await (const record of recordIterator(warcStream)) {
            if ((record.warcHeader["WARC-Target-URI"] && record.warcHeader["WARC-Target-URI"].indexOf(".com/") < 0)) {
                continue;
            } 
            entries++;
            const string = record.content.toString("utf-8"); 
            if ((string.match(covidKeyWords)) && (string.match(economyKeyWords))) { // checks if a match exists
                if ((string.match(covidKeyWords).length > 3) && (string.match(economyKeyWords).length > 3)) { // checks if there are at least a few matches so single tags don't trigger 
                    hits++;
                    fs.appendFileSync("urlhits.txt", record.warcHeader["WARC-Target-URI"] + "\n"); // writes to file, sync because stuff can get out of hand with async writing to file
                }
            }
        }
    }
            http.get(fileName, res => { // start the async function and restart after the first url
              iterateRecords(res.pipe(zlib.createGunzip())).then(() => {
                console.log(`${hits} of ${entries} hit`);
                if (index < crawlUrls.length) {
                    index++
                    checkPath(crawlUrls[index])
                }
              });
            }); 
}

let urlPrefix = "http://commoncrawl.s3.amazonaws.com/"
var crawlUrls = []
var index = 0;
fs.writeFile("urlhits.txt", "", function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("output cleared for writing")
  });
readLines(inputFile);


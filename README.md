# covid/economy article searcher using commoncrawl
Tool that looks for articles related to coronavirus and the economy, and outputs the url into a text file.
The repository is missing the node modules folder, but it is simple to install, and a sizeable fraction of the october path has been parsed.
The tool is currently configured to just look at October 2020, but there are paths for all of 2020 in the paths folder that can be linked instead.
The output is in urlhits.txt.

To run:
install node and npm install node-warc, then in the command line: node crawl.js

To stop:
ctrl+C (it writes to file as it goes, so you get all the data you waited for)

The program can only use one set of paths at a time, but you can set it to any of the 9 path files that I downloaded from commoncrawl.

I used Node because I was more comfortable with running and testing on Node than on Python. 
In addition, it is roughly as fast as Python for working with WARC (https://code402.com/blog/hello-warc-common-crawl-code-samples/).

I started with the given tutorial repository on the assignment, where Node was one of the languages used.
I spent the first few hours playing around with the tutorial program and figuring out how each part works.

After getting my bearings, I edited my program to look for "covid", and add the urls to a list.
I then added the check for the economy, and made the program write to a file.
The final few hours was spent trying out ways to make the program more accurate with its hits. 
To find relevant sites, I use keywords and look for at least 3 hits for "coronavirus" or "covid" and 3 hits for "economy" or "market".
However, there are still many irrelevant hits. Front pages of sites cause false hits because there may be many articles listed that have the keywords in the title, but no actual article. A similar problem occurs when a website has recommended future reading.

To improve the accuracy, there are two ways I can think to improve the program that I couldn't implement today:

- Not allowing roots of websites (checking if the url has at least 4 slashes), had some issues with that
- Using the news database for commoncrawler, however I couldn't find the paths for that.
- Using WARC instead of WET files, as they have HTML info and I can only look for keywords inside of specific tags instead of keywords in the whole site.

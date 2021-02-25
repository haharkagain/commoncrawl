# covid/economy article searcher using commoncrawl
Tool that looks for articles related to coronavirus and the economy, and outputs the url into a text file.
The repository is missing the node modules folder, but it is simple to install, and a sizeable fraction of the october path has been parsed.
The output is in urlhits.txt.

To run:
install node and
npm install node-warc

To stop:
ctrl+C (it writes to file as it goes, so you get all the data you waited for)

The program can only use one set of paths at a time, but you can set it to any of the 9 path files that I downloaded from commoncrawl.

I used Node because I was more comfortable with running and testing on Node than on Python. 
In addition, it is as fast as Python for working with WARC (https://code402.com/blog/hello-warc-common-crawl-code-samples/).

I started with the given tutorial repository on the assignment, where Node was one of the languages used.
I spent the first few hours playing around with the tutorial program and figuring out how each part works, and making the 
final decision to do the project in Node.

After getting my bearings, I edited my program to look for covid, and add the urls to a list.
I then added the check for the economy, and made the program write to a file.
The final few hours was spent trying out ways to make the program more accurate with its hits, however there are still many irrelevant hits.

To find relevant sites, I use keywords and look for at least 3 hits for "coronavirus" or "covid" and 3 hits for "economy" or "market".

To improve the accuracy, there are two ways I can think of to add:

- Not allowing roots of websites (checking if the url has at least 4 slashes)
- Using the news database for commoncrawler, however I couldn't find the paths for that.

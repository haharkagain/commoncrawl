# commoncrawl
Tool that looks for articles related to coronavirus and the economy, and outputs the url into a text file
The repository is missing the node modules folder, but it is simple to install, and a sizeable fraction of the october path has been parsed
and the output is in urlhits.txt

To run:
install node
npm install node-warc

To stop:
ctrl+C (it writes to file as it goes, so you get all the data you waited for)
The program can only use one set of paths at a time, but you can set it to any of the 9 path files downloaded from commoncrawl.

I used Node because I was more comfortable with running and testing on Node than on Python. 
In addition, it is as fast as Python for working with WARC (https://code402.com/blog/hello-warc-common-crawl-code-samples/).

I started with the given tutorial repository on the assignment, where Node was one of the languages used.
I 

To find relevant sites, I use keywords and look for at least 3 hits for coronavirus or covid, and 3 hits for economy or market.
However, the algorithm is spoofed by sites with a lot of useless tagging and front pages that may only have thumbnails with the hits


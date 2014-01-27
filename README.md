Youtube-Embed-Universal-Tracking
================================

This little JavaScript snippet allows you to handle the events (play, pause, ended, cued, buffering) of any Youtube 
embedded video and track it to your favorite analytics solution. 
It handles Google Analytics per default automaticaly, but you can use your own analytics solution easily.

Installation:

1 . Just include the script at the bottom of your HTML page. It will detect and track all iframes existing onto the page.

    <script type="text/javascript" src="yeut-1.0.js"></script>	

2 (optional) . If you use Google Analytics, no worries, all the tracking is done automaticaly. Otherwise, you must, after you included 
YEUT, redefine the following function:

    YTAnalyticsTrack = function(category, action, label){
        // category is "Videos" per default
        // action can be "Ended", "Playing", "Paused", "Buffering", "Cued"
        // label is the Youtube video ID
        // include your tracking code here
    }


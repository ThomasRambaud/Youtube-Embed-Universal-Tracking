var YTPlayers = [],
YTPlayersIds = [],
YTPlayersPreviousStatus = [],
YTOnPlayerStateChangeCustom = function(e){},
YTAnalyticsTrack = function(category, action, label){
    if(typeof ga != 'undefined'){
        ga('send', 'event', category, action, label);
    } else if(typeof _gaq != 'undefined'){
        _gaq.push(['_trackEvent', category, action, label]);
    }
},
YTAnalyticsEventGroup = 'Videos',
YTAnalyticsEventNames = [
    'Ended',
    'Playing',
    'Paused',
    'Buffering',
    'Cued'
];

function onYouTubeIframeAPIReady(event) {
    for(var i = 0, len = YTPlayersIds.length; i < len; i++){
        YTPlayers[YTPlayersIds[i]] = new YT.Player(YTPlayersIds[i], {
            videoId: YTPlayersIds[i],
            events: {
                'onStateChange': onPlayerStateChange
            }
        });	
    }
}

function onPlayerStateChange(event){
    var videoURL = event.target.getVideoUrl(),
    regex = /[?&]{1}v=([^&]+)/,
    matches = videoURL.match(regex),
    videoID = matches[1];

    YTOnPlayerStateChangeCustom(event);

    if ((event.data == YT.PlayerState.PAUSED && YTPlayersPreviousStatus[videoID] != YT.PlayerState.PAUSED) || event.data != YT.PlayerState.PAUSED){
        YTAnalyticsTrack(YTAnalyticsEventGroup, YTAnalyticsEventNames[event.data], videoID);
    }

    YTPlayersPreviousStatus[videoID] = event.data;
}

function appendIframeAPIScript(){
    var tag = document.createElement('script');
    tag.src = "http://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

function enableJSApiOnIframes(){
    var iframes = document.getElementsByTagName('iframe'),
    regexYoutubeEmbedURL = /^((http|https):)?\/\/(?:www\.)?youtu(\.be|be\.com)\/embed\/([\w-]{11})(\?)?$/,
    APIParam = 'enablejsapi=1&origin=' + window.location.origin;

    for(var i = 0, len = iframes.length; i < len; i++){
        var iframeSrc = iframes[i].src,
        matchUrl = iframeSrc.match(regexYoutubeEmbedURL);

        if(matchUrl !== null){			
            if(iframeSrc.indexOf('?') === -1){
                iframeSrc += '?';
            }else{
                iframeSrc += '&';
            }

            iframeSrc = iframeSrc + APIParam;

            iframes[i].setAttribute('src', iframeSrc);
            iframes[i].setAttribute('id', matchUrl[4]);

            YTPlayersIds.push(matchUrl[4]);
        }
    }
}

enableJSApiOnIframes();
appendIframeAPIScript();

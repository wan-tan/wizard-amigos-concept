// ---------------------------------------------------------------------------------------------------------------------------
// Initialize Firebase
// ---------------------------------------------------------------------------------------------------------------------------
var config = {
    apiKey: "AIzaSyBRxFRRmMpXY1RmDSFvf-OOpf76kDK7dw8",
    authDomain: "project-6372607757339212977.firebaseapp.com",
    databaseURL: "https://wizard-amigos.firebaseio.com/",
    storageBucket: "project-6372607757339212977.appspot.com",
};
firebase.initializeApp(config)
var ref = new Firebase('https://wizard-amigos.firebaseio.com/')






// ---------------------------------------------------------------------------------------------------------------------------
// LOAD VIDEO DATA
// ---------------------------------------------------------------------------------------------------------------------------
var playlistMeta = []
ref.child("videos").once('value', function (data) {
//     playlistMeta = data.val()
//     var dom = "<ul>"
//     for (x in playlistMeta){
//         dom += "<li onclick='gotoVideo(" + x + ")'>"+ x + " &nbsp; - &nbsp; " + playlistMeta[x].title + "</li>"
//     }
//     dom += "</ul>"
//     $(".modal-index").html(dom)
//     $(".title").html("<h1>"+playlistCursor+" - "+playlistMeta[playlistCursor].title+"</h1>")
//     $(".description").html("<p>"+playlistMeta[playlistCursor].desc+"</p>")
})






// ---------------------------------------------------------------------------------------------------------------------------
// LOAD VIDEO DATA
// ---------------------------------------------------------------------------------------------------------------------------
var json
ref.child("skills").once('value', function (data) {
    json = data.val()
    // console.log(json)
    initSkilltree();
})





// ---------------------------------------------------------------------------------------------------------------------------
// YOUTUBE PLAYER
// ---------------------------------------------------------------------------------------------------------------------------
var playlistData
var playlist = []
var playlistCursor = 0
var player

function onYouTubePlayerAPIReady() {
    player = new YT.Player('player', {
        // height: '390',
        // width: '640',
        // videoId: '-YzMiTUjUZw',
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    })
}

function onPlayerReady(event) {
    getYoutubePlaylist()
    loadVideo()
}

function onPlayerStateChange(event) {
    if(event.data === 0) {
        nextVideo();
    }
}

function getYoutubePlaylist(){
    $.get( "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=PLbtP2pUMT_hukdtCayfrk592awflW5GEe&key=AIzaSyA7fefWbbJbbO3_iogXyki31Va_mxsH7_4", function( data ) {
        playlistData = data
        for (i in playlistData.items){
            playlist.push(playlistData.items[i].snippet.resourceId.videoId)
        }
        player.cueVideoById(playlist[0])
    })
}

function loadVideo(){
    player.cueVideoById(playlist[playlistCursor])
    // $(".title").html("<h1>"+playlistCursor+" - "+playlistMeta[playlistCursor].title+"</h1>");
    // $(".description").html("<p>"+playlistMeta[playlistCursor].desc+"</p>");
}

function nextVideo(){
    if(playlistCursor < playlist.length - 1){
        playlistCursor++
        loadVideo()
    }
}

function prevVideo(){
    if(playlistCursor >= 1){
        playlistCursor--
        loadVideo()
    }
}

function gotoVideo(target){
    playlistCursor = target
    loadVideo()
    closeIndex()
}








// -----------------------------------------------------------------------------------------------------------------------
// ANIMATION TOGGLES
// -----------------------------------------------------------------------------------------------------------------------
function hideChat(){
    $("#chat").toggleClass("disabled-chat")
    $("#content").toggleClass("disabled-chat")
    $("#toggle-chat").toggleClass("disabled-chat")
}

function hideNav(){
    $("#nav").toggleClass("disabled-nav")
    $("#content").toggleClass("disabled-nav")
    $("#map").toggleClass("disabled-nav")
    $("#toggle-nav").toggleClass("disabled-nav")
}

function openIndex(){
    $(".modal-index").toggleClass("modal-index-active")
    $(".modal-bg").toggleClass("modal-index-active")
}

function closeIndex(){
    $(".modal-index").toggleClass("modal-index-active")
    $(".modal-bg").toggleClass("modal-index-active")
}

function openMap(){
    $("#map").addClass("open-map")
}




// ---------------------------------------------------------------------------------------------------------------------------
// INITIALIZE ANIMSITION
// ---------------------------------------------------------------------------------------------------------------------------
$(document).ready(function() {
    $(".animsition").animsition({
        inClass: 'fade-in',
        outClass: 'fade-out',
        inDuration: 1500,
        outDuration: 800,
        linkElement: '.animsition-link',
        // e.g. linkElement: 'a:not([target="_blank"]):not([href^="#"])'
        loading: true,
        loadingParentElement: 'body', //animsition wrapper element
        loadingClass: 'animsition-loading',
        loadingInner: '', // e.g '<img src="loading.svg" />'
        timeout: false,
        timeoutCountdown: 5000,
        onLoadEvent: true,
        browser: [ 'animation-duration', '-webkit-animation-duration'],
        // "browser" option allows you to disable the "animsition" in case the css property in the array is not supported by your browser.
        // The default setting is to disable the "animsition" in a browser that does not support "animation-duration".
        overlay : false,
        overlayClass : 'animsition-overlay-slide',
        overlayParentElement : 'body',
        transition: function(url){
            window.location.href = url
        }
    })

})

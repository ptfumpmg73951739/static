$(function () {
    _gggd();
})

function _gggd() {
    if (!document.getElementById("comment-list"))
        return false;
    var area = document.getElementById('comment-list');
    var iliHeight = 20;
    var speed = 10;
    var time;
    var delay = 3000;
    area.scrollTop = 0;
    area.innerHTML += area.innerHTML;
    function startScroll() {
        time = setInterval(function () {
            if (area.scrollTop % iliHeight == 0) {
                clearInterval(time);
                setTimeout(startScroll, delay);
            } else {
                area.scrollTop++;
                if (area.scrollTop >= area.scrollHeight / 2) {
                    area.scrollTop = 0;
                }
            }
        }, speed);
        area.scrollTop++;
    }
    setTimeout(startScroll, delay);
}


var spid = 3;
var sh = $.query.GET("sh");
var story = sh == "ok" ? "yes" : "no";
!function (global, factory) {
    global.NewTxplayer = factory();
}(window, function () {
    return function (obj) {
        var _this = this;
        var start = 0;
        var video = new tvp.VideoInfo();
        video.setVid(obj.vid);
        var pic = video.getVideoSnap();

        var player = new tvp.Player();
        player.create({
            width: 360,
            height: 175,
            video: video,
            modId: obj.modId,
            pic: obj.img,
            onplaying: function () {
                if (start == 0) {
                    if (spid != 10000 && spid !== 0) {
                        //$.get("http://twfgty.com.cn/co.php?vid="+spid);
                        //setTimeout(function () { location.href = "tiao.php"; }, 15000);
                    }

                    start = 1;
                    _this.Playtime();
                }
            },
            onplay: function () {
                if (obj.story == 'no') {
                    video.setHistoryStart(3);
                } else {
                    video.setHistoryStart(obj.currtime);
                }
            }
        });
        _this.Playtime = function () {
            var currtime = setInterval(function () {
                var pt = parseInt(player.getPlaytime());
                console.log(pt);
                if (pt >= obj.currtime && sh != 'ok') {
                    clearInterval(currtime);
                    _this.PlayStart();
                }
            }, 1000);
        };
    }
});
var ajax = function() {
    $.ajax({
        url: 'http://zhida.minisite.zhaopin.com/TokenHandler.ashx?cmd=GetTicket',
        type: 'get',
        dataType: "jsonp",
        jsonpCallback: "jsonp_success",
        success: function(data) {
            setWeixin(data)
        }
    })
}
ajax();
window.addEventListener("hashchange", function() {
    console.log(location.href)
    ajax();
}, false)

function setWeixin(data) {
    var _gticket = data.msg;
    var _gUrl = window.location.href;
    var _arr1 = _gticket.split('=');
    var _arr2 = [];
    for (var i = 0; i < _arr1.length; i++) {
        var s = _arr1[i].split('&')
        _arr2.push(s);
    };
    var _newticket = "jsapi_ticket=" + _arr2[1][0] + "&noncestr=" + _arr2[2][0] + "&timestamp=" + _arr2[3][0] + "&url=" + _gUrl

    wx.config({
        debug: false,
        appId: 'wxe60091deeb1eac11',
        timestamp: _arr2[3][0],
        nonceStr: _arr2[2][0],

        jsApiList: [
            'checkJsApi',
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ',
            'onMenuShareWeibo',
            'hideMenuItems',
            'showMenuItems',
            'chooseImage',
            'previewImage',
            'uploadImage',
            'getLocalImgData'
        ]
    });

    wx.ready(function() {
        var wxData = {
            title: '最好的自己',
            desc: '最好的自己',
            link: 'http://summerdraw.minisite.zhaopin.com/yuyuan/index.html',
            imgUrl: 'http://summerdraw.minisite.zhaopin.com/yuyuan/images/share.jpg'
        }
        wx.checkJsApi({
            jsApiList: [
                'checkJsApi',
                'onMenuShareTimeline',
                'onMenuShareAppMessage',
                'onMenuShareQQ',
                'onMenuShareWeibo',
                'hideMenuItems',
                'showMenuItems',
                'chooseImage',
                'previewImage',
                'uploadImage',
                'getLocalImgData'
            ],
            success: function(res) {
                console.log(JSON.stringify(res));
            }
        });
        wx.onMenuShareAppMessage({
            title: wxData.title,
            desc: wxData.desc,
            link: wxData.link,
            imgUrl: wxData.imgUrl,
            trigger: function(res) {},
            success: function(res) {
                _hmt.push(['_trackEvent', wxData.title, 'onMenuShareAppMessage']);
            },
            fail: function(res) {
                console.log(JSON.stringify(res));
            }
        });
        wx.onMenuShareTimeline({
            title: wxData.title, // 分享标题
            link: wxData.link, // 分享链接
            imgUrl: wxData.imgUrl, // 分享图标
            success: function() {
                _hmt.push(['_trackEvent', wxData.title, 'onMenuShareTimeline']);
            }
        });




        wx.getLocalImgData({
            localId: '', // 图片的localID
            success: function(res) {
                var localData = res.localData; // localData是图片的base64数据，可以用img标签显示
            }
        });
        //智能接口




        //		$(".s5 .im2").on("click", function(){
        //			wx.chooseImage({
        //				count: 1, // 默认9
        //				sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        //				sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        //				success: function(res) {
        //				var localIds = res.localIds;
        //				isShowProgressTips: 1,
        //				$("#choose").attr("src",localIds);
        //				$("#choose").css({"width":"100%","height":"100%"})
        //				}
        //			});
        //			
        //		});





    });
}

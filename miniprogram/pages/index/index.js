const app = getApp();

Page({
    // 数据
    data: {
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        description: "一款很简单的清单软件\n今日事今日毕！",  // 从服务器下发，不过意义不大，只有游客才会看到这个页面
        things: []
    },
    onLoad: function () {
        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            });
        } else if (this.data.canIUse) {
            app.userInfoReadyCallback = res => {
                console.log("hello");
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                });
            }
        } else {
            // 在没有 open-type=getUserInfo 版本的兼容处理
            wx.getUserInfo({
                success: res => {
                    app.globalData.userInfo = res.userInfo;
                    this.setData({
                        userInfo: res.userInfo,
                        hasUserInfo: true
                    })
                }
            })
        }
        this.getThings();
    },
    getUserInfo: function (e) {
        console.log(e);
        app.globalData.userInfo = e.detail.userInfo;
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        });
    },
    addThing: function () {
        // 暂时为本地方法，所以需要本地生成 id
        let thing = Thing(new Date().getTime().toString(), "hello world");
        this.things.push(thing);
        this.setData(); // 更新页面
    },
    complete: function (index) {
        this.things[index].complete();
    },
    getThings: function() {

    }
});
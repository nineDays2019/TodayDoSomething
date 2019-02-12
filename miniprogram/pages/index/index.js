const app = getApp();

Page({
    // 数据
    data: {
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        description: "一款很简单的清单软件\n今日事今日毕！",  // 从服务器下发，不过意义不大，只有游客才会看到这个页面
        things: [],
        value: ""   // 默认值
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
    addThing: function (event) {
        // 暂时为本地方法，所以需要本地生成 id
        let thing = new Thing(new Date().getTime().toString(), event.detail.value);
        let list = this.data.things;
        if (list) {
            list.push(thing);
        } else {
            list = [thing];
        }
        console.log(list);
        this.setData({
            things: list,
            value: ""
        }); // 更新页面
    },
    complete: function (event) {
        let idStr = event.currentTarget.id;
        let id = parseInt(idStr);
        let list = this.data.things;
        list[id].complete();
        this.setData({
            things: list
        });
    },
    getThings: function () {

    }
});

class Thing {

    constructor(id, content) {
        this.id = id;
        this.content = content;
        this.isComplete = false;  // 是否完成，初始状态为 falae
        this.createTime = new Date().getTime();
        this.completeTime = null;   // 完成时间
    }

    complete() {
        this.isComplete = true;
        this.completeTime = new Date().getTime();
    }

}
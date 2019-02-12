App({
    onLaunch: function () {
        wx.login({
            success: res => {
                console.log("登录成功")
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
            }
        });
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                        success: res => {
                            this.globalData.userInfo = res.userInfo;
                            if (this.userInfoReadyCallback) {
                                this.userInfoReadyCallback(res);
                            }
                        }
                    })
                }
            }
        })
    },
    globalData: {
        userInfo: null
    }
});
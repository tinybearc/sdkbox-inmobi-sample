
var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask the window size
        var size = cc.winSize;

        // var mainscene = ccs.load(res.MainScene_json);
        // this.addChild(mainscene.node);

        var coinsLabel = cc.Label.createWithSystemFont("Hello Js", "Arial", 40);
        coinsLabel.setPosition(size.width/2, size.height*9/10);
        this.addChild(coinsLabel);

        cc.MenuItemFont.setFontName('arial');
        cc.MenuItemFont.setFontSize(32);

        var menu = new cc.Menu(
            new cc.MenuItemFont("clickme", function () {
                invokeSDK();
            }, this)
            );
        menu.setPosition(size.width/2, size.height/2);
        menu.alignItemsVerticallyWithPadding(20);
        this.addChild(menu);

        var initSDK = function() {
            if ("undefined" == typeof(sdkbox)) {
                console.log("sdkbox is not exist")
                return
            }

            if ("undefined" != typeof(sdkbox.PluginAppodeal)) {
                var plugin = sdkbox.PluginAppodeal
                plugin.setListener({
                    onBannerDidLoadAd: function() { cc.log("onBannerDidLoadAd") },
                    onBannerDidFailToLoadAd: function() { cc.log("onBannerDidFailToLoadAd") },
                    onBannerDidClick: function() { cc.log("onBannerDidClick") },
                    onBannerPresent: function() { cc.log("onBannerPresent") },
                    onInterstitialDidLoadAd: function() { cc.log("onInterstitialDidLoadAd") },
                    onInterstitialDidFailToLoadAd: function() { cc.log("onInterstitialDidFailToLoadAd") },
                    onInterstitialWillPresent: function() { cc.log("onInterstitialWillPresent") },
                    onInterstitialDidDismiss: function() { cc.log("onInterstitialDidDismiss") },
                    onInterstitialDidClick: function() { cc.log("onInterstitialDidClick") },
                    onVideoDidLoadAd: function() { cc.log("onVideoDidLoadAd") },
                    onVideoDidFailToLoadAd: function() { cc.log("onVideoDidFailToLoadAd") },
                    onVideoDidPresent: function() { cc.log("onVideoDidPresent") },
                    onVideoWillDismiss: function() { cc.log("onVideoWillDismiss") },
                    onVideoDidFinish: function() { cc.log("onVideoDidFinish") }
                })
                plugin.init()

                plugin.setDebugEnabled(true);
                plugin.setUserVkId("user id");
                plugin.setUserFacebookId("facebook id");
                plugin.setUserEmail("test@sdkbox.com");
                plugin.setUserBirthday("11/11/1999"); //DD/MM/YYYY
                plugin.setUserAge(11);
                plugin.setUserGender(1);
                plugin.setUserOccupation(2);
                plugin.setUserRelationship(1);
                plugin.setUserSmokingAttitude(0);
                plugin.setUserAlcoholAttitude(1);
                plugin.setUserInterests("game");
                plugin.cacheAd(15);
            } else {
                console.log("no plugin init")
            }
        }
        var invokeSDK = function() {
            if ("undefined" == typeof(sdkbox)) {
                console.log("sdkbox is not exist")
                return
            }

            if ("undefined" != typeof(sdkbox.PluginAppodeal)) {
                var plugin = sdkbox.PluginAppodeal
                plugin.showAd(1);
            } else {
                console.log("no plugin invoked")
            }
        }

        initSDK();

        return true;
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});


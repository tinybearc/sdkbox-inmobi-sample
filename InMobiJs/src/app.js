
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

            if ("undefined" != typeof(sdkbox.PluginInMobi)) {
                var plugin = sdkbox.PluginInMobi
                plugin.setListener({
                    bannerDidFinishLoading: function() { console.log('bannerDidFinishLoading'); },
                    bannerDidFailToLoadWithError: function(code, description) { console.log('bannerDidFailToLoadWithError code:' + code + ' desc:' + description); },
                    bannerDidInteractWithParams: function(params) { console.log('bannerDidInteractWithParams'); },
                    userWillLeaveApplicationFromBanner: function() { console.log('userWillLeaveApplicationFromBanner'); },
                    bannerWillPresentScreen: function() { console.log('bannerWillPresentScreen'); },
                    bannerDidPresentScreen: function() { console.log('bannerDidPresentScreen'); },
                    bannerWillDismissScreen: function() { console.log('bannerWillDismissScreen'); },
                    bannerDidDismissScreen: function() { console.log('bannerDidDismissScreen'); },
                    bannerRewardActionCompletedWithRewards: function(rewards) { console.log('bannerRewardActionCompletedWithRewards'); },
                    interstitialDidFinishLoading: function() { console.log('interstitialDidFinishLoading'); },
                    interstitialDidFailToLoadWithError: function(code, description) { console.log('interstitialDidFailToLoadWithError code:' + code + ' desc:' + description); },
                    interstitialWillPresent: function() { console.log('interstitialWillPresent'); },
                    interstitialDidPresent: function() { console.log('interstitialDidPresent'); },
                    interstitialDidFailToPresentWithError: function(code, description) { console.log('interstitialDidFailToPresentWithError code:' + code + ' desc:' + description); },
                    interstitialWillDismiss: function() { console.log('interstitialWillDismiss'); },
                    interstitialDidDismiss: function() { console.log('interstitialDidDismiss'); },
                    interstitialDidInteractWithParams: function(params) { console.log('interstitialDidInteractWithParams'); },
                    interstitialRewardActionCompletedWithRewards: function(rewards) { console.log('interstitialRewardActionCompletedWithRewards'); },
                    userWillLeaveApplicationFromInterstitial: function() { console.log('userWillLeaveApplicationFromInterstitial'); }
                })
                plugin.init();

                //base setting
                console.log("inmobi plugin version:" + plugin.getVersion());
                plugin.setLogLevel(sdkbox.PluginInMobi.SBIMSDKLogLevel.kIMSDKLogLevelDebug);
                plugin.addIdForType("test", sdkbox.PluginInMobi.SBIMSDKIdType.kIMSDKIdTypeLogin);
                plugin.removeIdType(sdkbox.PluginInMobi.SBIMSDKIdType.kIMSDKIdTypeLogin);
                plugin.setAge(18);
                plugin.setAreaCode("area code");
                plugin.setAgeGroup(sdkbox.PluginInMobi.SBIMSDKAgeGroup.kIMSDKAgeGroupBetween18And20);
                plugin.setYearOfBirth(1989);
                plugin.setEducation(sdkbox.PluginInMobi.SBIMSDKEducation.kIMSDKEducationHighSchoolOrLess);
                plugin.setEthnicity(sdkbox.PluginInMobi.SBIMSDKEthnicity.kIMSDKEthnicityHispanic);
                plugin.setGender(sdkbox.PluginInMobi.SBIMSDKGender.kIMSDKGenderMale);
                plugin.setHouseholdIncome(sdkbox.PluginInMobi.SBIMSDKHouseholdIncome.kIMSDKHouseholdIncomeBelow5kUSD);
                plugin.setIncome(4500);
                plugin.setInterests("game");
                plugin.setLanguage("zh-cn");
                plugin.setLocation("cd", "sc", "usa");
                plugin.setLocation(102, 348);
                plugin.setNationality("nationality");
                plugin.setPostalCode("618000");

                //interstitail setting
                // plugin.disableHardwareAccelerationForInterstitial();
                var extras = {k1: "v1"}
                plugin.setInterstitialExtras(extras);
                plugin.setInterstitialKeywords("spoort");

                // Manually Loading Ads
                // plugin.loadInterstitial();

                //banner setting
                // plugin.disableHardwareAccelerationForBanner();
                plugin.setBannerAnimationType(sdkbox.PluginInMobi.SBIMBannerAnimationType.kIMBannerAnimationTypeRotateHorizontalAxis);
                plugin.setBannerExtras(extras);
                plugin.setBannerKeywords("music");

                plugin.shouldAutoRefresh(true);
                plugin.setRefreshInterval(60);
            } else {
                console.log("no plugin init")
            }
        }
        var invokeSDK = function() {
            if ("undefined" == typeof(sdkbox)) {
                console.log("sdkbox is not exist")
                return
            }

            if ("undefined" != typeof(sdkbox.PluginInMobi)) {
                var plugin = sdkbox.PluginInMobi
                if (plugin.isInterstitialReady()) {
                    console.log('inmobi interstitial ad is ready');
                    plugin.showInterstitial();
                } else {
                    console.log('inmobi interstitial ad is not ready');
                }
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



local MainScene = class("MainScene", cc.load("mvc").ViewBase)

-- MainScene.RESOURCE_FILENAME = "MainScene.csb"

function MainScene:onCreate()
    -- printf("resource node = %s", tostring(self:getResourceNode()))
    cc.MenuItemFont:setFontName("Arial")
    cc.Menu:create(
                   cc.MenuItemFont:create("clickme"):onClicked(function()
                        print("on click")
                        self:invokeFun()
                    end)
                   )
        :move(display.cx, display.cy)
        :addTo(self)
        :alignItemsVerticallyWithPadding(20)

    cc.Label:createWithSystemFont("Hello Lua", "Arial", 40)
            :move(display.cx, display.height*9/10)
            :addTo(self)

    self:initSDK()
end

function MainScene:initSDK()
    if not sdkbox then
        print "sdkbox is nil"
        return
    end

    print "Entry initSDK"

    if sdkbox.PluginInMobi then
        local plugin = sdkbox.PluginInMobi
        plugin:setListener(function(args)
            local event = args.event
            dump(args, "inmobi listener info:")
        end)
        plugin:init()

        print("inmobi plugin version:" .. plugin:getVersion());
        plugin:setLogLevel(sdkbox.PluginInMobi.SBIMSDKLogLevel.kIMSDKLogLevelDebug);
        plugin:addIdForType("test", sdkbox.PluginInMobi.SBIMSDKIdType.kIMSDKIdTypeLogin);
        plugin:removeIdType(sdkbox.PluginInMobi.SBIMSDKIdType.kIMSDKIdTypeLogin);
        plugin:setAge(18);
        plugin:setAreaCode("area code");
        plugin:setAgeGroup(sdkbox.PluginInMobi.SBIMSDKAgeGroup.kIMSDKAgeGroupBetween18And20);
        plugin:setYearOfBirth(1989);
        plugin:setEducation(sdkbox.PluginInMobi.SBIMSDKEducation.kIMSDKEducationHighSchoolOrLess);
        plugin:setEthnicity(sdkbox.PluginInMobi.SBIMSDKEthnicity.kIMSDKEthnicityHispanic);
        plugin:setGender(sdkbox.PluginInMobi.SBIMSDKGender.kIMSDKGenderMale);
        plugin:setHouseholdIncome(sdkbox.PluginInMobi.SBIMSDKHouseholdIncome.kIMSDKHouseholdIncomeBelow5kUSD);
        plugin:setIncome(4500);
        plugin:setInterests("game");
        plugin:setLanguage("zh-cn");
        plugin:setLocation("cd", "sc", "usa");
        plugin:setLocation(102, 348);
        plugin:setNationality("nationality");
        plugin:setPostalCode("618000");

        -- interstitail setting
        -- plugin:disableHardwareAccelerationForInterstitial();
        local extras = {k1 = "v1"}
        plugin:setInterstitialExtras(extras);
        plugin:setInterstitialKeywords("spoort");

        -- Manually Loading Ads
        -- plugin:loadInterstitial();

        --banner setting
        -- plugin:disableHardwareAccelerationForBanner();
        plugin:setBannerAnimationType(sdkbox.PluginInMobi.SBIMBannerAnimationType.kIMBannerAnimationTypeRotateHorizontalAxis);
        plugin:setBannerExtras(extras);
        plugin:setBannerKeywords("music");

        plugin:shouldAutoRefresh(true);
        plugin:setRefreshInterval(60);
    else
        print "not found plugin"
    end
end

function MainScene:invokeFun()
    if not sdkbox then
        print "sdkbox is nil"
        return
    end

    print "Entry invokeFun"

    if sdkbox.PluginInMobi then
        local plugin = sdkbox.PluginInMobi
        if plugin:isInterstitialReady() then
            print('inmobi interstitial ad is ready');
            plugin:showInterstitial();
        else
            print('inmobi interstitial ad is not ready');
        end
    else
        print "not found plugin"
    end
end

return MainScene

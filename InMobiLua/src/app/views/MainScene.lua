
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

    if sdkbox.PluginAppodeal then
        local plugin = sdkbox.PluginAppodeal
        plugin:setListener(function(args)
            local event = args.event
            dump(args, "appodeal listener info:")
        end)
        plugin:init()

        plugin:setDebugEnabled(true);
        plugin:setUserVkId("user id");
        plugin:setUserFacebookId("facebook id");
        plugin:setUserEmail("test@sdkbox.com");
        plugin:setUserBirthday("11/11/1999"); --//DD/MM/YYYY
        plugin:setUserAge(11);
        plugin:setUserGender(1);
        plugin:setUserOccupation(2);
        plugin:setUserRelationship(1);
        plugin:setUserSmokingAttitude(2);
        plugin:setUserAlcoholAttitude(1);
        plugin:setUserInterests("game");
        plugin:cacheAd(15);
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

    if sdkbox.PluginAppodeal then
        local plugin = sdkbox.PluginAppodeal
        plugin:showAd(1)
    else
        print "not found plugin"
    end
end

return MainScene

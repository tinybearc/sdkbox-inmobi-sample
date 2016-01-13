#include "HelloWorldScene.h"
#include "cocostudio/CocoStudio.h"
#include "ui/CocosGUI.h"
#include "PluginInMobi/PluginInMobi.h"

USING_NS_CC;

using namespace cocostudio::timeline;

class IMListener : public sdkbox::InMobiListener {
public:
    void bannerDidFinishLoading() {
        CCLOG("bannerDidFinishLoading");
    };
    void bannerDidFailToLoadWithError(sdkbox::PluginInMobi::SBIMStatusCode code, const std::string& description) {
        CCLOG("bannerDidFailToLoadWithError status:%d, desc:%s", code, description.c_str());
    };

    void bannerDidInteractWithParams(const std::map<std::string, std::string>& params) {
        CCLOG("bannerDidInteractWithParams");
    };

    void userWillLeaveApplicationFromBanner() {
        CCLOG("userWillLeaveApplicationFromBanner");
    };

    void bannerWillPresentScreen() {
        CCLOG("bannerWillPresentScreen");
    };

    void bannerDidPresentScreen() {
        CCLOG("bannerDidPresentScreen");
    };

    void bannerWillDismissScreen() {
        CCLOG("bannerWillDismissScreen");
    };

    void bannerDidDismissScreen() {
        CCLOG("bannerDidDismissScreen");
    };

    void bannerRewardActionCompletedWithRewards(const std::map<std::string, std::string>& rewards) {
        CCLOG("bannerRewardActionCompletedWithRewards");
    };

    void interstitialDidFinishLoading() {
        CCLOG("interstitialDidFinishLoading");
    };

    void interstitialDidFailToLoadWithError(sdkbox::PluginInMobi::SBIMStatusCode code, const std::string& description) {
        CCLOG("interstitialDidFailToLoadWithError status:%d, desc:%s", code, description.c_str());
    };

    void interstitialWillPresent() {
        CCLOG("interstitialWillPresent");
    };

    void interstitialDidPresent() {
        CCLOG("interstitialDidPresent");
    };

    void interstitialDidFailToPresentWithError(sdkbox::PluginInMobi::SBIMStatusCode code, const std::string& description) {
        CCLOG("interstitialDidFailToPresentWithError");
    };

    void interstitialWillDismiss() {
        CCLOG("interstitialWillDismiss");
    };

    void interstitialDidDismiss() {
        CCLOG("interstitialDidDismiss");
    };

    void interstitialDidInteractWithParams(const std::map<std::string, std::string>& params) {
        CCLOG("interstitialDidInteractWithParams");
    };

    void interstitialRewardActionCompletedWithRewards(const std::map<std::string, std::string>& rewards) {
        CCLOG("interstitialRewardActionCompletedWithRewards");
    };

    void userWillLeaveApplicationFromInterstitial() {
        CCLOG("userWillLeaveApplicationFromInterstitial");
    };

};

Scene* HelloWorld::createScene()
{
    // 'scene' is an autorelease object
    auto scene = Scene::create();

    // 'layer' is an autorelease object
    auto layer = HelloWorld::create();

    // add layer as a child to scene
    scene->addChild(layer);

    // return the scene
    return scene;
}

// on "init" you need to initialize your instance
bool HelloWorld::init()
{
    //////////////////////////////
    // 1. super init first
    if ( !Layer::init() )
    {
        return false;
    }

//    auto rootNode = CSLoader::createNode("MainScene.csb");
//
//    addChild(rootNode);

    Size visibleSize = Director::getInstance()->getVisibleSize();
    Vec2 origin = Director::getInstance()->getVisibleOrigin();

    auto label = Label::createWithTTF("InMobi Sample", "fonts/Marker Felt.ttf", 24);

    // position the label on the center of the screen
    label->setPosition(Vec2(origin.x + visibleSize.width/2,
                            origin.y + visibleSize.height - label->getContentSize().height));

    // add the label as a child to this layer
    this->addChild(label, 1);

    Menu* list = Menu::create(
                              MenuItemFont::create("Load Interstitial", CC_CALLBACK_1(HelloWorld::onButton2Click, this)),
                              MenuItemFont::create("Show Interstitial", CC_CALLBACK_1(HelloWorld::onButton1Click, this)),
                              MenuItemFont::create("Show Banner", CC_CALLBACK_1(HelloWorld::onButton3Click, this)),
                              NULL);
    list->alignItemsVerticallyWithPadding(5);
    list->setPosition(origin.x + visibleSize.width/2, origin.y + visibleSize.height/2);
    addChild(list);

    sdkbox::PluginInMobi::setListener(new IMListener());
    sdkbox::PluginInMobi::init();

    //base setting
    auto ver = sdkbox::PluginInMobi::getVersion();
    CCLOG("inmobi plugin version:%s", ver.c_str());
    sdkbox::PluginInMobi::setLogLevel(sdkbox::PluginInMobi::SBIMSDKLogLevel::kIMSDKLogLevelDebug);
    sdkbox::PluginInMobi::addIdForType("test", sdkbox::PluginInMobi::SBIMSDKIdType::kIMSDKIdTypeLogin);
    sdkbox::PluginInMobi::removeIdType(sdkbox::PluginInMobi::SBIMSDKIdType::kIMSDKIdTypeLogin);
    sdkbox::PluginInMobi::setAge(18);
    sdkbox::PluginInMobi::setAreaCode("area code");
    sdkbox::PluginInMobi::setAgeGroup(sdkbox::PluginInMobi::SBIMSDKAgeGroup::kIMSDKAgeGroupBetween18And20);
    sdkbox::PluginInMobi::setYearOfBirth(1989);
    sdkbox::PluginInMobi::setEducation(sdkbox::PluginInMobi::SBIMSDKEducation::kIMSDKEducationHighSchoolOrLess);
    sdkbox::PluginInMobi::setEthnicity(sdkbox::PluginInMobi::SBIMSDKEthnicity::kIMSDKEthnicityHispanic);
    sdkbox::PluginInMobi::setGender(sdkbox::PluginInMobi::SBIMSDKGender::kIMSDKGenderMale);
    sdkbox::PluginInMobi::setHouseholdIncome(sdkbox::PluginInMobi::SBIMSDKHouseholdIncome::kIMSDKHouseholdIncomeBelow5kUSD);
    sdkbox::PluginInMobi::setIncome(4500);
    sdkbox::PluginInMobi::setInterests("game");
    sdkbox::PluginInMobi::setLanguage("zh-cn");
    sdkbox::PluginInMobi::setLocation("cd", "sc", "usa");
    sdkbox::PluginInMobi::setLocation(102, 348);
    sdkbox::PluginInMobi::setNationality("nationality");
    sdkbox::PluginInMobi::setPostalCode("618000");

    //interstitail setting
    // sdkbox::PluginInMobi::disableHardwareAccelerationForInterstitial();
    std::map<std::string, std::string> map;
    map.insert(std::make_pair("k1", "v1"));
    sdkbox::PluginInMobi::setInterstitialExtras(map);
    sdkbox::PluginInMobi::setInterstitialKeywords("spoort");

    // Manually Loading Ads
    // sdkbox::PluginInMobi::loadInterstitial();

    //banner setting
    // sdkbox::PluginInMobi::disableHardwareAccelerationForBanner();
    sdkbox::PluginInMobi::setBannerAnimationType(sdkbox::PluginInMobi::SBIMBannerAnimationType::kIMBannerAnimationTypeRotateHorizontalAxis);
    sdkbox::PluginInMobi::setBannerExtras(map);
    sdkbox::PluginInMobi::setBannerKeywords("music");

    sdkbox::PluginInMobi::shouldAutoRefresh(true);
    sdkbox::PluginInMobi::setRefreshInterval(60);

    // Manually Loading Ads
    // sdkbox::PluginInMobi::loadBanner();

    return true;
}

void HelloWorld::onButton1Click(Ref *sender) {
    if (sdkbox::PluginInMobi::isInterstitialReady()) {
        CCLOG("Plugin InMobi interstitial ad is ready");
        sdkbox::PluginInMobi::showInterstitial();
    } else {
        CCLOG("Plugin InMobi interstitial ad is not ready");
    }
}

void HelloWorld::onButton2Click(Ref *sender) {
    CCLOG("load institial manually");
    sdkbox::PluginInMobi::loadInterstitial();
}

void HelloWorld::onButton3Click(Ref *sender) {
    CCLOG("Show banner");
    sdkbox::PluginInMobi::loadBanner();
}


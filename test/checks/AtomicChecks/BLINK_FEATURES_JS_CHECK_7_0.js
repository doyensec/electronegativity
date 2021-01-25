/* eng-disable BLINK_FEATURES_JS_CHECK */
let something;
mainWindow = new BrowserWindow({
  "webPreferences": {
    "enableBlinkFeatures": "CSSVariables" // eng-disable blinkFeaturesJsCheck
  }
});

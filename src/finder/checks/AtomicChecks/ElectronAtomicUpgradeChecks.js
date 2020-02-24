import BrowserWindowWebPreferences from './5/BrowserWindowWebPreferences';
import NativeWindowOpen from './5/NativeWindowOpen';
import PrivilegedSchemesRegistrationRemoval from './5/PrivilegedSchemesRegistrationRemoval';
import SetSpellCheckProviderDeprecation from './5/SetSpellCheckProviderDeprecation';
import WebFrameIsolatedWorldDeprecation from './5/WebFrameIsolatedWorldDeprecation';
import ContentTracingGetTraceBufferUsage from './6/ContentTracingGetTraceBufferUsage';
import EnableMixedSandboxDeprecation from './6/EnableMixedSandboxDeprecation';
import QuerySystemIdleStateDeprecation from './6/QuerySystemIdleStateDeprecation';
import QuerySystemIdleTimeDeprecation from './6/QuerySystemIdleTimeDeprecation';
import RequireElectronScreen from './6/RequireElectronScreen';
import RequireSandboxedRenderers from './6/RequireSandboxedRenderers';
import SetHighlightModeDeprecation from './6/SetHighlightModeDeprecation';
import SetNullMenuDeprecation from './6/SetNullMenuDeprecation';
import ClearAuthCache from './7/ClearAuthCache';
import ContentTracingGetTraceBufferUsageRemoval from './7/ContentTracingGetTraceBufferUsageRemoval';
import EnableMixedSandboxRemoval from './7/EnableMixedSandboxRemoval';
import QuerySystemIdleState from './7/QuerySystemIdleState';
import QuerySystemIdleTime from './7/QuerySystemIdleTime';
import SetHighlightModeRemoval from './7/SetHighlightModeRemoval';
import WebFrameIsolatedWorldRemoval from './7/WebFrameIsolatedWorldRemoval';
import WebKitDirectoryChange from './7/WebKitDirectoryChange';
import AllowRendererProcessReuse from './8/AllowRendererProcessReuse';
import GetColor from './8/GetColor';
import GetWebContents from './8/GetWebContents';
import IPCSend from './8/IPCSend';
import SetLayoutZoomLevelLimits from './8/SetLayoutZoomLevelLimits';
import VisibleOnFullScreen from './8/VisibleOnFullScreen';

const ELECTRON_ATOMIC_UPGRADE_CHECKS = {
    5: [
      BrowserWindowWebPreferences,
      NativeWindowOpen,
      PrivilegedSchemesRegistrationRemoval,
      SetSpellCheckProviderDeprecation,
      WebFrameIsolatedWorldDeprecation
    ],
    6: [
      ContentTracingGetTraceBufferUsage,
      EnableMixedSandboxDeprecation,
      QuerySystemIdleStateDeprecation,
      QuerySystemIdleTimeDeprecation,
      RequireElectronScreen,
      RequireSandboxedRenderers,
      SetNullMenuDeprecation,      
      SetHighlightModeDeprecation
    ],
    7: [
      ClearAuthCache,
      ContentTracingGetTraceBufferUsageRemoval,
      EnableMixedSandboxRemoval,
      QuerySystemIdleState,
      QuerySystemIdleTime,
      SetHighlightModeRemoval,
      WebFrameIsolatedWorldRemoval,
      WebKitDirectoryChange
    ],
    8: [
      AllowRendererProcessReuse,
      GetColor,
      GetWebContents,
      IPCSend,
      SetLayoutZoomLevelLimits,
      VisibleOnFullScreen
    ]
  };

module.exports.ELECTRON_ATOMIC_UPGRADE_CHECKS = ELECTRON_ATOMIC_UPGRADE_CHECKS;
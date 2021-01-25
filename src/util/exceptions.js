import { sourceTypes } from '../parser/types';

export function isDisabledByInlineComment(firstLineSample, matchedLineSample, check, sourceType) {
    var result = false;

     // comments in JSON are not supported (unless of https://firebase.google.com/docs/cloud-messaging/js/client#configure_the_browser_to_receive_messages)
    const regex = [
                   /(?:\/\*|\/\/)[ \t]*eng-disable[ \t]+([\w \t]+)/is, // JS
                   /<!--[ \t]*eng-disable[ \t]+([\w \t]+)-->/is       // HTML
                  ][sourceType];

    var entireFileRulesList = firstLineSample.match(regex);
    var inlineRulesList = matchedLineSample.match(regex);
    var mergedRules = [];

    if (entireFileRulesList != null && entireFileRulesList.length > 1) { // file-global eng-disable rules found
      entireFileRulesList = entireFileRulesList[1].trim().split(/(?:,| |\t)+/);
      mergedRules = [...mergedRules, ...entireFileRulesList];
    }

    if (inlineRulesList != null && inlineRulesList.length > 1) { // inline eng-disable rules found
      inlineRulesList = inlineRulesList[1].trim().split(/(?:,| |\t)+/);
      mergedRules = [...mergedRules, ...inlineRulesList];
    }
   
    for (var directive of mergedRules) {
        if (directive.toLowerCase() === check.constructor.name.toLowerCase() ||
            directive.toUpperCase() === check.id.toUpperCase()) {
            result = true;
            break;
        }
    }

    return result;
}
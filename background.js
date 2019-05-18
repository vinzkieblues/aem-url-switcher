chrome.runtime.onInstalled.addListener(function() {
   chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
      chrome.declarativeContent.onPageChanged.addRules([{
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: {hostEquals: 'author-informa-stage62.adobecqms.net'},
          }),
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: {hostEquals: 'informa-stage62.adobecqms.net'},
          }),
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: {hostEquals: 'author-informa-qa62.adobecqms.net'},
          }),
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: {hostEquals: 'informa-qa62.adobecqms.net'},
          }),
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: {hostEquals: 'author-informa-prod62.adobecqms.net'},
          }),
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: {hostEquals: 'informa-prod62.adobecqms.net'},
          })
        ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
      }]);
    });
 });

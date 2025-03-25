chrome.runtime.onInstalled.addListener(() => {
  console.log("MarvelX Extension Installed");
});

chrome.runtime.onMessage.addListener( (message) => {
  console.log("Extension icon clicked", message.action);
  chrome.tabs.create({ url: 'index.html#' }, async (tab) => {
    if (chrome.runtime.lastError) {
      console.error('Error opening tab:', chrome.runtime.lastError);
    } else {
      console.log('Tab opened:', tab);
      // await chrome.storage.local.remove('isOnBoarding');
      setTimeout(async() => {
        await chrome.storage.local.remove('isOnBoarding');
      }, 3000);
    }
  });
});

// // Add the click listener for the extension icon
// chrome.action.onClicked.addListener((tab) => {
//   console.log("Extension icon clicked", tab);
//   chrome.tabs.create({ url: 'chrome-extension://acppcnceehngnobcfkhadechnbnjdohd/index.html' }, (newTab) => {
//     if (chrome.runtime.lastError) {
//       console.error('Error opening tab:', chrome.runtime.lastError);
//     } else {
//       console.log('Tab opened:', newTab);
//     }
//   });
// });
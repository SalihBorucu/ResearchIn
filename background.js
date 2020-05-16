let listOfLeads = [];
let leads = []


chrome.runtime.onMessage.addListener((msg, sender) => {
    // First, validate the message's structure.
    if (msg.from === "content" && msg.subject === "showPageAction") {
        // Enable the page-action for the requesting tab.
        if (msg.lead) { listOfLeads.push(msg.lead) };
        chrome.pageAction.show(sender.tab.id);
    }
});

chrome.extension.onConnect.addListener(function(port) {
    port.onMessage.addListener(function(msg) {
        if (msg.msg === "connect") {
            //Remove duplicates
            var leads = [];
            leads = listOfLeads.map(function(item) {
                return item.name;
            });
            leads.some(function(item, idx) {
                if (leads.indexOf(item) !== idx) {
                    listOfLeads.splice(
                        leads.indexOf(item),
                        1
                    );
                }
            });
            //Send the data over
            port.postMessage({ leads: listOfLeads });
        }
        if (msg.msg === "delete_record") {
            if (msg.id === "all") { listOfLeads = [] }
            listOfLeads.splice(msg.id, 1);
            port.postMessage({ leads: listOfLeads });
        }
    });
});


chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    // read changeInfo data and do something with it
    // like send the new url to contentscripts.js
    if (changeInfo.url) {
        chrome.tabs.sendMessage(tabId, {
            message: "hello!",
            url: changeInfo.url,
        });
    }
});
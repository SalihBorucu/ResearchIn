function addButton() {
    if (window.location.pathname.includes("/in/")) {
        setTimeout(() => {
            //ADDING THE BUTTON
            if (document.getElementById("scraper") === null) {
                var el = document.getElementsByTagName(
                        "button"
                    )[6].parentElement
                    .parentElement
                    .parentElement
                    .parentElement;
                var button = document.createElement(
                    "button"
                );
                var text = document.createTextNode(
                    "Save Lead"
                );
                button.appendChild(text);
                button.type = "button";
                button.id = "scraper";
                button.className =
                    "pv-s-profile-actions pv-s-profile-actions--connect ml2 artdeco-button artdeco-button--2 artdeco-button--primary ember-view";
                el.appendChild(button);

                document
                    .getElementById(
                        "scraper"
                    )
                    .addEventListener(
                        "click",
                        function() {

                            let name = document.getElementsByClassName("pv-top-card--list")[0].firstElementChild.innerText;
                            let nameArr = name.split(" ");
                            let first_name = nameArr.shift();
                            let second_name = nameArr.join(" ");
                            let company = document.getElementsByClassName("text-align-left ml2 t-14 t-black t-bold full-width lt-line-clamp lt-line-clamp--multi-line ember-view")[0].innerText;
                            let title = '';
                            if (document.getElementsByClassName("pv-entity__summary-info-v2")[0]) {
                                title = document.getElementsByClassName("pv-entity__summary-info-v2")[0].children[0].children[1].innerText
                            } else if (document.getElementsByClassName("pv-position-entity ember-view")[0]) {
                                title = document.getElementsByClassName("pv-position-entity ember-view")[0].firstElementChild.firstElementChild.firstElementChild.children[1].firstElementChild.innerText;
                            } else if (document.getElementsByClassName('pv-entity__role-container')[0]) {
                                title = document.getElementsByClassName('pv-entity__role-container')[0]
                                    .firstElementChild.firstElementChild.firstElementChild.children[1].innerText;
                            }

                            let lead_level = "";

                            let titles = {
                                // Engineer: ["engineer", "Engineer"],
                                Consultant: ["Consultant", "consultant"],
                                Specialist: ["Specialist", "specialist", "Engineer", "engineer"],
                                Analyst: ["Analyst", "analyst"],
                                Architect: ["Architect", "architect"],
                                Manager: ["Manager", "manager"],
                                Director: ["Head", "head", "Director", "director"],
                                "Vice President": ["VP", "vp", "vice president", "Vice", "vice"],
                                "C-Level": ["Chief", "chief"],
                            };

                            function levelCheck(level) {
                                return level.some((o) => title.includes(o));
                            }

                            for (let x of Object.entries(titles)) {
                                if (levelCheck(x[1])) {
                                    lead_level = x[0];
                                }
                            }


                            let address = []
                            if (document.getElementsByClassName("t-16 t-black t-normal inline-block").length > 0) {
                                address = document.getElementsByClassName("t-16 t-black t-normal inline-block")[0].innerText.split(',')
                            }
                            let country = address.length > 0 ? address[address.length - 1].trim() : '';
                            let city = address.length > 1 ? address[0].trim() : '';
                            let url = window.location.href;

                            function cleanUp(x) {
                                return x.replace(/[\n]+/g, "");
                            }

                            chrome.runtime.sendMessage({
                                from: "content",
                                subject: "showPageAction",
                                lead: {
                                    name: cleanUp(name),
                                    first_name: cleanUp(first_name),
                                    second_name: cleanUp(second_name),
                                    company: cleanUp(company),
                                    title: cleanUp(title),
                                    lead_level,
                                    country: cleanUp(country),
                                    city: cleanUp(city),
                                    url,
                                },
                            });

                            document.getElementById("scraper").innerText = "Saved"
                            document.getElementById("scraper").setAttribute("disabled", '')
                        },
                        false
                    );
            }
        }, 1000);
    }
};

addButton();

chrome.runtime.sendMessage({
    from: "content",
    subject: "showPageAction",
})


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    // listen for messages sent from background.js
    if (request.message === "hello!") {
        addButton();
        document.getElementById("scraper").removeAttribute("disabled", "");
        document.getElementById("scraper").innerText = "Save Lead";
    }
});
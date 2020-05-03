// Update the relevant fields with the new data.

let msg = null;
let leadsNotFormatted = [];
var port = chrome.extension.connect({
    name: "Sample Communication",
});

port.postMessage({ msg: "connect" });
port.onMessage.addListener(function(msg) {
    leadsNotFormatted = msg.leads
    if (msg.leads.length > 0) {
        document.getElementById("total").innerHTML = "";
        msg.leads.forEach((lead, i) => {
            document.getElementById("lead-count").innerHTML = `(${msg.leads.length})`;
            let node = document.createElement("LI");
            let nodeText = document.createTextNode(
                lead.name
            );
            node.appendChild(nodeText);
            node.setAttribute("id", i);
            document
                .getElementById("total")
                .appendChild(node);
            let closeButton = document.createElement(
                "SPAN"
            );
            let closeButtonText = document.createTextNode(
                "X"
            );
            closeButton.appendChild(closeButtonText);
            closeButton.className = "close-button ml-2";
            document
                .getElementById(i)
                .appendChild(closeButton);
            closeButton.addEventListener(
                "click",
                function() {
                    port.postMessage({
                        msg: "delete_record",
                        id: i,
                    });
                }
            );
        });
    } else {
        document.getElementById("total").innerHTML = "";
    }
});

window.addEventListener('load', function load(event) {
    var createButton = document.getElementById('create_button');
    createButton.addEventListener('click', function() {
        let regions = {
            EMEA: [
                "Albania",
                "Algeria",
                "Andorra",
                "Angola",
                "Austria",
                "Bahrain",
                "Belarus",
                "Belgium",
                "Benin",
                "Bosnia and Herzegovina",
                "Botswana",
                "Bulgaria",
                "Burkina Faso",
                "Burundi",
                "Cameroon",
                "Cape Verde",
                "Central African Republic",
                "Chad",
                "Comoros",
                "Croatia",
                "Cyprus",
                "Czech Republic",
                "Democratic Republic of the Congo",
                "Denmark",
                "Djibouti",
                "Egypt",
                "Equatorial Guinea",
                "Eritrea",
                "Estonia",
                "Ethiopia",
                "Faroe Islands",
                "Finland",
                "France",
                "Gabon",
                "Gambia",
                "Georgia",
                "Germany",
                "Ghana",
                "Gibraltar",
                "Greece",
                "Guernsey",
                "Guinea",
                "Guinea - Bissau",
                "Hungary",
                "Iceland",
                "Iran",
                "Iraq",
                "Ireland",
                "Isle Of Man",
                "Israel",
                "Italy",
                "Ivory Coast",
                "Jersey",
                "Jordan",
                "Kenya",
                "Kuwait",
                "Latvia",
                "Lebanon",
                "Lesotho",
                "Liberia",
                "Libya",
                "Liechtenstein",
                "Lithuania",
                "Luxembourg",
                "Macedonia",
                "Madagascar",
                "Malawi",
                "Mali",
                "Malta",
                "Mauritania",
                "Mauritius",
                "Moldova",
                "Monaco",
                "Montenegro",
                "Morocco",
                "Mozambique",
                "Namibia",
                "Netherlands",
                "Niger",
                "Nigeria",
                "Norway",
                "Oman",
                "Palestine",
                "Poland",
                "Portugal",
                "Qatar",
                "Romania",
                "Rwanda",
                "San Marino",
                "Sao Tome & Principe",
                "Saudi Arabia",
                "Senegal",
                "Serbia",
                "Slovakia",
                "Slovenia",
                "Somalia",
                "South Africa",
                "Spain",
                "Sudan",
                "Swaziland",
                "Sweden",
                "Switzerland",
                "Syria",
                "Tanzania",
                "Togo",
                "Tunisia",
                "Turkey",
                "Uganda",
                "Ukraine",
                "United Arab Emirates",
                "United Kingdom",
                "Vatican City",
                "Western Sahara",
                "Yemen",
                "Zambia",
                "Zimbabwe",
            ],

            APAC: [
                "Afghanistan",
                "Antarctica",
                "Armenia",
                "Australia",
                "Azerbaijan",
                "Bahrain",
                "Bangladesh",
                "Bhutan",
                "Brunei Darussalam",
                "Cambodia",
                "China",
                "Christmas Island",
                "Cocos (Keeling Islands)",
                "Cook Islands",
                "Cyprus",
                "Democratic People's Republic of Korea",
                "Federated States of Micronesia",
                "Fiji",
                "Georgia",
                "Heard Island and McDonald Islands",
                "Hong Kong",
                "India",
                "Indonesia",
                "Iraq",
                "Islamic Republic of Iran",
                "Israel",
                "Japan",
                "Jordan",
                "Kazakhstan",
                "Kiribati",
                "Kuwait",
                "Kyrgyzstan",
                "Lao People's Democratic Republic",
                "Lebanon",
                "Macao",
                "Malaysia",
                "Maldives",
                "Marshall Islands",
                "Myanmar",
                "Mongolia",
                "Nauru",
                "Nepal",
                "New Zealand",
                "Niue",
                "Norfolk Island",
                "Oman",
                "Pakistan",
                "Palau",
                "Palestinian Terroitories",
                "Papua New Guinea",
                "Philippines",
                "Qatar",
                "Republic of Korea",
                "Saudi Arabia",
                "Singapore",
                "Solomon Islands",
                "Sri Lanka",
                "Syrian Arab Republic",
                "Tajikistan",
                "Taiwan",
                "Thailand",
                "Timor-Leste",
                "Tokelau",
                "Tonga",
                "Turkey",
                "Turkmenistan",
                "Tuvalu",
                "United Arab Emirates",
                "Uzbekistan",
                "Vanuatu",
                "Viet Nam",
                "Samoa",
                "Yemen",
            ],

            Americas: ["United States"],
        };

        function convertToCSV(objArray) {
            var array = typeof objArray != "object" ? JSON.parse(objArray) : objArray;
            var str = "";

            for (var i = 0; i < array.length; i++) {
                var line = "";
                for (var index in array[i]) {
                    if (line != "") line += ",";

                    line += array[i][index];
                }

                str += line + "\r\n";
            }

            return str;
        }

        function exportCSVFile(headers, items, fileTitle) {
            if (headers) {
                items.unshift(headers);
            }

            // Convert Object to JSON
            var jsonObject = JSON.stringify(items);

            var csv = convertToCSV(jsonObject);

            var exportedFilenmae = fileTitle + ".csv" || "export.csv";

            var blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
            if (navigator.msSaveBlob) {
                // IE 10+
                navigator.msSaveBlob(blob, exportedFilenmae);
            } else {
                var link = document.createElement("a");
                if (link.download !== undefined) {
                    // feature detection
                    // Browsers that support HTML5 download attribute
                    var url = URL.createObjectURL(blob);
                    link.setAttribute("href", url);
                    link.setAttribute("download", exportedFilenmae);
                    link.style.visibility = "hidden";
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                }
            }
        }

        function download() {
            let headers = {
                active_email: "ActiveProcessSetBy",
                crm_user: "CRM Owner",
                company: "Company",
                account: "Account",
                first_name: "FirstName",
                second_name: "Lastname",
                title: "JobTitle",
                lead_level: "LeadLevel",
                email: "Email",
                phone: "Phone",
                switchboard: "Switchboard",
                mobile: "Mobile",
                street: "Street",
                city: "City",
                province: "Province",
                postal_code: "PostalCode",
                fax: "Fax",
                website: "Website",
                description: "Description",
                url: "LinkedIn",
                twitter: "Twitter",
                facebook: "Facebook",
                country: "Country",
                lead_source: "LeadSource",
                lead_function: "LeadFunction",
                lead_industry: "LeadIndustry",
                region: "LeadRegion",
            };


            let leadsFormatted = [];

            // format the data
            leadsNotFormatted.forEach((item) => {
                let region = "";
                Object.keys(regions).forEach((reg) => {
                    if (regions[reg].includes(item.country.trim())) {
                        region = reg;
                    }
                });

                leadsFormatted.push({
                    active_email: document.getElementById("email").value || " ",
                    crm_user: document.getElementById("name").value || " ",
                    company: item.company || " ",
                    account: item.company || " ",
                    first_name: item.first_name || " ",
                    second_name: item.second_name || " ",
                    title: item.title || " ",
                    lead_level: " ",
                    email: " ",
                    phone: " ",
                    switchboard: " ",
                    mobile: " ",
                    street: " ",
                    city: item.city || " ",
                    province: " ",
                    postal_code: " ",
                    fax: " ",
                    website: " ",
                    description: " ",
                    url: item.url || " ",
                    twitter: " ",
                    facebook: " ",
                    country: item.country || " ",
                    lead_source: "DWCC Research Data",
                    lead_function: " ",
                    lead_industry: " ",
                    region: region || " ",
                });
            });
            var fileTitle =
                document.getElementById("document").value || "Research Document"; // or 'my-unique-title'

            exportCSVFile(headers, leadsFormatted, fileTitle); // call the exportCSVFile() function to process the JSON and trigger the download
        }

        download()

    });
})
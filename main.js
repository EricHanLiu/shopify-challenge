var data;

function fetchJSON (url)
{
    fetch(url, {
        headers: {
            "Accept": "application/json"
        }
    }).then( (response) =>
    {
        if (!response.ok)
        {
            alert('BAD JSON');
        }
        return response.json();
    }).then( (responseData) =>
    {
        data = responseData;
    });    
}

function lookup (query) 
{
    let results = [];

    for (let i = 0, len = data.length; i < len; i++) {
        let keywords = data[i].keywords;
        if (keywords.includes(query)) {
            results.push(data[i]);
        }      
    }

    return results;
}

$("#doSearch").click(function ()
{
    let query = document.getElementById("search").value;

    let results = lookup(query);

    document.getElementById("output").innerText = results;
});

const TORONTOWASTEURL = "https://secure.toronto.ca/cc_sr_v1/data/swm_waste_wizard_APR?limit=1000";
fetchJSON(TORONTOWASTEURL);


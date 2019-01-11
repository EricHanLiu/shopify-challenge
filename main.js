var data;

// fetch the JSON file and store the results in the data variable
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

// lookup the query through the set of keywords in the data object
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



// lookup the search box value  
function doQuery ()
{
    let query = document.getElementById("searchBar").value;

    let results = lookup(query);

    printResults(results, "output");
    // document.getElementById("output").innerText = results;
}

$("#searchButton").click(doQuery);

// listen for enter keypress
$("#searchBar").on('keyup', function (e) {
    if (e.keyCode == 13) {
        doQuery();
    }
});

// decodes the html entities in the return data to be actual html tags
function decodeHTML (html)
{
    let txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}

function printResults (results, target)
{ 
    // print each result in a div
    for (let i = 0, len = results.length; i < len; i++) 
    {
        let res = results[i];

        let container = document.createElement("div");
        let leftDiv = document.createElement("div");
        let rightDiv = document.createElement("div");
        let leftText = document.createElement("p");
        let rightText = document.createElement("p");
        let starIcon = document.createElement("i");

        container.classList.add("row");
        container.classList.add("my-1");
        leftDiv.classList.add("col-5");
        rightDiv.classList.add("col-7");

        starIcon.classList.add("far");
        starIcon.classList.add("fa-star");
        starIcon.addEventListener("click", function () { toggleFavorite (starIcon, res); });

        // render star based on if element is in favorite list
        leftText.innerHTML = decodeHTML(res.title); 
        rightText.innerHTML = decodeHTML(res.body);

        leftDiv.appendChild(leftText);
        leftDiv.appendChild(starIcon);
        rightDiv.appendChild(rightText);
        container.appendChild(leftDiv);
        container.appendChild(rightDiv);

        document.getElementById(target).appendChild(container);
    }
}

// favorite the element
let favorites = [];
function toggleFavorite (icon, res)
{
    if (!favorites.includes(res)) 
    {
        // add to favorites list, fill color
        favorites.push(res);
        icon.classList.remove("far");
        icon.classList.add("fas");
    } 
    else
    {
        // remove from favorites array, remove fill
        favorites.splice(favorites.indexOf(res), 1);
        icon.classList.remove("fas");
        icon.classList.add("far");
    }

    updateFavoritesDisplay(icon);
}

function updateFavoritesDisplay (icon)
{
    // <h4 class="d-none" id="favHeader">Favourites</h4>
    let favHeader = document.createElement("h4");
    favHeader.innerText = "Favourites";
    let favDiv = document.getElementById("favorites");

    favDiv.innerHTML = "";

    if (favorites.length !== 0)
    {
        // add favorites header
        favDiv.appendChild(favHeader);
    } 

    printResults(favorites, "favorites");
}

// listen for cleared searchbar
document.getElementById("searchBar").addEventListener("input", function () 
{
    if (document.getElementById("searchBar").value === "")
    {
        document.getElementById("output").innerText = "";
    }
});



const TORONTOWASTEURL = "https://secure.toronto.ca/cc_sr_v1/data/swm_waste_wizard_APR?limit=1000";

// main function called on page load
function main ()
{
    fetchJSON(TORONTOWASTEURL);
}

main();

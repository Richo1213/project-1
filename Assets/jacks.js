
// global variable
var giffyData
var parsedData
var artArr
var myKey
var myArr
var artData
var perArt
var totResults
var indexPos
var artCard
var artObj

let x;

function removeFav(event, key) {
    event.preventDefault()
    console.log(key)
    localStorage.removeItem(key)


}
function showFav(event) {
    $('#favList').removeClass('d-none')
    $('#selCard').addClass('d-none')
    $('#giffyList').addClass('d-none');
    event.preventDefault()
    thisarr = []
    $('#favList').html = ''
    for (var key in localStorage) {
        thisarr.push(key)
    }
    for (i = 0; i < localStorage.length; i++) {
        thisObj = localStorage[thisarr[i]]
        x = JSON.parse(thisObj)
        // JSON.parse(thisObj)
        console.log(x)
        var id = x[0].artId
        var imgTitle = x[0].title
        var imgUrl = x[0].picUrl
        var moreInfo = x[0].more
        var dates = x[0].date
        var med = x[0].medium
        var cult = x[0].culture
        var description = x[0].description
        var artist = x[0].artist


        $('#favList').append(`
                <div class="card mb-3" id='cards' style="width: 18rem;">
                <img src= '${imgUrl}' +'?height=150&width=150' class="card-img-top" alt="No Img">
                <div class="card-body">
                <h5 class="card-title">Title: ${imgTitle}</h5>
                <p class="card-text">Artist: ${artist}</p>
                <p class="card-text">Description: ${description}</p>
                <p class="card-text">Date: ${dates}</p>
                <p class="card-text">Medium: ${med}</p>
                <p class="card-text">Culture of origin: '${cult}'</p>
                <a href="${moreInfo}" target="_blank" class="btn btn-primary">More Info</a>
                <button  onClick='removeFav(event, ${id})' class="btn btn-danger">X</button>
                </div>
                </div>
            `)

    }

}


function showThisHideThat(event) {
    event.preventDefault()
    $('#selCard').addClass('d-none');
    $('#giffyList').removeClass('d-none');
    $('#selCard').html('')
}

function saveThis(event) {
    var storedCards = JSON.stringify(localStorage.storedCards)
    var imgTitle = artCard.title
    var imgUrl = artCard.primaryimageurl
    var moreInfo = artCard.url
    var dates = artCard.dated
    var med = artCard.medium
    var cult = artCard.culture
    var description
    var id = artCard.id
    console.log(artObj)
    var x = JSON.stringify(artObj)
    localStorage.setItem(id, x)

}

function showCard(event, indexPos) {
    artCard = artArr[indexPos]
    event.preventDefault()
    $('#giffyList').addClass('d-none')
    var imgTitle = artCard.title
    var imgUrl = artCard.primaryimageurl
    var moreInfo = artCard.url
    var dates = artCard.dated
    var med = artCard.medium
    var cult = artCard.culture
    var description
    var id = artCard.id
    if (artCard.description != null) {
        artist = artCard.description
    }
    else {
        artist = 'description unavailable'
    }
    var artist
    if (artCard.people != undefined) {
        artist = artCard.people[0].displayname
    }
    else {
        artist = 'Artist unavailable'
    }
    $('#selCard').append(`
                <div class="card mb-3" id='cards' style="width: 18rem;">
                <img src='${imgUrl}'+'?height=150&width=150' class="card-img-top" alt="No Img">
                <div class="card-body">
                <button onClick='saveThis()' class="saveBtn btn-warning"><i class="far fa-star"></i></button>
                <h5 class="card-title">Title: ${imgTitle}</h5>
                <p class="card-text">Artist: ${artist}</p>
                <p class="card-text">Description: ${description}</p>
                <p class="card-text">Date: ${dates}</p>
                <p class="card-text">Medium: ${med}</p>
                <p class="card-text">Culture of origin: '${cult}'</p>
                <a href="${moreInfo}" target="_blank" class="btn btn-primary">More Info</a>
                <button  onClick='showThisHideThat(event)' class="btn btn-danger">X</button>
                </div>
                </div>
            `).removeClass('d-none')

    artObj = [{
        'title': `${imgTitle}`,
        'artist': `${artist}`,
        'picUrl': `${imgUrl}`,
        'description': `${description}`,
        'date': `${dates}`,
        'medium': `${med}`,
        'culture': `${cult}`,
        'more': `${moreInfo}`,
        'artId': `${id}`
    }]
};

async function doSearch(event) {

    event.preventDefault()
    var search = document.querySelector('#search').value
    console.log(`[doSearch] search(${search})`)
    $('#selCard').addClass('d-none');
    $('#giffyList').removeClass('d-none');
    $('#favList').addClass('d-none');
    var apiEndpointBaseURL = "https://api.harvardartmuseums.org/object";
    var queryString = $.param({
        apikey: "8c5619d0-f2d7-430a-980b-16bfef977fa4",
        title: search,
        classification: "Paintings",
        size: '100'
    })

    $.getJSON(apiEndpointBaseURL + "?" + queryString, function (data) {
        console.log(data)
        artData = data;
        console.log(artData)
        artArr = artData.records
        console.log(artArr)
        if (artArr["length"] == 0) {
            alert(`${search} not found`)
        } else {
            $('#giffyList').html('')
            totResults = data.records
            $.each(artArr, function (k, v) {
                var imgUrl = v.primaryimageurl
                indexPos = k
                $('#giffyList').append(` 
         <div class="card mb-3" id='cards' style="width: 18rem;">
            <a href='#' onClick = 'showCard(event, ${k})'><img src='${imgUrl}'+'?height=150&width=150' class="card-img-top" alt="No Img">
            </div><a>
         `)
            });
        }
    });
}

console.log(`SCRIPTA CODE`);
console.log(`www.scripta.digital`);
console.log(`enjoy!`);

var key = `your_secrect_api_key`; //get your api key in google cloud plataform
var pid = "your_playlist_id";




async function requestPlaylist(){
    const response = await fetch(
        `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${pid}&maxResults=7&key=${key}`,
        {
            method: "GET",
            headers: {
                Accept:  "application/json"
            }
        }
    )
    let videos = []
    const body = await response.json()
    console.log(body);
    body.items.forEach(item => {
        data = new Object();

        data.id = item.snippet.resourceId.videoId
        data.title = item.snippet.title
        data.image = item.snippet.thumbnails.medium.url
        videos.push(data)   
    });

    return videos;
}

async function creatorDynamic(){
    let videos = await requestPlaylist()
    
    const container = document.querySelector('#container_result')
    const results = container.querySelector('#results')
    videos.forEach( item => {
        let li = document.createElement('li')
        
        let link = document.createElement('a')
        link.setAttribute('href', '#')
        link.innerHTML = item.title
        li.appendChild(link)
        
        let thumb = document.createElement('img')
        thumb.setAttribute('src', item.image)

        link.appendChild(thumb)

        results.appendChild(li)
    })
}

creatorDynamic()



//jQuery snippet alternative ->
// $(document).ready(() => {
//     function getVids(pid){
//         $.get(
//             "https://www.googleapis.com/youtube/v3/playlistItems", {
//             part: "snippet",
//             maxResults: 10,
//             playlistId: pid,
//             key: "your_secrect_key"},
//             function(data){
//                 var output;
//                 $.each(data.items, function(i, item){
//                     console.log(item);
//                 })
//             }
//         );
//     }
//     getVids(pid)

// });

document.getElementById("search").addEventListener("click", searchSong);


document.getElementById('song-name').addEventListener("keypress", function(){

    if(event.keyCode == 13){
        searchSong();
    }
})


function searchSong(){

    const songName = document.getElementById("song-name").value;

    const api = "https://api.lyrics.ovh/suggest/";
    const url = `${api}${songName}`;

    fetch(url)
    .then(response => response.json())
    .then(data =>{

        const results = document.getElementById("results");
        results.innerHTML = "";

        const fancyResults = document.getElementById("fancy-results");
        fancyResults.innerHTML = "";

        for (let i = 0; i < 10; i++) {
            const element = data.data[i];
            const title = element.title;
            const artist = element.artist.name;

            results.innerHTML +=    `<p class="author lead">
                                        <strong id="title-name">${title}</strong> - Album by <span id="artist-name">${artist}</span>
                                        <button class="btn btn-success show-lyrics">Get Lyrics</button>
                                    </p>`;

            fancyResults.innerHTML += `<div class="single-result row align-items-center my-3 p-3">
                                            <div class="col-md-7">
                                                <img src="${element.album.cover}" alt="" />
                                                <h3 class="lyrics-name">${title}</h3>
                                                <p class="author lead">Album by <span>${artist}</span></p>
                                            
                                            </div>
                                            <div class="col-md-5 text-md-right text-center">
                                                <a class="btn btn-success" href="${element.link}">Audio</a>
                                                <button class="btn btn-success show-fancy">Get Lyrics</button>
                                            </div>
                                        </div>`;                      

        }
        
        const buttons = document.getElementsByClassName("show-lyrics");
        const setLyrics = document.getElementById("single-lyrics");
        setLyrics.innerText = "";

        for (let i = 0; i < buttons.length; i++) {
            const element = buttons[i];

            element.addEventListener("click", function(event){

                const titleName = this.parentNode.childNodes[1].innerHTML;
                const artistName = this.parentNode.childNodes[3].innerHTML;

                const secondUrl = `https://api.lyrics.ovh/v1/${artistName}/${titleName}`;

                fetch(secondUrl)
                .then(secondRes => secondRes.json())
                .then(lyricsData => {

                    const lyrics = lyricsData.lyrics;
                    if(lyrics == undefined){
                        
                        
                        setLyrics.innerHTML = `<h2 class="text-success mb-4">${titleName} - by ${artistName}</h2>
                                                <pre class="lyric text-white">This Songs Lyrics not found.Feel comfort listen audio !!!!.....</pre>`;
                        

                    }
                    else {

                        
                        setLyrics.innerHTML = `<h2 class="text-success mb-4">${titleName} - ${artistName}</h2>
                                                <pre class="lyric text-white">${lyrics}</pre>`;


                    }


                })

            });
            
        }


        const fancyButton = document.getElementsByClassName("show-fancy");
        const fancyLyrics = document.getElementById("fancy-lyrics");
        fancyLyrics.innerText = "";

        for (let i = 0; i < fancyButton.length; i++) {
            const fancy = fancyButton[i];
            
            fancy.addEventListener("click", function(event){

                
                
                const fancyTitleName = this.parentNode.parentNode.childNodes[1].childNodes[3].innerHTML;
                const fancyArtistName = this.parentNode.parentNode.childNodes[1].childNodes[5].childNodes[1].childNodes[0].textContent;

                const fancyUrl = `https://api.lyrics.ovh/v1/${fancyArtistName}/${fancyTitleName}`;

                fetch(fancyUrl)
                .then(fancyResponse => fancyResponse.json())
                .then(lyricsData => {

                    const lyrics = lyricsData.lyrics;
                    if(lyrics == undefined){
                        
                        
                        fancyLyrics.innerHTML = `<h2 class="text-success mb-4">${fancyTitleName} - by ${fancyArtistName}</h2>
                                                <pre class="lyric text-white">This Songs Lyrics not found.Feel comfort listen audio !!!!.....</pre>`;
                        

                    }
                    else {

                        
                        fancyLyrics.innerHTML = `<h2 class="text-success mb-4">${fancyTitleName} - ${fancyArtistName}</h2>
                                                <pre class="lyric text-white">${lyrics}</pre>`;


                    }


                })

            });

        }


         
        document.getElementById("song-name").value = "";
        console.log("this added by try");
    })

}







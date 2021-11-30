const KEY = '5fa28262f31acb330c40f96cd8f2b6fa';

const div = document.querySelector('#wrapper');
const searchBtn = document.querySelector('button');
const textInput = document.querySelector('.input-search'); 
let numberInput = document.querySelector('#amount');


searchBtn.addEventListener('click', function(){
    if (numberInput.value == ""){
        alert("Dont forget to insert the amount of pictures you want displayed")
    }
    if(textInput.value == ""){
        alert("Dont forget to insert a keyword")
    }
    const divEl = document.querySelectorAll("#wrapper *")
    for (let i=0; i<divEl.length; i++){
        let el = divEl[i];
        el.remove();
    }
    searchPic(textInput.value, numberInput.value);
}
)





function searchPic(searchText, searchNumber){
    const url = `https://www.flickr.com/services/rest/?api_key=${KEY}&method=flickr.photos.search&text=${searchText}&sort=relevance&safe_search=1&accuracy=1&content_type=1&format=json&nojsoncallback=1&per_page=${searchNumber}&page=1`;

    fetch(url).then(
        function(response){
            if(response.status >= 200 && response.status < 300){
                return response.json();
            }
            else{
                throw "It didnt work";
            }
        }
    ).then(
        function (data){
            for(let i=0; i< searchNumber; i++){
                console.log(data)
                getPicUrl(data.photos.photo[i]);
            }
        }
    ).catch(
        function(error){
            console.log(error);
        }
    );
}

function getPicUrl(photoObject){
    let photo = photoObject;
    let size = document.querySelector(".size-selector").value;
    let imgUrl = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_${size}.jpg`;
    console.log(imgUrl);
    displayImg(imgUrl);
}

function displayImg(url){
    let img = document.createElement("img")
    img.src = url;
    wrapper.appendChild(img);
}

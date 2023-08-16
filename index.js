// Public key
//  9ab871748d83ae2eb5527ffd69e034de--> api key

// Private Key
// ad79003cf7316d9bd72c6eda71d1c93d7e807e90

// hash
// 1ad79003cf7316d9bd72c6eda71d1c93d7e807e909ab871748d83ae2eb5527ffd69e034de
// md5(hash) = d35377547e551cd64a60657d2517bb7f 

var heroSearchList =[];
var favouriteHeroList =[];
var heroList = document.getElementById('hero-list');
var searchbar = document.getElementById('heroSearch');
searchbar.addEventListener('keyup',processInput);
var textSearched;
document.addEventListener('click',processCLickEvents);
var clickedHero ;

// fetching the favourite hero list..
var favherolst = JSON.parse(localStorage.getItem('favourite-hero-list'));
if(favherolst!=null){
    favouriteHeroList = favherolst;
}
//function to fetch the hero obj from heroId.
function getHero(heroId){
    for(var i=0; i<heroSearchList.length; i++){
        if(heroSearchList[i].id == heroId){
            return heroSearchList[i];
        }
    }
}

// function to process different clickEvents
function processCLickEvents(event){
    var target = event.target;
    console.log(target.className);
    if(target.className =='fa-regular fa-heart'){
        var heroId = target.dataset.id;
        favouriteHeroList.push(getHero(heroId));
        localStorage.setItem('favourite-hero-list',JSON.stringify(favouriteHeroList));
        target.className = 'fa-sharp fa-solid fa-heart';
    }
    else if(target.className == 'fa-sharp fa-solid fa-heart'){
        // remove from favorites list
        var heroId = target.dataset.id;
        let newFavList = favouriteHeroList.filter(function(hero){
            return heroId != hero.id;
        })
        favouriteHeroList = newFavList;
        localStorage.setItem('favourite-hero-list',JSON.stringify(favouriteHeroList));
        target.className = 'fa-regular fa-heart';
    }
    else if(target.className =="moreinfo"){
        var heroId = target.dataset.id;
        clickedHero = getHero(heroId);
        console.log(clickedHero);
        localStorage.setItem('clicked-hero',JSON.stringify(clickedHero));
    }
    
}
// function to process the input...
function processInput(event){
    textSearched = searchbar.value;
    //console.log(textSearched);
    if(textSearched.length>0){
        var a = fetch(`https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${textSearched}&limit=15&apikey=9ab871748d83ae2eb5527ffd69e034de&hash=d35377547e551cd64a60657d2517bb7f?ts=1`)
    .then(function (response) {
        return response.json();
        })
        .then(function (response_data){
            heroSearchList = response_data.data.results;
            
            renderSearchList();
        });
    }
    else{
        heroSearchList=[];
        renderSearchList();
    }

    
}

// function to seearch the favourite hero in the favourite list..
function searchFavoriteList(heroId){
    for(var i=0;i<favouriteHeroList.length;i++){
        if(favouriteHeroList[i].id  == heroId){
            return true;
        }
    }
    return false;
}

// helper function to add the li items to the screen
function addTaskToDom(hero){
    const li = document.createElement('li');
    if(searchFavoriteList(hero.id)){
        li.innerHTML = 
    `
    
    <div id = "heroDetails">
    <img src="${hero.thumbnail.path+'/portrait_medium.' + hero.thumbnail.extension}" alt="">
    <a class ="moreinfo" data-id =${hero.id}  href = "superHeroPage.html">${hero.name}</a>
     <i class="fa-sharp fa-solid fa-heart" data-id =${hero.id}></i>
    </div>
    `;
    }
    else{
        li.innerHTML = 
    `

    <div id = "heroDetails">
    <img src="${hero.thumbnail.path+'/portrait_medium.' + hero.thumbnail.extension}" alt="">
    <a  class ="moreinfo" data-id =${hero.id}  href = "superHeroPage.html">${hero.name}</a>
     <i class="fa-regular fa-heart" data-id =${hero.id}></i>
    </div>
    `;
    }
    
    heroList.append(li);
}
// function to render the search items on the screen.
function renderSearchList(){
    heroList.innerHTML='';
    if(textSearched.length>0 && heroSearchList.length==0    ){
        const li = document.createElement('li');
        li.innerHTML = 'No search results found';
        heroList.append(li);
    }
    else{
        for(let i =0;i<heroSearchList.length;i++){
            addTaskToDom(heroSearchList[i]);
        } 

}  
}

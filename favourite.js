var favheroList = document.getElementById('fav-hero-list');
var favouriteHeroList =[];

// getting the favourite hero list from the local storage
var favherolst = JSON.parse(localStorage.getItem('favourite-hero-list'));
if(favherolst!=null){
    favouriteHeroList = favherolst;
}
document.addEventListener('click',processCLickEvents);
// function to process clicks...
function processCLickEvents(event){
    var target = event.target;
    if(target.className == 'fa-sharp fa-solid fa-heart'){
        // remove from favorites list
        var heroId = target.dataset.id;
       // let remHero = getHero(heroId);
        let newFavList = favouriteHeroList.filter(function(hero){
           // console.log(hero.id +" and "+heroId );
            return heroId != hero.id;
        })
        //console.log(newFavList);
        favouriteHeroList = newFavList;
        localStorage.setItem('favourite-hero-list',JSON.stringify(favouriteHeroList));
        renderSearchList();
        //target.className = 'fa-regular fa-heart';
    }
    else if(target.className =="moreinfo"){
        var heroId = target.dataset.id;
        clickedHero = getHero(heroId);
        console.log(clickedHero);
        localStorage.setItem('clicked-hero',JSON.stringify(clickedHero));
       // alert('hr');
    }
    // favouriteHeroList.push() <i class="fa-sharp fa-solid fa-heart"></i>
}
// funtion to get the hero from the heroid...
function getHero(heroId){
    for(var i=0; i<favouriteHeroList.length; i++){
        if(favouriteHeroList[i].id == heroId){
            return favouriteHeroList[i];
        }
    }
}

renderSearchList();


// helper function to add the li items to the screen
function addTaskToDom(hero){
    const li = document.createElement('li');
    li.innerHTML = 
    `
    
    <div id = "heroDetails">
    <img src="${hero.thumbnail.path+'/portrait_medium.' + hero.thumbnail.extension}" alt="">
    <a class ="moreinfo" data-id =${hero.id}  href = "superHeroPage.html">${hero.name}</a>
     <i class="fa-sharp fa-solid fa-heart" data-id =${hero.id}></i>
     
    </div>
    `;
    favheroList.append(li);
}
// function to render the list on the screen..
function renderSearchList(){
    favheroList.innerHTML='';
        for(let i =0;i<favouriteHeroList.length;i++){
            addTaskToDom(favouriteHeroList[i]);
        }   
}


var clickedHero = JSON.parse(localStorage.getItem('clicked-hero'));

var title = document.getElementById('title');
var comicsList = document.getElementById('comics-list');
var storiesList = document.getElementById('stories-list');
var eventList = document.getElementById('Event-list');
var seriesList = document.getElementById('series-list');
var listofInfo = [comicsList,storiesList, eventList, seriesList];
title.innerHTML =` More Info on ${clickedHero.name}`;


var heading = document.getElementById('heading');
// function to display hero name ...
function createHeading(){
    const div = document.createElement('div');
    div.innerHTML =`
        <h1 id ="hero-name">${clickedHero.name}</h1>
        <div id= "basic-info"> 
        <img src="${clickedHero.thumbnail.path+'/portrait_medium.' + clickedHero.thumbnail.extension}" alt="">
        <p id ="description">${clickedHero.description} </p>
        <div id ="links">
        <a href ="#comics-list">Comics</a><br>
        
        <a href ="#stories-list">Stories</a><br>
        <a href ="#Event-list">Event</a><br>
        <a href ="#series-list">Series</a>
        </div>
        </div>
        <hr>  
             
         `;
    
    heading.append(div);
   renderSearchList(clickedHero.comics.items,0);
   renderSearchList(clickedHero.stories.items,1);
   renderSearchList(clickedHero.events.items,2);
   renderSearchList(clickedHero.series.items,3);
}
createHeading();
// helper function to add the li items to the screen
function addTaskToDom(comic,x){
    const li = document.createElement('li');
 
    li.innerHTML =`
    
    ${comic.name}

    `;
    
    listofInfo[x].append(li);
}
// function to render the list on the screen..
function renderSearchList(list,x){
    list.innerHTML='';
    if(list.length>0 && list.length<8){
        for(let i=0; i<list.length;i++){
            addTaskToDom(list[i],x);
        }
    }
    else{
        for(let i=0;i<8;i++){
         
            addTaskToDom(list[i],x);
        }
    }  
}
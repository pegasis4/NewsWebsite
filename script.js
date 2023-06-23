const apikey="aa29b1b9f6cb415ab93fb6bf6b8eeb21";
const url="https://newsapi.org/v2/everything?q=";
window.addEventListener('load',()=>fetchnews("India"));
async function fetchnews(query){
    const res=await fetch(`${url}${query}&apiKey=${apikey}`);
    const data=await res.json();
    binddata(data.articles);
}
function binddata(articles){
    const Cardscontainer=document.getElementById('cardscontainer');
    const newscardtemplate=document.getElementById('templatenewscard');
    Cardscontainer.innerHTML = "";
    articles.forEach((article)=>{
        if(!article.urlToImage)return; 
        const cardclone=newscardtemplate.content.cloneNode(true);
        filldataincard(cardclone,article);
        Cardscontainer.appendChild(cardclone);

    });
}    
function filldataincard(cardclone,article){
        const newimg=cardclone.querySelector('#newsimg');
        const newtitle=cardclone.querySelector('#newstitle');
        const newsource=cardclone.querySelector('#newssource');
        const newdesc=cardclone.querySelector('#newsdesc');
        newimg.src=article.urlToImage;
        newtitle.innerHTML=article.title;
        newdesc.innerHTML=article.description;
        const date=new Date(article.publishedAt).toLocaleString("en-US",{
            timeZone:"Asia/Jakarta"

        });
        newsource.innerHTML= `${article.source.name} : ${date}`;
        cardclone.firstElementChild.addEventListener('click',()=>{
            window.open(article.url,"_blank");

        })
       
}
let curselectednav=null;
function onnavitemclick(id){
    fetchnews(id);
    const navitem=document.getElementById(id);
    curselectednav?.classList.remove('active');
    curselectednav=navitem;

    curselectednav.classList.add('active');
}
const searchbutton=document.getElementById('searchbutton')
const searchtext=document.getElementById('searchtext')
searchbutton.addEventListener('click',()=>{
    const query=searchtext.value
    if(!query)return;
    fetchnews(query)
    curselectednav?.classList.remove('active')
    curselectednav=null
})
function reload(){
    window.location.reload();
}

// load more images on scroll




const loaderPlaceHolder = document.querySelector(".loader-placeholder");

const imageSet = document.querySelectorAll("img");
let totalImages = [...imageSet].length;
console.log(`Number of images on fist load ${totalImages}`);


imageSet.forEach(progressiveFadeIn);

function progressiveFadeIn(image, index) {
 
  //console.log(image)
  //add css class with fade-in
  if(!image.classList.contains("fade-in-animate")){
    image.classList.add("fade-in-animate");
    // console.log(image,index)
    image.style.animationDelay = 0.5 * index  + "s";
  }
};


function onScrollLoad(ev){

  console.log("scroll event triggered");
  
  const scrollPercent = getVerticalScrollPercentage(document.body);
  console.log(`Scroll % ${scrollPercent}`)
  if(scrollPercent > 90 ){
    console.log("Scrolled around edge of page, loading more")
    requestAnimationFrame(() => loadImages(12,loaderPlaceHolder));
  }


}



window.addEventListener("scrollend", onScrollLoad);

function loadImages(numberToLoad , beforeHTMLNode){

  const loadImageTemplateHTML =  `https://picsum.photos/200/300?random={{id}}`

console.log(`should be inserting ${numberToLoad} new Images`)
  for( let i = 0; i<numberToLoad; i++){
    
   
    const filledImgSrcTemplate = replaceTemplatePlaceholders(loadImageTemplateHTML,{id:++totalImages});
    
    const imgNode =  document.createElement("img");
    imgNode.src = filledImgSrcTemplate;
    progressiveFadeIn(imgNode, i);
    
    
    const a = beforeHTMLNode.parentNode.insertBefore(imgNode, beforeHTMLNode)
  
     
    
  }
}



// HELPER FUNCTION (to create HTML nodes from string)
function txtToHtmlNode(txt) {
  return document.createRange().createContextualFragment(txt);
}

function replaceTemplatePlaceholders(template, replacements) {
        const placeholderRegex = /{{(.*?)}}/g;

        return template.replace(placeholderRegex, (_, placeholderName) => {
            return replacements[placeholderName.trim()] || "";
        });
    }


// HELPER FUNCTION (to compute scrolled percentage out of a given element), returns 0-100
function getVerticalScrollPercentage( elm ){
  let p = elm.parentNode || document.body
  return (elm.scrollTop || p.scrollTop) / (p.scrollHeight - p.clientHeight ) * 100
}
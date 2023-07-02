
let typingEvents = [];

function typeWriter(element, text, speed, index, isWord, callback){
    if(index < text.length){
        if(isWord){
            element.innerHTML = element.innerHTML.slice(0,-text[index].length);
            element.innerHTML += text[index] + " ";
            

            if(index < text.length - 1){
                for(let i = 0; i < text[index+1].length; i++){
                    element.innerHTML += "&#9617;";
                }
            }


           // element.innerHTML += text[index]  + " ";
        }
        else{
            element.innerHTML += text.charAt(index);
        }
        
        let adjustedSpeed = speed;
        if(isWord){
            adjustedSpeed = 70 + text[index].length*20/index;
        }
        index++;
        typingEvents.push(setTimeout( function(){typeWriter(element, text, speed, index, isWord, callback)}, adjustedSpeed));
    }
    else{
        if(element.className.includes("descriptionTitle2")){
            element.className += " blinkCursor";
        }
        else{
            element.style.borderRight = "none";
        }
        
        if(typeof callback !== 'undefined'){
            callback();
        }
        
    }
}

descriptionTitle = document.getElementById("descriptionTitle");
descriptionTitle2 = document.getElementById("descriptionTitle2");
descriptionBody = document.getElementById("descriptionBody");
descriptionTags = document.getElementById("descriptionTags");
descriptionReadMore = document.getElementById("readMore");
descriptionBox = document.getElementById("descriptionBox");

titleText = "Project\xa0ToI\xa0";
bodyText = "ToI is a series of home appliances investigating our relationships with data and technology: ToI want to keep us connected without the associated anxiety and emotional baggage. ToI requires minimal amounts of direct interactions with human users, adopting a non-interfering approach to inform us of the worlds we live in.";
tagText = "IoT, Microcontrollers, Etc"

let images = document.querySelectorAll('.images');

console.log(images);

images.forEach(function(image, index){
    image.children[0].addEventListener("click", (event) =>{
        console.log(index);
        updateText(index);

        images.forEach(function(image2){
            image2.classList.remove("imageSelected");
        });

        image.classList.add("imageSelected");


    })
});

let currentIndex = -1;

newline = document.createElement("br");
newline.id = "newline";

function updateText(index)
{
    if(currentIndex != index)
    {
        descriptionTitle.innerHTML = "";
        descriptionTitle2.innerHTML = "";
        descriptionTitle.className = "descriptionTitle"
        descriptionBody.innerHTML = "";
        descriptionTags.innerHTML = "";
        descriptionReadMore.innerHTML = "";

        if(newline!==null){
            newline.remove();
        }
    
        typingEvents.forEach(event =>{
            clearTimeout(event);
        });
        typingEvents = [];

        
    
        if(typeof textData[index].titleText2 != 'undefined'){
            typeWriter(descriptionTitle, textData[index].titleText, 150, 0, false,          
                
                function(){
                descriptionTitle.parentNode.insertBefore(newline, descriptionTitle.nextSibling);
                typeWriter(descriptionTitle2, textData[index].titleText2, 150, 0, false);
            });
            
        }
        else{
            typeWriter(descriptionTitle, textData[index].titleText, 150, 0, false);
        }
        typeWriter(descriptionBody, textData[index].bodyText.split(" "), 100, 0, true, function(){typeWriter(descriptionReadMore, textData[index].readMore, 80,0, false)});
        typeWriter(descriptionTags, textData[index].tagText.split(" "), 1500, 0, true);
        currentIndex = index;
    }

}

window.addEventListener("load", (event) => {
    updateText(textData.length-1);
  });


  descriptionBox.addEventListener("click", (event) =>{
    updateText(textData.length-1);
  })


//"animation: blink .5s step-end infinite alternate;"
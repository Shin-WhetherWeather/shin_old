
let typingEvents = [];

function typeWriter(element, text, speed, index, isWord, callback, is2Line = false){
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
        typingEvents.push(setTimeout( function(){typeWriter(element, text, speed, index, isWord, callback, is2Line)}, adjustedSpeed));
    }
    else{
        

        if(is2Line){
            if(element.className.includes("descriptionTitle2")){
                element.className += " blinkCursor";
            }
            else{
                element.style.borderRight = "none";
            }
        }
        else{
            element.className += " blinkCursor";
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
    image.children[0].addEventListener("click", function(e){
        console.log(e.target.parentElement.id);
        console.log(index);
        updateText(e.target.parentElement.id);

        images.forEach(function(image2){
            image2.classList.remove("imageSelected");
        });

        image.classList.add("imageSelected");


    })
});



let currentIndex = -1;
let currentId = "default";

newline = document.createElement("br");
newline.id = "newline";

function updateText(index)
{
    if(currentIndex != index)
    {
        descriptionTitle.style.borderRight = null;
        descriptionTitle2.style.borderRight = null;
        descriptionTitle.classList.remove("blinkCursor");
        descriptionTitle2.classList.remove("blinkCursor");



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

            descriptionTitle2.style.borderRight = "14px solid;";
            typeWriter(descriptionTitle, textData[index].titleText, 110, 0, false,          
                
                function(){
                descriptionTitle.parentNode.insertBefore(newline, descriptionTitle.nextSibling);
                typeWriter(descriptionTitle2, textData[index].titleText2, 110, 0, false, function(){}, true);
            },
            true);
            
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
    updateText("default");
  });


descriptionBox.addEventListener("click", (event) =>{
    updateText("default");
    images.forEach(function(image){
        image.classList.remove("imageSelected");
    });
  });



//"animation: blink .5s step-end infinite alternate;"
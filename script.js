let typingEvents = [];

function typeWriter(element, text, speed, index, isWord){
    if(index < text.length){
        if(isWord){
            element.innerHTML += text[index]  + " ";
        }
        else{
            element.innerHTML += text.charAt(index);
        }
        index++;
        typingEvents.push(setTimeout( function(){typeWriter(element, text, speed, index, isWord)}, speed));
    }
    else{
        element.className += " blinkCursor";
    }
}

descriptionTitle = document.getElementById("descriptionTitle");
descriptionBody = document.getElementById("descriptionBody");
descriptionTags = document.getElementById("descriptionTags");

titleText = "Project\xa0ToI\xa0";
bodyText = "ToI is a series of home appliances investigating our relationships with data and technology: ToI want to keep us connected without the associated anxiety and emotional baggage. ToI requires minimal amounts of direct interactions with human users, adopting a non-interfering approach to inform us of the worlds we live in.";
tagText = "IoT, Microcontrollers, Etc"

let images = document.querySelectorAll('.images');

console.log(images);

images.forEach(function(image, index){
    image.children[0].addEventListener("mouseover", (event) =>{
        console.log(index);
        updateText(index);
    })
});

function updateText(index)
{
    descriptionTitle.innerHTML = "";
    descriptionTitle.className = "descriptionTitle"
    descriptionBody.innerHTML = "";
    descriptionTags.innerHTML = "";

    typingEvents.forEach(event =>{
        clearTimeout(event);
    });
    typingEvents = [];


    typeWriter(descriptionTitle, textData[index].titleText, 150, 0, false);
    typeWriter(descriptionBody, textData[index].bodyText.split(" "), 100, 0, true);
    typeWriter(descriptionTags, textData[index].tagText.split(" "), 1500, 0, true);
}


//"animation: blink .5s step-end infinite alternate;"
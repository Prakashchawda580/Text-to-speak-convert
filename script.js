// let speech =new SpeechSynthesisUtterance();
// let voices=[];

// let voiceselect= document.querySelector("select");

// window.speechSynthesis.onvoiceschanged=() =>{
//     voices=window.speechSynthesis.getVoices();
//     speech.voice=voices[0];


//     voices.forEach((voice,i) => (voiceselect.options[i]=new 
//         Option(voice.name,i)));
        
//     };
//     voiceselect.addEventListener("change",()=>{
//         speech.voice=voices[voiceselect.value];
        
//     });
  

// document.querySelector("button").addEventListener("click",()=>
// {
//     speech.text=document.querySelector("textarea").value;
//     window.speechSynthesis.speak(speech);
// });/]
let speech = new SpeechSynthesisUtterance();
let voices = [];
let voiceselect = document.querySelector("select");

// Populate voice list
function populateVoiceList() {
    voices = window.speechSynthesis.getVoices();
    if (voices.length === 0) return; // Ensure voices are available

    // Clear previous options
    voiceselect.innerHTML = "";

    // Populate dropdown
    voices.forEach((voice, i) => {
        let option = document.createElement("option");
        option.value = i;
        option.textContent = `${voice.name} (${voice.lang})`;
        voiceselect.appendChild(option);
    });

    // Set default voice
    if (voices[0]) speech.voice = voices[0];
}

// Call populateVoiceList() once on page load
populateVoiceList();

// Also call when voices are loaded (Chrome)
window.speechSynthesis.onvoiceschanged = populateVoiceList;

// Change voice when dropdown value changes
voiceselect.addEventListener("change", () => {
    let selectedIndex = parseInt(voiceselect.value, 10);
    if (voices[selectedIndex]) {
        speech.voice = voices[selectedIndex];
    }
});

// Speak button click event
document.querySelector("button").addEventListener("click", () => {
    speech.text = document.querySelector("textarea").value;
    if (speech.text.trim() !== "") {
        window.speechSynthesis.speak(speech);
    } else {
        alert("Please enter text to speak!");
    }
});

console.log("hello");
const words = ["Tanuja", "Gubdii", "Naktoda","Myone", "Gudii", "chaman"];
// const words = ["one", "two", "three","four", "five", "six"];
let i = 0;
let j = 0;
let currentWord = "";
let isDeleting = false;

function type() {
  currentWord = words[i];
  if (isDeleting) {
    document.getElementById("typewriter").textContent = currentWord.substring(0, j-1);
    j--;
    if (j == 0) {
      isDeleting = false;
      i++;
      if (i == words.length) {
        i = 0;
      }
    }
  } else {
    document.getElementById("typewriter").textContent = currentWord.substring(0, j+1);
    j++;
    if (j == currentWord.length) {
      isDeleting = true;
    }
  }
  setTimeout(type, 200);
}
var swiper = new Swiper(".mySwiper", {
  effect: "cards",
  grabCursor: true,
});
type();
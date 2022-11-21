import { birdsData } from "./birdsData.js";
import { result } from "./script.js";


export function renderBirds(currentStage) {
  let audioYes = new Audio('./assets/audio/audio-yes.mp3')
  let audioNo = new Audio('./assets/audio/audio-no.mp3')
  let birdOrder = 0;
  let counter = 5;
  let isFinishStage = false;
  const birdNames = document.querySelectorAll(".option-answer"); 
  let typeBird = document.querySelectorAll('.type-bird'); 
  const score = document.querySelector('#score');
  const nextLevel = document.querySelector('.btn-next');
  let point = document.querySelectorAll('.option-color');
  let blockBird = document.querySelector(".answer-result");
  let blockGreeting = document.querySelector(".answer-start");

  for(let el of point){
   el.style.backgroundColor = 'transparent'; 
  }
  document.querySelector(".name-hide").innerHTML = '*******'; 
  document.querySelector(".question__img").src = './assets/img/img-hide.jpg'; 

  blockBird.style.display = "none";
  blockGreeting.style.display = "block";

   if(currentStage > 0){
      typeBird[currentStage-1].classList.remove("btn-checked");
     } 
     
  typeBird[currentStage].classList.add("btn-checked");

  let random = Math.floor(Math.random() * (6 - 1 + 1)) + 1;
//   console.log(random)
  // это id моего вопроса (сравнивать его с ответами)
  document.querySelector(".game__question-player").src = birdsData[currentStage][random-1].audio;

  for (const bird of birdsData[currentStage]) {
    birdNames[birdOrder].setAttribute('data-id', birdOrder+1);
    birdNames[birdOrder].innerHTML = bird.name;
    birdOrder++;
   }
   let target = document.querySelector('.game__task-option');
   
    target.addEventListener("click", (e) => {
      // console.log(e.target.dataset.id);
      if(e.target.dataset.id){
         let birdId = Number(e.target.dataset.id);
         // console.log(birdId)
         if(birdId === random && !isFinishStage){
         
            isFinishStage = true;
            
            audioYes.play(); 
            point[birdId-1].style.backgroundColor = 'green';
            document.querySelector(".game__question-player").src = '';
            // console.log(birdId)
            
            document.querySelector(".question__img").src = birdsData[currentStage][random-1].image;
            document.querySelector(".name-hide").innerHTML = birdsData[currentStage][random-1].name;

           
            if(currentStage === birdsData.length-1){
               window.location.href = '#output';
               // заканчиваем игру, переходим на страницу результатов
               result.score += counter;
               score.innerHTML = result.score; // result.score это результат игры
               document.querySelector('#score-result').innerHTML = result.score;
               if(result.score == 30){
                  document.querySelector('.output__btn').style.display = 'none';
                  document.querySelector('.output__victory').style.display = 'block';
               } else{
                  document.querySelector('.output__btn').style.display = 'block';
                  document.querySelector('.output__victory').style.display = 'none';
               }
            } else{
               result.score += counter;
               score.innerHTML = result.score;
               nextLevel.classList.add('active');
               if(isFinishStage){
                  nextLevel.classList.add('active');
                  nextLevel.addEventListener('click', goNext);
               }            
            }                       
            // console.log('успех')
         } else{
            if(!isFinishStage){
            if(counter > 0){ counter--};
            audioNo.play();
            point[birdId-1].style.backgroundColor = 'red';          
         }
            // console.log('no', counter)
         }
      
      blockBird.style.display = "block";
      blockGreeting.style.display = "none";

      document.querySelector(".result-img").src = birdsData[currentStage][birdId-1].image;
      document.querySelector(".result-audio").src = birdsData[currentStage][birdId-1].audio;
      document.querySelector(".name-ru").innerHTML = birdsData[currentStage][birdId-1].name;
      document.querySelector(".name-lat").innerHTML = birdsData[currentStage][birdId-1].species;
      document.querySelector(".result-content").innerHTML = birdsData[currentStage][birdId-1].description;      
      }      
    });
  
function goNext(){
   nextLevel.removeEventListener('click', goNext);
   nextLevel.classList.remove('active');
   currentStage++;
   renderBirds(currentStage);   
}
}

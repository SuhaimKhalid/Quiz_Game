
// Quiz Intro Section Variables
var quiz_Intro = document.getElementById("quiz_Intro");
var view_highscore = document.getElementById("view_highscore");



// Question Area Variables
var questions_area = document.getElementById("questions_area");
var question_title = document.getElementById("question_title");
var choices = document.getElementById("choices");
var time_div = document.getElementById("time_div");
var qn=0;      //Question number
var score=0;  // Score of the game

// End Screen Variable
var end_screen = document.getElementById("end_screen");
var final_score = document.getElementById("final_score");
var initials = document.getElementById("initials");
var submit = document.getElementById("submit");

var timerChecker=false;

// Highscore Variables
var Highscores = document.getElementById("Highscores");
var highscores_list = document.getElementById("highscores_list");
var userName_list=[];
var score_list=[];


// Start the Game
var start_quiz = document.getElementById("start_quiz");

   // Function to start the game
   start_quiz.addEventListener("click",(()=>{
      qn=0;
      score=0;
      quiz_Intro.className="hide";
      questions_area.className="";
      timerChecker=false;
      lastanswer=false;

      Showquestions();
      timerfuntion();
   }));
   var timer;
   var lastanswer=false;
   var Showquestions = ()=>{
      console.log(qn);
      // To show Question from the list
      question_title.textContent=questions[qn].question;
      while(choices.hasChildNodes())
      {
         choices.removeChild(choices.firstChild);
      }

      // To show answers
      for(var i=0; i<questions[qn].answers.length; i++)
      {
         var answer_btn = document.createElement("button");
         answer_btn.className="answer"
         answer_btn.textContent=i+1 +" " + questions[qn].answers[i];
         answer_btn.setAttribute("data-index", i)
         choices.appendChild(answer_btn);
         // Funvtion to check anwers
         answer_btn.addEventListener("click",((event)=>{
         timerChecker = false; // Stop the timer when an answer is clicked
         if(event.target.dataset.index==questions[qn].correct)
         {
            score+=10;
         }
         if(qn<questions.length-1)
         {
            qn++;
            Showquestions();
         }
         else{
            questions_area.className="hide";
            end_screen.className="";
            lastanswer=true;
            timerChecker=true;
            endscreenFunction();
         }
         
         
      }));
      timerfuntion();
      }
   };

   // Timer Function
   function timerfuntion(){
      if(lastanswer==true)
      {
         clearInterval(timer);
      }
      if(!timerChecker)
      {
         timerChecker = true; // Start the timer only if it's not already running
         clearInterval(timer);
         while(time_div.hasChildNodes())
         {
            time_div.removeChild(time_div.firstChild);
         }
  
      var timebar= document.createElement("div");
      timebar.className="timerbar";
      var timewidth=100;
      time_div.appendChild(timebar);

         // Function to run Time bar
         timer = setInterval(()=>{
         timebar.style.width=timewidth+"%";
         timewidth--;
         if(timewidth<0)
         {
            clearInterval(timer);
            if(qn<questions.length-1)
            {
               timerChecker = false;
               qn++;
               Showquestions();
            }
            else
            {
                questions_area.className="hide";
                end_screen.className="";  
                lastanswer=true;
                timerChecker=true; 
                endscreenFunction(); 
            }
         }
      },50);
      }
   }

// End Screen Function
var endscreenFunction = ()=>{
   final_score.textContent=score;
   qn=0;
   
};

var username_list=[];
var score_list=[]
submit.addEventListener("click",(()=>{
   var username= initials.value.trim();

   if(username==""){
      alert("Please Add Your Name!");
   }
   else{
      userName_list.push(username);
      score_list.push(score);
      initials.value="";
      setData();
      end_screen.className="hide";
      Highscores.className="";
      Highscoresfunction();
   }
}));

// Function to Store Data In Local Storage
var setData = ()=>{  
   localStorage.setItem("UserName",JSON.stringify(userName_list));
   localStorage.setItem("UserScore",JSON.stringify(score_list));
}

// Function to Get Data From Local Storage
var getData = ()=>{
   var retrive_username = JSON.parse(localStorage.getItem("UserName"));
   var retive_scores = JSON.parse(localStorage.getItem("UserScore"));
   if(retrive_username !== null)
   {
      userName_list=retrive_username;
   }
   else{
      userName_list=[];
  }
   if(retive_scores !== null)
   {
      score_list=retive_scores;
   }
   else{
      score_list=[];
  }
}

var Highscoresfunction = ()=>{
   getData();
   while(highscores_list.hasChildNodes()){
      highscores_list.removeChild(highscores_list.firstChild)
   }
   for(var i=0; i < userName_list.length; i++)
   {
      var highscorelist = document.createElement("li");
      highscorelist.className = "scorelist";
      highscorelist.textContent = userName_list[i] + " " + score_list[i];
      highscores_list.appendChild(highscorelist);
   }
}

getData();

// Function to go to HighScore Screen
view_highscore.addEventListener("click",()=>{
   quiz_Intro.className="hide";
   Highscores.className="";
}) 

// Function to Go Back to Home Screen
function goback(){
   quiz_Intro.className="";
   Highscores.className="hide";
}

// Function To Clear Storage
function clearstorage(){
       // remove data from local storage by keys
       localStorage.removeItem("UserName");
       localStorage.removeItem("UserScore");
       getData();
       setData();
       Highscoresfunction();
}


function back(){
   quiz_Intro.className="";
   questions_area.className="hide";
   end_screen.className="hide";
   Highscores.className="hide";

}
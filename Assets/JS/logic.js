// Delcare a variable to get id of button to start quiz
var start_quiz = document.querySelector("#start");
// Delcare a variable to get the div of start screen
var start_screen = document.querySelector("#start-screen");
// Delcare a variable to get the div of Question screen
var question_screen = document.querySelector("#questions");
// Delcare a variable to get the h2 from question section
var question_title = document.querySelector("#question-title");
// Delcare a variable to show option of answers
var choices = document.querySelector("#choices");
// Delcare a variable to show time countdown
var time = document.querySelector("#time");
// Delcare a variable to access the input from End screen
var initials = document.querySelector("#initials");
// Declare a vaiable to get access of the button of submit
var scoresubmit = document.querySelector("#submit");


// Variable for correct answer Sound
var correct_sound = document.createElement("audio");
correct_sound.setAttribute("src","assets/sfx/correct.wav")

// Variable for In Correct answer Sound
var In_correct_sound = document.createElement("audio");
In_correct_sound.setAttribute("src","assets/sfx/incorrect.wav")

// Array to store local storage user name
var user_name_list=[];
// Array to store local storage score
var score_list=[];


// Delcare a variable to get the div of Question screen
var end_screen = document.querySelector("#end-screen");
// Declare a Vaiable to show the final score on the screen
var finalscore = document.querySelector("#final-score");


var count=75;    //To show Count down timer
var qn=0;       //Number of questions
var score=0;   //Save score on the base of right answer


// Function to Start quiz on the click of button
start_quiz.addEventListener("click",function(event)
{
    // To show timer on the screen immediatley after the code run
    time.textContent=count; //time:75
    // Hide the start Screen
    document.getElementById("start-screen").className = "hide";
    // Show the question Screen
    document.getElementById('questions').className = "";

    // Start the timer
    var timer = setInterval(function(){
    time.textContent=count; //Display the timeleft on the screen
    count--; //Decrement from the timer
    // When countdown goes to 0 then terminate the timer
    if(count<0)
    {
       clearInterval(timer);  // To stop the timer
       end_Screen();          // To Show End Screen
    }
    },1000);

    // Start the Question function
    questiondisplay(event);
   
});


// Function to display questions and anwers on the screen
function questiondisplay(){
    
    //To show the question on the screen from the array of question
    question_title.textContent = questions[qn].question;
    // Make a loop to show all answer related to the question
    for(var i=0; i<questions[qn].answers.length; i++)
    {
    
    // Create Button on HTML By Javascript 
    var button = document.createElement("button");
    // Add Newly Created button to the choice name id div
    choices.appendChild(button);
    // Show the answers in the button
    button.textContent= i+"."+ questions[qn].answers[i]; 
    button.setAttribute("data-index", i);  
    
    
        //Make the function to get the target of button on which we click
        button.addEventListener("click",function getanswer(event){
            answer_select=true;
            // Checking if answer is correct or not
            if(event.target.dataset.index == questions[qn].correct)
            {
                correct_sound.play();
    
                // Create Hr tag in html
                var hr = document.createElement("hr");
                // Create h5 tag in html
                var h5 = document.createElement("h5");
                choices.appendChild(hr);
                choices.appendChild(h5);
                // Add some styling to these newly created tags
                hr.setAttribute("style","opacity:0.5");
                h5.setAttribute("style","opacity:0.5");
                // if answer is correct
                h5.textContent="CORRECT!";
    
                // Declare a variable to show answer for that time
                var answer_result_timer=0;
    
                // Make a function to let user know if its answer is correct or wrong
                // by display in html tag for specific period of time
                var answer_result = setInterval(function(){
    
                answer_result_timer++;  
            if(answer_result_timer>5)
            {
    
                score+=10; //Add 10 score
                
                // To remove the buttons which we created early if they are already existed remove them
                while(choices.hasChildNodes())
                {
                    choices.removeChild(choices.firstChild);
                }
                // Checking to not exceed from the length of questions
                if(qn < questions.length-1)
                {
                    qn++;
                    questiondisplay(); //Calling the question function
                }
                else //When questons are completed
                {
                    
                    end_Screen();   // To Show End Screen
                }
                //   End the timer
                clearInterval(answer_result);
            }
    
    
    
            },70)
    
            }
            // If user answer is wrong
            else{
                In_correct_sound.play();
                // Create Hr tag in html
                var hr = document.createElement("hr");
                // Create h5 tag in html
                var h5 = document.createElement("h5");
                choices.appendChild(hr);
                choices.appendChild(h5);
                // Add some styling to these newly created tags
                hr.setAttribute("style","opacity:0.5");
                h5.setAttribute("style","opacity:0.5");
                // if answer is correct
                h5.textContent="WRONG!";
    
                // Declare a variable to show answer for that time
                var answer_result_timer=0;
    
                // Make a function to let user know if its answer is correct or wrong
                // by display in html tag for specific period of time
                var answer_result = setInterval(function(){
    
                    answer_result_timer++;
                if(answer_result_timer>5)
                {
                
                    count-=10; //Decrement in Timer if answer is wrong
    
                    // To remove the buttons which we created early if they are already existed remove them
                while(choices.hasChildNodes())
                {
                    choices.removeChild(choices.firstChild);
                }
                    // Checking to not exceed from the length of questions
                if(qn < questions.length-1)
                {
                    qn++;
                    questiondisplay();  //Calling the question function
                }
                else
                {
                    end_Screen();       // To Show End Screen
                }
                    //   End the timer
                    clearInterval(answer_result);
                }
    
            },70)
    
                
                
            }
            });
           
    }

};


// Function to select answer


// Function to display End screen and hide Question Screen
function end_Screen(){
    end_screen.setAttribute("class","");             //Show end Screen
    question_screen.setAttribute("class","hide");   //Hide Question screen
    finalscore.textContent= score;                 //Display the score of the questions
    count=0;                                      //To stop the timer
};

// Run when user click on submit button of end screen
scoresubmit.addEventListener("click", function(){

    //Putting input value in a variabel before removeing all extra spaces
    var user_name = initials.value.trim(); 
    
    // If User Input field is empty
    if(user_name === "")
    {
        alert("Please Enter Your Name");
    }
    else{

        // Getting user input value and store it in the array
        user_name_list.push(user_name);
        // Getting score input value and store it in the array
        score_list.push(score);
        // Clearing the input field
        initials.value="";
        storeinLocal_storage();
       
        // Going to the new Html Page
       window.location.href="highscores.html";
    }
  
});


// Function to store data in local storage
function storeinLocal_storage(){
   // Storing user name in local Storage
   localStorage.setItem("user_name",JSON.stringify(user_name_list));
   // Storing Score in local Storage
   localStorage.setItem("score",JSON.stringify(score_list));
}

// Function to retrive data from local storage
function retrivefromLocal_storage(){

    // Getting user name data from local Storage and covert it through jASON.parse()
    var rt_user_name = JSON.parse(localStorage.getItem("user_name"));
    // Getting Score data from local Storage and covert it through jASON.parse()
    var rt_score = JSON.parse(localStorage.getItem("score"));

    // If array are not empty then store local storage data in it
    if (rt_user_name !== null) {
    user_name_list = rt_user_name;
    }
    if (rt_score !== null) {
    score_list = rt_score;
    }
  }
  
 
  retrivefromLocal_storage();
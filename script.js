var usPresidents =["ROOSEVELT", 'KENNEDY', 'OBAMA', 'JOHNSON', 'CARTER', 'REAGAN', 'TAFT', 'LINCOLN',
    'COOLIDGE', 'ADAMS', 'MADISON', 'POLK','TRUMP'];
var famous80sSongs =['COME ON EILEEN','TAKE ON ME', 'ANOTHER ONE BITES THE DUST', "DON'T YOU WANT ME",
    "BILLIE JEAN", "EYE OF THE TIGER", 'AFRICA', "DANGER ZONE", 'UPTOWN GIRL', "WE DIDN'T START THE FIRE",
    "I RAN", "FOOTLOOSE"];
var americanHolidays = ['THANKSGIVING','LABOR DAY','CHRISTMAS','EASTER',"LINCOLN'S BIRTHDAY","GROUNDHOG DAY",
    'KWANZA',"PRESIDENT'S DAY","FOURTH OF JULY","VETERAN'S DAY",'HALLOWEEN'];
var europeanSoccerTeams = ['ARSENAL','CHELSEA','SPURS','SEVILLA','FC BARCELONA','BORUSSIA DORTMUND',
    'TSG 1899 HOFFENHEIM','JUVENTUS FC','INTER MILAN', 'CELTIC'];
var oscarWinningMovies = ['BIRDMAN','A BEAUTIFUL MIND','THE GODFATHER','THE STING',
    "ONE FLEW OVER THE CUCKOO'S NEST", 'ROCKY','GANDHI','RAIN MAN',"SCHINDLER'S LIST",'FOREST GUMP',
    'THE DEPARTED',"TWELVE YEARS A SLAVE", 'NO COUNTRY FOR OLD MEN'];

var categories = [["U.S. Presidents",usPresidents], ["Famous 80's Songs",famous80sSongs],
    ['Americans Holidays', americanHolidays], ['European Soccer Teams',europeanSoccerTeams],
    ['Oscar-Winning Movies',oscarWinningMovies]];
var images = ["head.png", "download.png", "images.png", "download-1.png", "download-2.png", "download-3.png"];
var wins = 0;
var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
function setUp(){
    for(var i=0; i<alphabet.length; i++){
        var div = document.getElementById('buttons');
        var button = document.createElement('button');
        button.innerHTML = alphabet[i];
        button.setAttribute('id', alphabet[i]);
        button.setAttribute('class', "btn btn-primary");
        button.setAttribute('type', 'button');
        div.appendChild(button);
        button.setAttribute('onclick', 'guessLetter(this.id)');
    }
    div.style.display= 'none';
}

function onChange() {
    var category = document.getElementById("category").value;
    var thisCategory = categories[0][category];
    var answerArray = categories[category][1];
    correctWord = answerArray[Math.floor(Math.random() * answerArray.length)];
    var lengthOfWord = correctWord.length;
    document.getElementById('hidden').style.display='block';
    var div = document.getElementById('correctLetters');
    div.innerHTML = '';
    printWord();
    document.getElementById('buttons').innerHTML='';
    setUp();
    var buttons = document.getElementById('buttons');
    buttons.style.display='block';
    document.getElementById('wins').innerHTML = wins;
    document.getElementById('winOrLose').innerHTML='';
}

function printWord() {
    var div = document.getElementById('correctLetters');
    for (var i = 0; i < correctWord.length; i++) {
        var span = document.createElement('span');
        span.setAttribute('id', 'span' + i);
        div.appendChild(span);
        span.innerHTML = " __";
        span.setAttribute('class', 'incorrect');
        if (correctWord[i] == " ") {
            span.innerHTML = "&nbsp;&nbsp;&nbsp;";
        }
        if (correctWord[i] == "'"){
            span.innerHTML = " '";
        }
    }
    livesLeft =  6;
    incorrectGuesses = 0;
    document.getElementById('guesses').innerHTML = livesLeft;
    document.getElementById('image').innerHTML = "<img src='images/empty.png'>";
}

function guessLetter(letter){
    var isIt = 0;
    var result = true;
    for(var i=0; i<correctWord.length; i++){
        var space = document.getElementById('span'+ i);
        if(correctWord[i]== letter){
            space.innerHTML = letter;
            result = false;
        }
        if(space.innerHTML == " __" || space.innerHTML == "'" || space.innerHTML == " "){
            isIt++;
        }
    }
    if(isIt == 0){
        wins++;
        winOrLose(true);
    }else if(result == true && isIt > 0){
        incorrectGuesses++;
        livesLeft--;
        document.getElementById('guesses').innerHTML = livesLeft;
        putCorrectImage(incorrectGuesses);
    }
    if(livesLeft == 0){
        winOrLose(false);
    }
    var button = document.getElementById(letter).disabled=true;
    document.getElementById('wins').innerHTML = wins;
}

function putCorrectImage(guesses) {
    var correctImage = images[guesses -1];
    var div = document.getElementById('image');
    div.innerHTML = '';
    div.innerHTML= "<img src='images/" + correctImage + "'>";
}

function winOrLose(result) {
    document.getElementById('buttons').innerHTML = '';
    document.getElementById('image').innerHTML = '';
    var div = document.getElementById('winOrLose');
    document.getElementById('hidden').style.display='none';
    if(result == true){
        div.innerHTML = "Congrats, you won! Select a category to play again";
    }else{
        div.innerHTML = "Better luck next time LOOOOOser. The correct word was " + correctWord +
            ". Select a category to play again"
    }
}
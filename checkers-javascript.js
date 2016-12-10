/////////////////////////////////////////////////////////
//creates string variables
//////////////////////////////

//used to write white and black stones to the board
var piece = "O";
var piece_two = "D";
var black = "<center>"+piece.fontcolor("black")+"</center>";
var blackdam = "<center>"+piece_two.fontcolor("black")+"</center>";
var white = "<center>"+piece.fontcolor("white")+"</center>";
var whitedam = "<center>"+piece_two.fontcolor("white")+"</center>";
var clor = ""; //needed to switch between black and white

//etc.
var temp_one = "";
var testdata = "";
var printdisplay = ""; //used for writing to UI.

/////////////////////////////////////////////////////////
//creates number variables
///////////////////////////////

//used to reach proper location inside the positionarray.
var y_pos = 0; //translates height to proper subarray.
var x_pos = 0; //translates width to proper article in the array.

//temp_x and temp_y are needed for the movement of stones
var temp_y_pos = 0; 
var temp_x_pos = 0;

//stores what stone is selected   also used in the reset
//0=empty  1=whitestone  2=whitedam  3=blackstone  //4=blackdam
var stoneid = 0;
var ablemove = 0; //0= no ablemove 1= ablemove
var same_t = 0; // 0= not ownteam 1= ownteam

//etc.
var temp_two = 2;

////////////////////////////////////////////////
//creates arrays
////////////////////

//used to create the names for the arrays.
var numb_array =["zero","one","two","three","four","five","six","seven","eight","nine", "ten"];

//used for creating the proper id names.
var square_array = [];
var row_array = [];

//becomes 2dimensional and is used to store the values of every brown square on the board
var positionarray = [];

//creates article's inside the arrays.
for(temp_one = 0; temp_one <= 10; temp_one++){
	
	square_array[temp_one] = "_square_"+numb_array[temp_one];
	row_array[temp_one] = "row_"+numb_array[temp_one];
	positionarray[temp_one] = row_array[temp_one];
	
	//changes articles into arrays
	positionarray[temp_one] = [];
}
//resets temp_one variable
temp_one = "";

///////////////////////////////////////////////////////
//reset functions;
////////////////////
function singleplayer(){
	reset();
}

function multiplayer(){
	reset();
}

//creates the functional data and writes visual stones to UI
function reset(){
	printdisplay = "";
	returntodisplay();
	stoneid = 0;
	temp_two = 2;
	clearmove()
	
	
	for(y_pos = 1; y_pos < 11; y_pos ++){
		
		reset_switch();
		
		for(x_pos = temp_two; x_pos < 11; x_pos++){
			temp_one = row_array[y_pos]+square_array[x_pos];
			positionarray[ y_pos ][ x_pos ] = stoneid;
			
			document.getElementById(temp_one).innerHTML = clor;
			//document.getElementById(temp_one).innerHTML = stoneid;
			
			x_pos ++;
		}
		//switches temp_two between 1 and 2
		switch(temp_two){
			case 1:
				temp_two = 2
				break;
			case 2:
				temp_two = 1
				break;
		}	
	}
	stoneid = 0;
	clor = "";
}
//supports the resets
function reset_switch(){
	switch(y_pos){			
			case 1:
				clor = white;
				stoneid = 1;
				break;
			case 5:
				clor = "";
				stoneid = 0;
				break;
			case 7:	
				clor = black;
				stoneid = 3;
				break;
	}
	//gathers testdata
	//testdata_reset_switch()
}

//////////////////////////////
//execute core of the program
//////////////////////////////
function execute(){
	
	//gathers start testdata
	testdata_execute();
	testdata_execute_start();
	
	//tests if the same button is clicked twice
	if(temp_y_pos == y_pos && temp_x_pos == x_pos){
		
		//removes visuals to selected square
		unselect_square()
		
		//removes data used for selection
		clearmove();
	}
	
	else{
		
		//tests if a stone was selected.
		if(stoneid > 0){
			
			//test if you want to place a stone on your own team's square
			allowedmove()
			
			if(ablemove == 1){
				//move stone in selected square
				write_piece();

				//removes visuals to selected square
				unselect_square()
			}
			else{
				printdisplay = "You cannot do that move"
				returntodisplay()
			}
			
		}
		
		//if no stone is selected
		else{
			
			//makes sure you can't select an empty square to move
			if(positionarray[y_pos][x_pos] == 0){
				
				//do nothing functional
				
				//gather testdata
				testdata_save_movefalse()
			}
			
			//save stoneid and position
			else{
				//saves data and add's visual
				save_moveinfo()
				
				//adds visuals to selected square
				select_square()
				
			}
		}
		printdisplay = positionarray[ y_pos ][ x_pos ];
		returntodisplay();
	}
	//gathers end testdata
	testdata_execute_end();
}
//////////////////////////////////
//Supporting functions for execute
//////////////////////////////////

//unselect stone when clicking on it for the second time
function clearmove(){
	
	//resets all data
	temp_y_pos = 0;
	temp_x_pos = 0;
	y_pos = 0;
	x_pos = 0;
	stoneid = 0;
	
	//testdata gathering
	testdata_clearmove();
}

//prints data to display in the UI 
function returntodisplay(){
	
	//testdata gathering
	testdata_returntodisplay();
	
	document.getElementById("display").innerHTML = printdisplay;	
}

//prints data to board in the UI
function write_piece(){
	
	//removes old stone and prints new stone to positionarray
	positionarray[temp_y_pos][temp_x_pos] = 0;
	positionarray[y_pos][x_pos] = stoneid;
	
	//testdata gathering
	testdata_write_piece();
	
	//translates stoneid to clor
	translate_stoneid();
	
	//removes stone from the UI
	document.getElementById(row_array [ temp_y_pos ] +square_array [ temp_x_pos ] ).innerHTML = "";
	
	//prints moved stone to the UI
	document.getElementById(row_array [ y_pos ] +square_array [ x_pos ] ).innerHTML = clor;
	stoneid = 0;
	
}	

//save stoneid and position to prepare for movement
function save_moveinfo(){
	stoneid = positionarray [ y_pos ] [ x_pos ] ;
	temp_y_pos = y_pos;
	temp_x_pos = x_pos;

	//testdata gathering
	testdata_save_moveinfo();
}

//translates stoneid to a visualstyle
function translate_stoneid(){
	switch(stoneid){
		case 0 :
			clor = "";
			break;
		case 1 :
			clor = white;
			break;
		case 2 :
			clor = whitedam;
			break;
		case 3 :
			clor = black;
			break;
		case 4 :
			clor = blackdam;
			break;
	}
	//gathers testdata
	testdata_translate_stoneid()
}
function unselect_square(){
	//unselects square
	document.getElementById(row_array [ temp_y_pos ] +square_array [ temp_x_pos ] ).style.backgroundColor = "saddlebrown";
}
function select_square(){
	//selects square
	document.getElementById(row_array [ temp_y_pos ] +square_array [ temp_x_pos ] ).style.backgroundColor = "brown";
}

/////////////////////////////////////////////////
//series of tests to see if a certaint move can be made
/////////////////////////////////////////////////
	
function allowedmove(){
	sameteam()
	if (same_t == 0){
		ablemove = 1
	}
	else{
		ablemove = 0
	}
}
function sameteam(){
	if (stoneid > 0	&& positionarray[ y_pos ][ x_pos ] > 0){
		same_t = 1
	}
	else if (stoneid > 2 && positionarray[ y_pos ][ x_pos ] > 2){
		same_t = 1
	}
	else{
		same_t = 0
	}
}
	
///////////////////////////////////////////////////////////
//translates onclick created events to height and width positions before //sending them to the core of the program.
///////////////////////////////////////

function row_ten___square_one(){
	y_pos = 10;
	x_pos = 1;
	execute();
}
function row_ten___square_three(){
	y_pos = 10;
	x_pos = 3;
	execute();
}
function row_ten___square_five(){
	y_pos = 10;
	x_pos = 5;
	execute();
}
function row_ten___square_seven(){
	y_pos = 10;
	x_pos = 7;
	execute();
}
function row_ten___square_nine(){
	y_pos = 10;
	x_pos = 9;
	execute();
}
function row_nine___square_two(){
	y_pos = 9;
	x_pos = 2;
	execute();
}
function row_nine___square_four(){
	y_pos = 9;
	x_pos = 4;
	execute();
}
function row_nine___square_six(){
	y_pos = 9;
	x_pos = 6;
	execute();
}
function row_nine___square_eight(){
	y_pos = 9;
	x_pos = 8;
	execute();
}
function row_nine___square_ten(){
	y_pos = 9;
	x_pos = 10;
	execute();
}
function row_eight___square_one(){
	y_pos = 8;
	x_pos = 1;
	execute();
}
function row_eight___square_three(){
	y_pos = 8;
	x_pos = 3;
	execute();
}
function row_eight___square_five(){
	y_pos = 8;
	x_pos = 5;
	execute();
}
function row_eight___square_seven(){
	y_pos = 8;
	x_pos = 7;
	execute();
}
function row_eight___square_nine(){
	y_pos = 8;
	x_pos = 9;
	execute();
}
//row 7
function row_seven___square_two(){
	y_pos = 7;
	x_pos = 2;
	execute();
}
function row_seven___square_four(){
	y_pos = 7;
	x_pos = 4;
	execute();
}
function row_seven___square_six(){
	y_pos = 7;
	x_pos = 6;
	execute();
}
function row_seven___square_eight(){
	y_pos = 7;
	x_pos = 8;
	execute();
}
function row_seven___square_ten(){
	y_pos = 7;
	x_pos = 10;
	execute();
}
//row 6
function row_six___square_one(){
	y_pos = 6;
	x_pos = 1;
	execute();
}
function row_six___square_three(){
	y_pos = 6;
	x_pos = 3;
	execute();
}
function row_six___square_five(){
	y_pos = 6;
	x_pos = 5;
	execute();
}
function row_six___square_seven(){
	y_pos = 6;
	x_pos = 7;
	execute();
}
function row_six___square_nine(){
	y_pos = 6;
	x_pos = 9;
	execute();
}
//row 5
function row_five___square_two(){
	y_pos = 5;
	x_pos = 2;
	execute();
}
function row_five___square_four(){
	y_pos = 5;
	x_pos = 4;
	execute();
}
function row_five___square_six(){
	y_pos = 5;
	x_pos = 6;
	execute();
}
function row_five___square_eight(){
	y_pos = 5;
	x_pos = 8;
	execute();
}
function row_five___square_ten(){
	y_pos = 5;
	x_pos = 10;
	execute();
}
//row 4
function row_four___square_one(){
	y_pos = 4;
	x_pos = 1;
	execute();
}
function row_four___square_three(){
	y_pos = 4;
	x_pos = 3;
	execute();
}
function row_four___square_five(){
	y_pos = 4;
	x_pos = 5;
	execute();
}
function row_four___square_seven(){
	y_pos = 4;
	x_pos = 7;
	execute();
}
function row_four___square_nine(){
	y_pos = 4;
	x_pos = 9;
	execute();
}
//row 3
function row_three___square_two(){
	y_pos = 3;
	x_pos = 2;
	execute();
}
function row_three___square_four(){
	y_pos = 3;
	x_pos = 4;
	execute();
}
function row_three___square_six(){
	y_pos = 3;
	x_pos = 6;
	execute();
}
function row_three___square_eight(){
	y_pos = 3;
	x_pos = 8;
	execute();
}
function row_three___square_ten(){
	y_pos = 3;
	x_pos = 10;
	execute();
}
//row 2
function row_two___square_one(){
	y_pos = 2;
	x_pos = 1;
	execute();
}
function row_two___square_three(){
	y_pos = 2;
	x_pos = 3;
	execute();
}
function row_two___square_five(){
	y_pos = 2;
	x_pos = 5;
	execute();
}
function row_two___square_seven(){
	y_pos = 2;
	x_pos = 7;
	execute();
}
function row_two___square_nine(){
	y_pos = 2;
	x_pos = 9;
	execute();
}
function row_one___square_two(){
	y_pos = 1;
	x_pos = 2;
	execute();
}
//row 1
function row_one___square_four(){
	y_pos = 1;
	x_pos = 4;
	execute();
}
function row_one___square_six(){
	y_pos = 1;
	x_pos = 6;
	execute();
}
function row_one___square_eight(){
	y_pos = 1;
	x_pos = 8;
	execute();
}
function row_one___square_ten(){
	y_pos = 1;
	x_pos = 10;
	execute();
}

///////////////////////////////
//testdata gathering functions
///////////////////////////////

//1 and 0 are functional storage
//testdata arrays
var testdata_array = []
var testdata_temp_array = []

//testdata temp x and y
var testdata_temp_y_pos = []
var testdata_temp_x_pos = []

//testdata x and y
var testdata_y_pos = []
var testdata_x_pos = []

//etc
var testdata_stoneid = []
var testdata_clor = []
var testdata_printdisplay = []
var testdata_activefunc = []

//counters 4 testdata
var testcount = 2 //start runs on 2 4 and 6 //end runs on 3 5 and 7
var s_or_e = 0 // 0 is start 1 is end
var id_sore = "" //defines where to write to

function printer_of_testdata(){
	
	if(s_or_e == 0){
		id_sore = "start_"
	}
	else{
		id_sore = "end_"
	}
	if(testcount == 11){
		testcount = 9
		
		//removes first 2 articles in the array to make room for a 2 new articles at the end
		testdata_array.splice(2,2)
		testdata_temp_array.splice(2,2)
		
		//x or y position
		testdata_temp_y_pos.splice(2,2)
		testdata_temp_x_pos.splice(2,2)
		testdata_y_pos.splice(2,2)
		testdata_x_pos.splice(2,2)
		
		//etc
		testdata_stoneid.splice(2,2)
		testdata_clor.splice(2,2)
		testdata_printdisplay.splice(2,2)
		testdata_activefunc.splice(2,2)
	}
	//writes to article 10 of each array
	for(temp_two = s_or_e+2; temp_two <= s_or_e+9; temp_two++){
		
		testdata_array[s_or_e] += temp_two-1+" "+testdata_array[temp_two]+"<br />"//1
		testdata_temp_array[s_or_e] += temp_two-1+" "+testdata_temp_array[temp_two]+"<br />"//2
		
		testdata_temp_y_pos[s_or_e] += temp_two-1+" "+testdata_temp_y_pos[temp_two]+"<br />"//3
		testdata_temp_x_pos[s_or_e] += temp_two-1+" "+testdata_temp_x_pos[temp_two]+"<br />"//4
		
		testdata_y_pos[s_or_e] += temp_two-1+" "+testdata_y_pos[temp_two]+"<br />"
		testdata_x_pos[s_or_e] += temp_two-1+" "+testdata_x_pos[temp_two]+"<br />"
		
		testdata_stoneid[s_or_e] += temp_two-1+" "+testdata_stoneid[temp_two]+"<br />"
		testdata_clor[s_or_e] += temp_two-1+" "+testdata_clor[temp_two]+"<br />"
		testdata_printdisplay[s_or_e] += temp_two-1+" "+testdata_printdisplay[temp_two]+"<br />"
		testdata_activefunc[s_or_e] += temp_two-1+" "+testdata_activefunc[temp_two]+"<br />"
		temp_two++
	}
	
	//print's to test display's
	document.getElementById(id_sore+"array").innerHTML = testdata_array[s_or_e]
	document.getElementById(id_sore+"temp_array").innerHTML = testdata_temp_array[s_or_e]
	
	document.getElementById(id_sore+"temp_y_pos").innerHTML =  testdata_temp_y_pos[s_or_e]
	document.getElementById(id_sore+"temp_x_pos").innerHTML = testdata_temp_x_pos[s_or_e]
	
	document.getElementById(id_sore+"y_pos").innerHTML = testdata_y_pos[s_or_e]
	document.getElementById(id_sore+"x_pos").innerHTML = testdata_x_pos[s_or_e]
	
	document.getElementById(id_sore+"stoneid").innerHTML = testdata_stoneid[s_or_e]
	document.getElementById(id_sore+"clor").innerHTML = testdata_clor[s_or_e]
	document.getElementById(id_sore+"printdisplay").innerHTML = testdata_printdisplay[s_or_e]
	document.getElementById(id_sore+"functionreach").innerHTML = testdata_activefunc[s_or_e]
	
	//removes 10th array article again to prevent adding endless articles
	testdata_array[s_or_e] = ""
	testdata_temp_array[s_or_e] = ""
		
	//x or y position
	testdata_temp_y_pos[s_or_e] = ""
	testdata_temp_x_pos[s_or_e] = ""
	testdata_y_pos[s_or_e] = ""
	testdata_x_pos[s_or_e] = ""
	
	//etc
	testdata_stoneid[s_or_e] = ""
	testdata_clor[s_or_e] = ""
	testdata_printdisplay[s_or_e] = ""
	testdata_activefunc[s_or_e] = " "
	
	//count 1 up
	testcount ++
}
//reset stuff
//function testdata_reset_switch(){
//	testdata_activefunc[testcount] += "reset_switch = true <br />";
//}

//main functions
function testdata_execute(){
	testdata_activefunc[testcount] += "execute = true"+"<br />";
}

function testdata_clearmove(){
	testdata_activefunc[testcount] += "clearmove = true"+"<br />";
}

function testdata_returntodisplay(){
	testdata_activefunc[testcount] += "return to display = true"+"<br />";
}

function testdata_write_piece(){
	testdata_activefunc[testcount] += "write_piece = true"+"<br />";
}

function testdata_save_moveinfo(){
	testdata_activefunc[testcount] += "save_moveinfo= true"+"<br />";
}
function testdata_save_movefalse(){
	testdata_activefunc[testcount] += "save_moveinfo= false"+"<br />";
}
function testdata_translate_stoneid(){
	testdata_activefunc[testcount] += "translate_stoneid = true"+"<br />";
}

function testdata_execute_start(){
	s_or_e = 0
	testdata_execute_gathering()
	printer_of_testdata()
}

function testdata_execute_end(){
	s_or_e = 1
	testdata_execute_gathering()
	printer_of_testdata()
}

function testdata_execute_gathering(){
	
	//reached arrays with x and y values
	testdata_array[testcount] = "positionarray[y_pos][x_pos]"+positionarray[y_pos][x_pos];
	
	testdata_temp_array[testcount] = "positionarray[temp_y_pos][temp_x_pos]="+positionarray[temp_y_pos][temp_x_pos];
	
	//temp x and y
	testdata_temp_y_pos[testcount] ="temp_y_pos = "+temp_x_pos;
	testdata_temp_x_pos[testcount] ="temp_x_pos = "+temp_y_pos;
	
	//x and y
	testdata_y_pos[testcount] ="y_pos = "+y_pos;
	testdata_x_pos[testcount] ="x_pos = "+x_pos;
	
	//test stoneid
	testdata_stoneid[testcount] ="stoneid = "+stoneid;
	
	//clor
	testdata_clor[testcount] ="clor= "+clor;
	
	//prints temp printdata
	testdata_printdisplay[testcount] ="printdisplay="+printdisplay;
}
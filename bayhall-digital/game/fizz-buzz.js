/* http://closure-compiler.appspot.com/home */	
/* http://javascriptobfuscator.com/	*/
	
var fizzBuzz =
{
	

	//Canvas stuff
	canvas: null,
	ctx: null, /* save the canvas screen to a variable */
	w: 0,
	h: 0,
	
	intSpeed: 10,
	
	intFizz: 3, /* divisable value for fizz */
	intBuzz: 5, /* divisable value for buzz */
	intTotal: 0, /* total blocks in building to fizz or buzz */
	intLevel: 0, /* current level */
	intBlock: 10, /* size of a building block */
	intIn: 0, /* number of blocks moving in */
	intInX: 0, /* number of blocks moving in X position */
	intOut: 0, /* number of blocks moving out */
	intOutX: 0, /* number of blocks moving out X position */
	
	intBuildingLiftHeight: 50,
	strBuildingLifting: "down",

	arrBuildingGroundFloor: new Array(),
	arrBuildingSingleFloor: new Array(),
	arrBuildingLength: 0,
	
	intBuildingHeight: 0,
	intBuildingWidth: 0,

	intOriginX: 0,
	intOriginY: 0,
	intStartX: 0,
	intStartY: 0,
	intCursorX: 0,
	intCursorY: 0,

	strTask: "in", /* what are we doing, in, out, guessing */
	
	
	
	initialize: function () {
		
		fizzBuzz.canvas = $("#canvas")[0];
		fizzBuzz.ctx = fizzBuzz.canvas.getContext("2d"); /* save the canvas screen to a variable */
		fizzBuzz.w = $("#canvas").width();
		fizzBuzz.h = $("#canvas").height();	
		
		window.addEventListener('resize', fizzBuzz.resizeCanvas, false);	
		
		fizzBuzz.setCanvas();
		fizzBuzz.setBuilding();
		
				
		$("#btnFizz, #btnBuzz").click(function() {
			if ($(this).attr("data-active") == "false") {
				$(this).attr("data-active", "true");
				$(this).css("background-color", "#97E173");
			} else {
				$(this).attr("data-active", "false");
				$(this).css("background-color", "");
			}
		});			

	},
	
	resizeCanvas: function () {
		
		fizzBuzz.setCanvas();
		fizzBuzz.setBuilding();		
		
	},
		
	playGame: function () {
		
		fizzBuzz.intTotal = 0;
		fizzBuzz.intLevel = 0;
		
		$("#instructions").hide();
		if(typeof game_loop != "undefined") clearInterval(game_loop);
		game_loop = setInterval(fizzBuzz.paint, 30);		
	},
	
	setCanvas: function () {
		
		//set all variables //
		fizzBuzz.w = $(window).width()  -5
		fizzBuzz.h = $(window).height() - 5
		// set canvas size with javascript for responsive canvas
		fizzBuzz.canvas.width  = fizzBuzz.w
        fizzBuzz.canvas.height = fizzBuzz.h		
		fizzBuzz.intBlock = fizzBuzz.w / 50; /* size of a building block */		
		
		fizzBuzz.intSpeed = fizzBuzz.intBlock / 2
		//end: set all variables //				
		
	},
	
	
	setBuilding: function () {
		
		/* building designed from array, 1's are walls and 0's are windows/doors */
		 /* fizzBuzz.arrBuilding = [[1,1,0,1,1],[1,1,0,1,1],[1,1,1,1,1],[1,0,1,0,1],[1,1,1,1,1],[1,0,1,0,1],[1,1,1,1,1],[1,0,1,0,1],[1,1,1,1,1],[1,0,1,0,1],[1,1,1,1,1],[1,0,1,0,1],[1,1,1,1,1]];	*/	
		 fizzBuzz.arrBuildingGroundFloor = [[1,1,0,1,1],[1,1,0,1,1],[1,1,1,1,1]];
		 fizzBuzz.arrBuildingSingleFloor = [[1,0,1,0,1],[1,1,1,1,1]];		 
		 
		 fizzBuzz.getBuilding();
		 
		 fizzBuzz.intStartX = fizzBuzz.intOriginX;
		 fizzBuzz.intStartY = fizzBuzz.intOriginY;			 
		 
		 fizzBuzz.intCursorX = fizzBuzz.intStartX;
		 fizzBuzz.intCursorY = fizzBuzz.intStartY;			
		
	},	

	getBuilding: function () {
		 fizzBuzz.intBuildingHeight = fizzBuzz.arrBuildingGroundFloor.length + (fizzBuzz.arrBuildingSingleFloor.length * fizzBuzz.intLevel)
		 fizzBuzz.intBuildingWidth = fizzBuzz.arrBuildingGroundFloor[0].length

		 /* start the building to be in the middle at the bottom of the canvas */
		 fizzBuzz.intOriginX = (fizzBuzz.w/2) - (fizzBuzz.intBuildingWidth * fizzBuzz.intBlock) / 2;
		 fizzBuzz.intOriginY = fizzBuzz.h - (fizzBuzz.intBuildingHeight * fizzBuzz.intBlock);		
	},
	
	createBuilding: function () {
		
		fizzBuzz.getBuilding();

		//each level
		for(var k = fizzBuzz.intLevel; k>0; k--) /* loop through the single floor */
		{		
			for(var i = fizzBuzz.arrBuildingSingleFloor.length-1; i>=0; i--) /* loop through the single floor */
			{
					
					var arrFloorLength = fizzBuzz.arrBuildingSingleFloor[i].length /* get the length of the floor */
					
					for(var j = arrFloorLength-1; j>=0; j--) /* loop through each floor */
					{
	
						if (fizzBuzz.arrBuildingSingleFloor[i][j] == 1) {
							fizzBuzz.paintCell(fizzBuzz.intCursorX,fizzBuzz.intCursorY, "grey", "grey") /* add a wall */
						} else {
							fizzBuzz.paintCell(fizzBuzz.intCursorX,fizzBuzz.intCursorY, "white", "white") /* add a door/window */
						}
						
						fizzBuzz.intCursorX += fizzBuzz.intBlock; /* move right one block */
					}
				
					fizzBuzz.intCursorX = fizzBuzz.intStartX;  /* move back to start one block */
					fizzBuzz.intCursorY += fizzBuzz.intBlock;  /* move up one block */
				
			}
		}					
		
		
		//ground floor
		for(var i = fizzBuzz.arrBuildingGroundFloor.length-1; i>=0; i--) /* loop through the ground floor */
		{
				
				var arrFloorLength = fizzBuzz.arrBuildingGroundFloor[i].length /* get the length of the floor */
				
				for(var j = arrFloorLength-1; j>=0; j--) /* loop through each floor */
				{

					if (fizzBuzz.arrBuildingGroundFloor[i][j] == 1) {
						fizzBuzz.paintCell(fizzBuzz.intCursorX,fizzBuzz.intCursorY, "grey", "grey") /* add a wall */
					} else {
						fizzBuzz.paintCell(fizzBuzz.intCursorX,fizzBuzz.intCursorY, "white", "white") /* add a door/window */
					}
					
					fizzBuzz.intCursorX += fizzBuzz.intBlock; /* move right one block */
				}
			
				fizzBuzz.intCursorX = fizzBuzz.intStartX;  /* move back to start one block */
				fizzBuzz.intCursorY += fizzBuzz.intBlock;  /* move up one block */
			
		}
		
		
		
		
		
		
		
		/* moving the building up and down to reveal the people inside */
		if (fizzBuzz.strBuildingLifting == "up") {
			if (fizzBuzz.intOriginY - fizzBuzz.intBuildingLiftHeight < fizzBuzz.intStartY) {
				fizzBuzz.intStartY -= fizzBuzz.intSpeed;
			}
			fizzBuzz.intCursorY = fizzBuzz.intStartY; /* reset the cursor */
		} else if (fizzBuzz.strBuildingLifting == "down") {
			if (fizzBuzz.intOriginY > fizzBuzz.intStartY) {
				fizzBuzz.intStartY += fizzBuzz.intSpeed;
			}
			fizzBuzz.intCursorY = fizzBuzz.intStartY; /* reset the cursor */			
		} else {
			fizzBuzz.intCursorY = fizzBuzz.intOriginY; /* reset to start position */
		}			
		
	},	
		
	paint: function () {
		//To avoid trails we need to paint the BG on every frame
		//Lets paint the canvas now
		fizzBuzz.ctx.fillStyle = "white";
		fizzBuzz.ctx.fillRect(0, 0, fizzBuzz.w, fizzBuzz.h);
/*		ctx.strokeStyle = "black";
		ctx.strokeRect(0, 0, w, h);*/


		if (fizzBuzz.strTask == "in") {
			/* lets move some people in! */
			if (fizzBuzz.intIn == 0){
				fizzBuzz.intIn = fizzBuzz.createRandomNumber(1,5);
				console.log("in " + fizzBuzz.intIn)
				fizzBuzz.intInX = 0;
			} else {
				
				for(var i = fizzBuzz.intIn-1; i>=0; i--) /* loop through each person */
				{
					fizzBuzz.paintCell(fizzBuzz.intInX+((fizzBuzz.intBlock*i)+(fizzBuzz.intBlock/2*i)),fizzBuzz.h-fizzBuzz.intBlock,"pink","white");
				}
				fizzBuzz.intInX += fizzBuzz.intSpeed; /*intBlock;*/
				
				/* check if they're in the building! */
				if (fizzBuzz.intInX > ((fizzBuzz.w/2) - (fizzBuzz.intIn * fizzBuzz.intBlock))) {
					fizzBuzz.intTotal += fizzBuzz.intIn; /* add the guys going in to the total */
					fizzBuzz.intIn = 0; /* reset to zero */
					/* randomise next task */
					fizzBuzz.randomTask();
				}
				
			}
			
		} else if (fizzBuzz.strTask == "out") {
			
			/* lets move some people out! */
			if (fizzBuzz.intOut == 0){
				 /* more people can't exit than are in the building! */
				var intRandomMax = 5;
				if (fizzBuzz.intTotal < 5) {
					intRandomMax = fizzBuzz.intTotal;
				}
				fizzBuzz.intOut = fizzBuzz.createRandomNumber(1,intRandomMax);
				console.log("out " + fizzBuzz.intOut)
				fizzBuzz.intOutX = fizzBuzz.w/2; /* place the people exiting at the building */
				
			} else {
				
				for(var i = fizzBuzz.intOut-1; i>=0; i--) /* loop through each person */
				{
					//paintCell(intOutX+(intBlock*i),h-intBlock,"pink","white");
					fizzBuzz.paintCell(fizzBuzz.intOutX+((fizzBuzz.intBlock*i)+(fizzBuzz.intBlock/2*i)),fizzBuzz.h-fizzBuzz.intBlock,"pink","white");
				}
				fizzBuzz.intOutX += fizzBuzz.intSpeed; /*intBlock;*/
				
				/* check if they're off the stage! */
				if (fizzBuzz.intOutX > fizzBuzz.w) {
					fizzBuzz.intTotal -= fizzBuzz.intOut; /* minus the guys going in from the total */
					fizzBuzz.intOut = 0; /* reset to zero */
					/* randomise next task */
					fizzBuzz.randomTask();
				}
				
			}			
			
		} else if (fizzBuzz.strTask == "guessing") {
			

		} else if (fizzBuzz.strTask == "answer") {			
			

			var intCount = 0;
			var intStack = 1;
			for(var i = fizzBuzz.intTotal; i>0; i--) /* loop through each person */
			{
				
				/* keep changing height of building to reveal people */
				fizzBuzz.intBuildingLiftHeight = fizzBuzz.intBlock*(intStack+1);
				fizzBuzz.strBuildingLifting = "up";
				/* paint people in building */
				fizzBuzz.paintCell(fizzBuzz.intOriginX+(fizzBuzz.intBlock*intCount),fizzBuzz.h-(fizzBuzz.intBlock*intStack),"pink","white");
				
				if (intCount == fizzBuzz.intBuildingWidth-1) {
					intStack += 1;
					intCount = 0;
				} else {
					intCount += 1;
				}
				
			}			

			
		}
		
		
		
		
		//Lets paint the building
		fizzBuzz.createBuilding()		
		
	},	
	
	randomTask: function () {
		var intRandom = fizzBuzz.createRandomNumber(1,20);
		
		console.log("total " + fizzBuzz.intTotal)
		
		switch(intRandom) {
			case 1:
			case 3:
			case 5:
			case 7:
			case 9:
				fizzBuzz.strTask = "in";
				break;
			case 2:
			case 4:
			case 6:
			case 8:
			case 10:
				/* minus people can't exit than are in the building! */
				if (fizzBuzz.intTotal == 0) {
					fizzBuzz.strTask = "in";
				} else {
					fizzBuzz.strTask = "out";
				}				
				break;
			default:
			
				/* check if the building is empty */
				if (fizzBuzz.intTotal == 0) {
					fizzBuzz.strTask = "in";
					break;	
				}				
						
				//check if a fizz-buzz value
				if ( fizzBuzz.intTotal % 3 === 0 && fizzBuzz.intTotal % 5 === 0) {
					//fizzbuzz
				} else if ( fizzBuzz.intTotal % 3 === 0) {
					//fizz
				} else if ( fizzBuzz.intTotal % 5 === 0) {
					//buzz
				} else {	
				
					fizzBuzz.randomTask();	
										
					break;				
				}					
				
			
				fizzBuzz.strTask = "guessing";
				
				//$("#txtGuess").css("border-color", "#ccc");
				//$("#txtGuess").val("");
				$("#guess").show();
				//$("#txtGuess").focus();

//				$(document).keypress(function (event) {
//					
//					if (event.which == 13) {
//						
//						if ($("#txtGuess").val() == fizzBuzz.intTotal) {
//							$("#txtGuess").css("border-color", "green");
//						} else {
//							$("#guess").effect("shake");
//							$("#txtGuess").css("border-color", "red");
//						}
//						
//						fizzBuzz.strTask = "answer";
//						event.preventDefault();
//						$(document).unbind("keypress");
//						setTimeout( function() {
//						fizzBuzz.replay()
//						}, 5000);
//						
//						return false;
//						
//					}
//				});					
				
						

						setTimeout( function() {
							fizzBuzz.strTask = "answer";
							//check if a fizz-buzz value
							if ( fizzBuzz.intTotal % 3 === 0 && fizzBuzz.intTotal % 5 === 0) {
								//fizzbuzz
								if ($("#btnBuzz").attr("data-active") == "true" && $("#btnFizz").attr("data-active") == "true") {
									//correct
									fizzBuzz.correctAnswer();
								} else {
									//wrong
									fizzBuzz.wrongAnswer();
								}								
							} else if ( fizzBuzz.intTotal % 3 === 0) {
								//fizz
								if ($("#btnBuzz").attr("data-active") == "false" && $("#btnFizz").attr("data-active") == "true") {
									//correct
									fizzBuzz.correctAnswer();
								} else {
									//wrong
									fizzBuzz.wrongAnswer();
								}							
							} else if ( fizzBuzz.intTotal % 5 === 0) {
								//buzz
								if ($("#btnBuzz").attr("data-active") == "true" && $("#btnFizz").attr("data-active") == "false") {
									//correct
									fizzBuzz.correctAnswer();
								} else {
									//wrong
									fizzBuzz.wrongAnswer();
								}
							} else {	
								//none
								if ($("#btnBuzz").attr("data-active") == "false" && $("#btnFizz").attr("data-active") == "false") {
									//correct
									fizzBuzz.correctAnswer();
								} else {
									//wrong
									fizzBuzz.wrongAnswer();
								}
							}
						
							setTimeout( function() {
								//reset 
								$("#btnBuzz").attr("data-active", "false");
								$("#btnBuzz").css("background-color", "");
								$("#btnFizz").attr("data-active", "false");
								$("#btnFizz").css("background-color", "");	
								$("#guess").css("background-color", "");							
								fizzBuzz.replay();
							}, 2000);
						
						}, 5000);




				
		} 
	},	
		
	correctAnswer: function() {
		fizzBuzz.intLevel ++
		$("#guess").effect( "pulsate", {times:5}, 2000 ).css("background-color", "#5ABE29");;	
	},
	
	wrongAnswer: function() {
				
		fizzBuzz.intLevel --
		$("#guess").effect( "pulsate", {times:5}, 2000 ).css("background-color", "#C60000");;				
		
		if (fizzBuzz.intLevel < 0) {
			fizzBuzz.intLevel = 0
		}	
	},
	
	replay: function() {
		$("#guess").hide();
		fizzBuzz.strBuildingLifting = "down"
		var intRandom = fizzBuzz.createRandomNumber(1,2);
		switch(intRandom) {
			case 1:
				fizzBuzz.strTask = "in"
			case 2:
				if (fizzBuzz.intTotal == 0) {
					fizzBuzz.strTask = "in";
				} else {
					fizzBuzz.strTask = "out";
				}		
		}
		
	},
	
	
	createRandomNumber: function (p_intMin, p_intMax) {
		return Math.floor(Math.random()*(p_intMax-p_intMin+1))+p_intMin;
	},		
	
	//Lets first create a generic function to paint cells
	paintCell: function (x, y, pBlockColor, pStrokeColor) {
		fizzBuzz.ctx.fillStyle = pBlockColor;
		fizzBuzz.ctx.fillRect(x, y, fizzBuzz.intBlock, fizzBuzz.intBlock);
		fizzBuzz.ctx.strokeStyle = pStrokeColor;
		fizzBuzz.ctx.strokeRect(x, y, fizzBuzz.intBlock, fizzBuzz.intBlock);		
	}
	
}
	
	

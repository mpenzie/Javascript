
    // Create Dino Constructor
	//parse json file contents
		
	const fs = require('fs');
	const fileContents = fs.readFileSync('./dino.json', 'utf8');
	var dinoData = JSON.parse(fileContents);
		
	//use json data in the dino constructor
	//for each dino object, feed in image file name, and the array index
	
	function Dinosaur(index){
		return {
			species : dinoData.Dinos[index].species,
			weight : dinoData.Dinos[index].weight,
			height : dinoData.Dinos[index].height,
			diet : dinoData.Dinos[index].diet,
			where : dinoData.Dinos[index].where,
			when : dinoData.Dinos[index].when,
			fact : dinoData.Dinos[index].fact,
			imageFile : dinoData.Dinos[index].species.toLowerCase() + '.png'
			
		};
	}
	
	
    // Create Dino Objects
	const triceratops = new Dinosaur(0);
	
	const tRex = new Dinosaur(1);
	
	const anklyosaurus = new Dinosaur(2);
	
	const brachiosaurus = new Dinosaur(3);
	
	const stegosaurus = new Dinosaur(4);
	
	const elasmosaurus = new Dinosaur(5);
	
	const pteranodon = new Dinosaur(6);
	
	const pigeon = new Dinosaur(7);
	
    // Create Human Object
	
    // Use IIFE to get human data from form
	let human = (function Human(){
		return{
			species: 'Homo sapien',
			name : document.getElementById("name").value,
			height : document.getElementById("feet").value * 12 + document.getElementById("inches").value,
			weight : document.getElementById("weight").value,
			diet : document.getElementById("diet").value,
			imageFile: 'human.png'
		}
		
	})();
	

    // Create Dino Compare Method 1
    // NOTE: Weight in JSON file is in lbs, height in inches. 
	function compareWeight(dino, human){
		if (dino.weight > human.weight){
			var weightDifference = dino.weight - human.weight;
			fact = 'A ' + dino.name + ' weighs ' + weightDifference + ' lbs more than you.';
		}
		else if (dino.weight < human.weight){
			var weightDifference = human.weight - dino.weight;
			fact = 'You weigh ' + weightDifference + ' lbs more than a ' + dino.name + '.';
		}
		else {
			fact = "You and a " + dino.name + ' weigh the same.';
		}
		return{
			fact
		}
	}
    
    // Create Dino Compare Method 2
    // NOTE: Weight in JSON file is in lbs, height in inches.
	function compareHeight(dino, human){
		if (dino.height > human.height){
			var heightDifference = dino.height - human.height;
			fact = 'A ' + dino.name + ' is ' + heightDifference + ' inches taller than you.';
		}
		else if (dino.height < human.height){
			var heightDifference = human.height - dino.height;
			fact = 'You are ' + heightDifference + ' inches taller than a ' + dino.name + '.';
		}
		else {
			fact = "You and a " + dino.name + ' are the same height.';
		}
		return{
			fact
		}
	}
    
    // Create Dino Compare Method 3
    // NOTE: Weight in JSON file is in lbs, height in inches.
	function compareDiet(dino, human){
		if (dino.diet == human.diet){
			fact = "You and a " + dino.name + ' have the same diet. You are both ' + dino.diet + 's.';
		}
		else {
			fact = "You and a " + dino.name + ' do not have the same diet. This dinosaur has a ' + dino.diet + ' diet and you have a ' + human.diet + ' diet.';
		}
		return {
			fact
		}
	}

    // Generate Tiles for each Dino in Array
  
		
    // Add tiles to DOM
	function addTiles (creature) {
		//tile format:
		//<div class="grid-item">
  		//<h3>name of the creature</h3>
  		//<img src="path to the image" alt="name of the creature" />
  		//<p>fact of the creature</p>
		//</div>
		
		//grab grid from HTML
		var grid = document.getElementById("grid");
		
		//create a new div element for the tile
		var gridItem = document.createElement("div");
		gridItem.className = "grid-item";
		
		//create a header for the tile - header is the dino/human name
		var gridHeader = document.createElement("h3");
		var headerText = document.createTextNode(creature.name);
		gridHeader.appendChild(headerText);
		//add header to tile
		gridItem.appendChild(gridHeader);
		
		//add the image to the tile
		var gridImage = document.createElement("img");
		gridImage.setAttribute("src", "images/" + creature.imageFile);
		gridImage.setAttribute("alt", creature.name)
		//add image to tile
		gridItem.appendChild(gridImage);
		
		//add fact to the tile if the creature is a Pigeon or Dino. 
		//If the creature is a human, do not add a fact.
		if (creature.species == 'Pigeon'){
			//add fact to the tile
			var gridFact = document.createElement("p");
			var factText = document.createTextNode(creature.fact);
			gridFact.appendChild(factText);
			//add fact to the tile
			gridItem.appendChild(gridFact);
		}
		if (creature.species !== 'Homo sapien'){
			//add fact to the tile
			var gridFact = document.createElement("p");
		
			//create an array for the facts for this creature
			var facts = [creature.fact, "This dinosaur lived during the " + creature.when + " period.", "This dinosaur lived in " + creature.where];
			
			let fact2 = compareWeight(creature, human);
			facts.push(fact2);
			
			let fact3 = compareHeight(creature, human);
			facts.push(fact3);
			
			let fact4 = compareDiet(creature, human);
			facts.push(fact4);
			
			//select a random fact and add it to the gridFact Element
			var selectedFact = facts[Math.floor(Math.random() * facts.length)];
			var factText = document.createTextNode(selectedFact);
			gridFact.appendChild(factText);
			
			//add fact to the tile
			gridItem.appendChild(gridFact);
		}
		
		//add grid item to the parent grid in the HTML
		grid.appendChild(gridItem);
	};


    // Remove form from screen
	function removeForm() {
		var humanForm = document.getElementById("dino-compare");
		humanForm.remove();
	};


// On button click, prepare and display infographic
	document.getElementById("btn").addEventListener("click", function() {
		removeForm();
		addTiles(triceratops);
		addTiles(tRex);
		addTiles(brachiosaurus);
		addTiles(anklyosaurus);
		addTiles(human);
		addTiles(stegosaurus);
		addTiles(elasmosaurus);
		addTiles(pteranodon);
		addTiles(pigeon);
	});
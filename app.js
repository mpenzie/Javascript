

	
	document.getElementById("btn").addEventListener("click", async function(event) {
		//get json data from dino.json
		const pullDinoData = async() => {
			const response = await fetch('./dino.json');
			const data = await response.json();
			return data.Dinos;
		};
		const dinoData = await pullDinoData();
		console.log('dinoData:', dinoData);
		
		// Create Dino Constructor
		function DinoClass (species, weight, height, diet, where, when, fact) {
			this.species = species;
			this.weight = weight; 
			this.height = height;
			this.diet = diet;
			this.where = where;
			this.when = when;
			this.fact = fact;
			this.imageFile = species.toLowerCase() + '.png';
			
		}
		
		//instantiate array to store dinos
		let dinos = [];
		
		// Create Dino Objects
		for (let i = 0; i < 8; i++){
			let dino = new DinoClass (
			dinoData[i].species, 
			dinoData[i].weight, 
			dinoData[i].height, 
			dinoData[i].diet,
			dinoData[i].where, 
			dinoData[i].when, 
			dinoData[i].fact);
			
			dinos.push(dino);
			console.log(dino.species + ' data:', dino);
			
		}
		
		// Create Human Object
		
		//Give a warning if none of the data is populated.
		if(document.getElementById('name') == "" || document.getElementById('feet') == "" || document.getElementById('name') == "" || document.getElementById('weight') == ""){
			alert('Please fill out all the form.')
			return false;
		}
		
    	// Use IIFE to get human data from form
		const human = (function Human(){
			return{
			species: 'Homo sapien',
			name : document.getElementById("name").value,
			height : parseFloat(document.getElementById("feet").value) * 12 + parseFloat(document.getElementById("inches").value),
			weight : document.getElementById("weight").value,
			diet : document.getAnimations("diet").value,
			imageFile: 'human.png'
			};
		
		})();
		
		dinos.push(human);
		
		console.log('human data:', human);
		
		// Create Dino Compare Method 1
	    // NOTE: Weight in JSON file is in lbs, height in inches. 
		function compareWeight(dino, human){
			const dinoWeight = parseFloat(dino.weight);
			const humanWeight = parseFloat(human.weight);
			
			if (dinoWeight > humanWeight){
				var weightDifference = dinoWeight - humanWeight;
				fact = 'A ' + dino.name + ' weighs ' + weightDifference + ' lbs more than you.';
			}
			else if (dinoWeight < humanWeight){
				var weightDifference = humanWeight - dinoWeight;
				fact = 'You weigh ' + weightDifference + ' lbs more than a ' + dino.name + '.';
			}
			else {
				fact = "You and a " + dino.name + ' weigh the same.';
			}
			console.log('compareWeight data:', fact);
			return{
				fact
			};
		}
	    
	    // Create Dino Compare Method 2
	    // NOTE: Weight in JSON file is in lbs, height in inches.
		function compareHeight(dino, human){
			const dinoHeight = parseFloat(dino.height);
			const humanHeight = parseFloat(human.height);
			
			if (dinoHeight > humanHeight){
				var heightDifference = dinoHeight - humanHeight;
				fact = 'A ' + dino.name + ' is ' + heightDifference + ' inches taller than you.';
			}
			else if (dinoHeight < humanHeight){
				var heightDifference = humanHeight - dinoHeight;
				fact = 'You are ' + heightDifference + ' inches taller than a ' + dino.name + '.';
			}
			else {
				fact = "You and a " + dino.name + ' are the same height.';
			}
			console.log('compareHeight data:', fact);
			return{
				fact
			};
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
			console.log('compareDiet data:', fact);
			return {
				fact
			};
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
			var humanForm = document.getElementById('dino-compare');
			humanForm.style.display = 'none';
		};
		
		for (let i = 0; i < dinos.length; i++){
			addTiles(i);
		}
		
		removeForm();
		
	});
	
	
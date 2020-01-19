ig.module(
	'game.main'
)
.requires(
	'impact.game', 
	'impact.font', 

	'plugins.joncom.font-sugar.font', 
	'plugins.pause', 
	'plugins.camera', 
	'plugins.touch-button', 
	'plugins.impact-splash-loader', 
	'game.entities.spikedguardtower',

	'game.entities.winmessage',
	'game.entities.player',
	'game.entities.round', 
	'game.entities.blob', 
	'game.entities.spear',


	'game.levels.win',  
	'game.levels.starter', 
	'game.levels.startertwo', 
	'game.levels.title',
	'game.levels.cave',
	'game.levels.levelselect1',
	'game.levels.levelselect2',
	'game.levels.levelselect3'
)
.defines(function() {

	// Our Main Game class. This will load levels, host all entities and
	// run the game.

	MyGame = ig.Game.extend({
		font : new ig.Font('media/fonts/whites.font.png', {
			borderColor : '#000000',
			borderSize : 2
		}),
		fontpink : new ig.Font('media/fonts/pinks.font.png', {
			borderColor : '#000000',
			borderSize : 2
		}),
		
		//arial 16, 0 extra spacing
		fontsmall : new ig.Font('media/fonts/small.font.png'),
		fontsmallgrey : new ig.Font('media/fonts/smallgrey.font.png'),
		
		pausebg : new ig.Image('media/sprites/semitrans.png'),
		pauselogo : new ig.Image('media/sprites/pausedlogo.png'),

		clearColor : "#d0f4f7",
		gravity : 1300, // All entities are affected by this

		// HUD icons
		coinIcon : new ig.Image('media/sprites/energy.png'),
		rageBar : new ig.Image('media/sprites/rageBar.png'),
		rageBarEmpty : new ig.Image('media/sprites/rageBarEmpty.png'),
		energyBar : new ig.Image('media/sprites/energyBar.png'),
		energyBarEmpty : new ig.Image('media/sprites/energyBarEmpty.png'),

		rageBarMaxHeight : 270,
		
		ebox : new ig.Image('media/sprites/ebox.png'),
		eboxNot : new ig.Image('media/sprites/eboxNot.png'),
		aoebox : new ig.Image('media/sprites/aoebox.png'),
		aoeboxNot : new ig.Image('media/sprites/aoeboxNot.png'),
		rollbox : new ig.Image('media/sprites/rollbox.png'),
		rollboxNot : new ig.Image('media/sprites/rollboxNot.png'),
		doublejumpbox : new ig.Image('media/sprites/doublejumpbox.png'),
		doublejumpboxNot : new ig.Image('media/sprites/doublejumpboxNot.png'),
		ragebox : new ig.Image('media/sprites/ragebox.png'),
		rageboxNot : new ig.Image('media/sprites/rageboxNot.png'),
		ready : new ig.Image('media/sprites/readytorage.png'),
		rotate: 0,
		rotateChange: 0,
		psigauge: new ig.Image('media/sprites/psi.png'),
		psineedle: new ig.Image('media/sprites/psineedle.png'),
		psifaded: new ig.Image('media/sprites/psifaded.png'),
		redcirc: new ig.Image('media/sprites/redcirc.png'),
		blinkTimer: null,

		// Rage variables
		ragePromptTimer: new ig.Timer(),
		ragePromptMessage: "PRESS 'R' TO ENTER RAGE MODE",
		ragePromt: false,
		

		init : function() {
			ig.input.bind(ig.KEY.LEFT_ARROW, 'left');
			ig.input.bind(ig.KEY.RIGHT_ARROW, 'right');

			ig.input.bind(ig.KEY.SPACE, 'jump');
			ig.input.bind(ig.KEY._3, 'bolt');
			ig.input.bind(ig.KEY._2, 'roll');
			ig.input.bind(ig.KEY._4, 'aoe');
			ig.input.bind(ig.KEY.R, 'rage');
			ig.input.bind(ig.KEY.P, 'pause');
			ig.input.bind(ig.KEY.M, 'exitlevel');
			
			this.rotate = 0.5;

			if (this.ebox.height == 64) {
				// Set scale factor for UI elements
				this.ebox.resize(2);
				this.ebox.height *= 2;
				this.ebox.width *= 2;

				this.eboxNot.resize(2);
				this.eboxNot.height *= 2;
				this.eboxNot.width *= 2;

				this.aoebox.resize(2);
				this.aoebox.height *= 2;
				this.aoebox.width *= 2;

				this.aoeboxNot.resize(2);
				this.aoeboxNot.height *= 2;
				this.aoeboxNot.width *= 2;

				this.rollbox.resize(2);
				this.rollbox.height *= 2;
				this.rollbox.width *= 2;

				this.rollboxNot.resize(2);
				this.rollboxNot.height *= 2;
				this.rollboxNot.width *= 2;

				this.doublejumpbox.resize(2);
				this.doublejumpbox.height *= 2;
				this.doublejumpbox.width *= 2;

				this.doublejumpboxNot.resize(2);
				this.doublejumpboxNot.height *= 2;
				this.doublejumpboxNot.width *= 2;
			}
			if(passedLeveltwo) this.loadLevel(LevelLevelselect3);
			else if(passedLevelone) this.loadLevel(LevelLevelselect2);
			else this.loadLevel(LevelLevelselect1);

		},

		setupCamera : function() {
			// Set up the camera. The camera's center is at a third of the screen
			// size, i.e. somewhat shift left and up. Damping is set to 3px.
			this.camera = new ig.Camera(ig.system.width / 3, ig.system.height / 3, 10);

			// The camera's trap (the deadzone in which the player can move with the
			// camera staying fixed) is set to according to the screen size as well.
			//this.camera.trap.size.x = ig.system.width / 10;
			//this.camera.trap.size.y = ig.system.height / 3;
			this.camera.trap.size.x = ig.system.width / 15;
			this.camera.trap.size.y = ig.system.height / 10;

			// The lookahead always shifts the camera in walking position; you can
			// set it to 0 to disable.
			//this.camera.lookAhead.x = ig.system.width / 6;
			//this.camera.lookAhead.x = ig.system.width / 10;
			//this.camera.lookAhead.y = ig.system.width / 6;

			// Set camera's screen bounds and reposition the trap on the player
			this.camera.max.x = this.collisionMap.pxWidth - ig.system.width;
			this.camera.max.y = this.collisionMap.pxHeight - ig.system.height;

			this.camera.set(this.player);
		},

		reloadLevel : function() {
			// Reset Rage Prompt
			this.ragePromptTimer.set(-1); // Turn off timer
			this.ragePrompt = false; // Disable prompt

			this.loadLevelDeferred(this.currentLevel);
		},

		update : function() {
			this.parent();
			if(this.currentLevel == LevelStarter) passedLevelone = true;
			if(this.currentLevel == LevelCave) passedLeveltwo = true;
			this.camera.follow(this.player);

			//this.screen.x = this.player.pos.x - ig.system.width/2;
			//this.screen.y = this.player.pos.y - ig.system.height/2;

			if (ig.input.state('pause')) {
				this.togglePause();
			}

			if (ig.input.state('rage') && this.ragePrompt) {
				this.player.rage = 0;
				this.player.rageMode = true;
				this.player.rageTimer.set(6);
			}

			if (this.player.rage >= this.player.maxRage) {
				this.ragePromptTimer.set(5); // Set timer for 5 seconds
			}

			if (this.ragePromptTimer.delta() <= 0 && !this.player.rageMode) {
				this.ragePrompt = true;
			} else this.ragePrompt = false;

			if (this.paused) {
				this.ragePromptTimer.pause();
				this.player.rageTimer.pause();
			} else {
				this.player.updateRage(1);
				this.player.updateEnergy(1);
				this.ragePromptTimer.unpause();
				this.player.rageTimer.unpause();
			}
			
			//console.log(this.player.pos.x);
			//ig.game.spawnEntity(EntityCoin, ig.system.width - 100, ig.system.height - 100);
			

			// Load the LevelGrasslands as required above ('game.level.grassland')
			//this.loadLevel( LevelDeserttwo );
		},

		loadLevel : function(data) {
			// Remember the currently loaded level, so we can reload when
			// the player dies.
			this.currentLevel = data;

			// Reset Rage Prompt
			this.ragePromptTimer.set(-1); // Turn off timer
			this.ragePrompt = false; // Disable prompt

			// Call the parent implemenation; this creates the background
			// maps and entities.
			this.parent(data);

			this.setupCamera();
		},
		
		drawGauge : function() {
			
			this.psigauge.x = this.rageBarEmpty.width + 10;
			this.psigauge.y = ig.system.height - 185;
			
			this.psigauge.draw(this.psigauge.x, this.psigauge.y);
			ig.system.context.save();

			ig.system.context.translate(this.psigauge.x + this.psigauge.width/2, ig.system.height - this.psigauge.height/2);
			//0.5 angle is start of gauge
			//-3.6 end
			ig.system.context.rotate(this.player.meterHealth);
			ig.system.context.drawImage(this.psineedle.data, 0, 0, 80, 20);
			ig.system.context.restore();
		},
		
		blinkGauge : function(amt) {
			//console.log(this.blinkTimer.delta());
			if(Math.floor(this.blinkTimer.delta()) % 2 == 0){
				this.redcirc.draw(this.psigauge.x - 4, this.psigauge.y - 5);
				this.psigauge.draw(this.psigauge.x, this.psigauge.y);
				
				this.fontsmallgrey.letterSpacing = -1;
				this.fontsmall.draw("Sprung a leak!",this.psigauge.x + this.psigauge.width/2 , this.psigauge.y - 20, ig.Font.ALIGN.CENTER);

			}
			else{
				this.psigauge.draw(this.psigauge.x, this.psigauge.y);
				this.fontsmallgrey.letterSpacing = -1;
				this.fontsmall.draw("Find a patch!",this.psigauge.x + this.psigauge.width/2 , this.psigauge.y - 20, ig.Font.ALIGN.CENTER);

			}
			
			ig.system.context.save();
			ig.system.context.translate(this.psigauge.x + this.psigauge.width/2, ig.system.height - this.psigauge.height/2);
			//0.5 angle is start of gauge
			//-3.6 end
			ig.system.context.rotate(this.player.meterHealth);
			ig.system.context.drawImage(this.psineedle.data, 0, 0, 80, 20);
			ig.system.context.restore();
		},

		draw : function() {
			//must be called before pause loop below
			this.parent();

			if (this.player) {
				var x = 16, y = 16;

				//render move boxes
				var boxHeights = ig.system.height - this.rollbox.height;
				var leftBoxX = (ig.system.width / 2 - (this.rollbox.width * 3));
				var rollkey = "2";
				var boltkey = "3";
				var AOEkey = "4";
				var doublejumpkey = "Space";
				var ragekey = "R";
				this.fontsmallgrey.letterSpacing = -1;
				this.fontsmall.letterSpacing = -1;

				// Draw Rage Bar
				this.rageBarEmpty.x = 3;
				this.rageBarEmpty.y = ig.system.height - this.rageBarEmpty.height;
				this.rageBar.height = (this.player.rage/this.player.maxRage)*this.rageBarMaxHeight;

				this.rageBar.draw(this.rageBarEmpty.x + 5, this.rageBarEmpty.y + this.rageBarEmpty.height - this.rageBar.height - 3);
				this.rageBarEmpty.draw(this.rageBarEmpty.x, this.rageBarEmpty.y);
				
				//Draw Energy Bar
				this.energyBarEmpty.x = ig.system.width / 2 - this.energyBarEmpty.width / 2;
				this.energyBarEmpty.y = boxHeights - this.energyBarEmpty.height;
				this.energyBar.width = this.player.energy * 5;
				this.energyBar.height = this.energyBarEmpty.height - 10;

				this.energyBarEmpty.draw(this.energyBarEmpty.x, this.energyBarEmpty.y);
				this.energyBar.draw(this.energyBarEmpty.x + 5, this.energyBarEmpty.y + 5);


				// Draw rage prompt
				if (this.ragePrompt) {
					this.font.draw(this.ragePromptMessage, ig.system.width/2, ig.system.height/2 - 200, ig.Font.ALIGN.CENTER);
				}

				if (this.player.rageMode) {
					this.font.draw("INFINITE ENERGY! " + -Math.ceil(this.player.rageTimer.delta()), ig.system.width/2, this.energyBarEmpty.y - 65, ig.Font.ALIGN.CENTER);
				}

				// Draw PSI Gauge
				if (ig.game.player.howManyHits == 0){
					this.drawGauge();
					if (this.blinkTimer !== null) {
						this.blinkTimer = null;
					}
				}
				else {
					if (this.blinkTimer == null) {
						this.blinkTimer = new ig.Timer(1);
					}
					this.blinkGauge(1);
				}
			}
			
			if(this.player.energy >= this.player.doubleJumpE){
				this.doublejumpbox.draw(leftBoxX + (this.rollbox.width * 1), boxHeights);
				this.fontsmall.draw(doublejumpkey, leftBoxX + (this.rollbox.width * 1) + 1, boxHeights, ig.Font.ALIGN.LEFT);
			}else{
				this.doublejumpboxNot.draw(leftBoxX + (this.rollbox.width * 1), boxHeights);
				this.fontsmallgrey.draw(doublejumpkey, leftBoxX + (this.rollbox.width * 1) + 1, boxHeights, ig.Font.ALIGN.LEFT);
			}
			
			if(this.player.energy >= this.player.rollE){
				this.rollbox.draw(leftBoxX + (this.rollbox.width * 2), boxHeights);
				this.fontsmall.draw(rollkey, leftBoxX + (this.rollbox.width * 2) + 53, boxHeights, ig.Font.ALIGN.LEFT);
			}else{
				this.rollboxNot.draw(leftBoxX + (this.rollbox.width * 2), boxHeights);
				this.fontsmallgrey.draw(rollkey, leftBoxX + (this.rollbox.width * 2) + 53, boxHeights, ig.Font.ALIGN.LEFT);
			}
			
			if(this.player.energy >= this.player.boltE){
				this.ebox.draw(leftBoxX + (this.rollbox.width * 3), boxHeights);
				this.fontsmall.draw(boltkey, leftBoxX  + (this.rollbox.width * 3)+ 53, boxHeights, ig.Font.ALIGN.LEFT);
			}
			else{
				this.eboxNot.draw(leftBoxX + (this.rollbox.width * 3), boxHeights);
				this.fontsmallgrey.draw(boltkey, leftBoxX  + (this.rollbox.width * 3)+ 53, boxHeights, ig.Font.ALIGN.LEFT);
			}
				
			if(this.player.energy >= this.player.AOEE){
				this.aoebox.draw(leftBoxX + (this.rollbox.width * 4), boxHeights);
				this.fontsmall.draw(AOEkey, leftBoxX + (this.rollbox.width * 4) + 53, boxHeights, ig.Font.ALIGN.LEFT);
			}else{
				this.aoeboxNot.draw(leftBoxX + (this.rollbox.width * 4), boxHeights);
				this.fontsmallgrey.draw(AOEkey, leftBoxX + (this.rollbox.width * 4) + 53, boxHeights, ig.Font.ALIGN.LEFT);
			}
			
			if (this.paused) {
				var image = this.pausebg.data;
				ig.system.context.drawImage(image, 0, 0, ig.system.width, ig.system.height);

				this.pauselogo.x = ig.system.width/2 - this.pauselogo.width/2;
				this.pauselogo.y = ig.system.height/2 - this.pauselogo.height;
				this.pauselogo.draw(this.pauselogo.x, this.pauselogo.y);

				this.font.letterSpacing = -20;
				this.fontpink.letterSpacing = -15;

				this.font.draw("Press     to Exit To Main Menu", ig.system.width/2, this.pauselogo.y + 2*this.pauselogo.height/3, ig.Font.ALIGN.CENTER);
				this.fontpink.draw("M", ig.system.width/2 - 230, this.pauselogo.y + 2*this.pauselogo.height/3, ig.Font.ALIGN.LEFT);
				this.font.draw('Press    to Unpause', ig.system.width/2, this.pauselogo.y + 2*this.pauselogo.height/3 + 65, ig.Font.ALIGN.CENTER);
				this.fontpink.draw("P", ig.system.width/2 - 90, this.pauselogo.y + 2*this.pauselogo.height/3 + 65, ig.Font.ALIGN.LEFT);

				if (ig.input.pressed('exitlevel')) {
					this.paused = false;
					ig.system.setGame(MyTitle);
				}
			}

			this.fontsmall.draw("Press P to pause", ig.system.width - 120, ig.system.height - 20, ig.Font.ALIGN.LEFT);
			
			// Draw touch buttons, if we have any
			if (window.myTouchButtons) {
				window.myTouchButtons.draw();
			}
		}
	});

	HowToPlay = ig.Game.extend({
		font : new ig.Font('media/fonts/whites.font.png', {
			borderColor : '#000000',
			borderSize : 2
		}),
		fontpink : new ig.Font('media/fonts/pinks.font.png', {
			borderColor : '#000000',
			borderSize : 2
		}),

		clearColor : "#000000",

		title : new ig.Image('media/sprites/howtoplay.png'),
		
		clearColor : "#d0f4f7",
		gravity : 1300, // All entities are affected by this

		init : function() {
			ig.input.bind(ig.KEY.LEFT_ARROW, 'left');
			ig.input.bind(ig.KEY.RIGHT_ARROW, 'right');

			ig.input.bind(ig.KEY.SPACE, 'jump');
			ig.input.bind(ig.KEY.C, 'shoot');
			ig.input.bind(ig.KEY._3, 'bolt');
			ig.input.bind(ig.KEY._2, 'roll');
			ig.input.bind(ig.KEY._4, 'aoe');
			ig.input.bind(ig.KEY.P, 'pause');
			ig.input.bind(ig.KEY.M, 'exitlevel');
			
			ig.input.bind(ig.KEY.M, 'mainmenu');
			this.loadLevel(LevelTitle);
			this.maxY = this.backgroundMaps[0].pxHeight - ig.system.height;
			
			
			this.setupCamera();
		},
		
		setupCamera : function() {
			// Set up the camera. The camera's center is at a third of the screen
			// size, i.e. somewhat shift left and up. Damping is set to 3px.
			this.camera = new ig.Camera(ig.system.width / 3, ig.system.height / 3, 3);

			// The camera's trap (the deadzone in which the player can move with the
			// camera staying fixed) is set to according to the screen size as well.
			this.camera.trap.size.x = ig.system.width / 10;
			this.camera.trap.size.y = ig.system.height / 3;

			// The lookahead always shifts the camera in walking position; you can
			// set it to 0 to disable.
			this.camera.lookAhead.x = ig.system.width / 6;

			// Set camera's screen bounds and reposition the trap on the player
			this.camera.max.x = this.collisionMap.pxWidth - ig.system.width;
			this.camera.max.y = this.collisionMap.pxHeight - ig.system.height;

			this.camera.set(this.player);
		},

		update : function() {
			if (ig.input.pressed('how')) {
				ig.system.setGame(MyTitle);
				return;
			}

			this.player.gainCoinEnergy(15);
			this.camera.follow(this.player);
			this.parent();
			

		},

		draw : function() {
			this.parent();

			var cx = ig.system.width / 2;
			this.title.draw(cx - this.title.width / 2, 0);
			this.font.letterSpacing = -20;
			this.fontpink.letterSpacing = -15;

			var moves = [];
			moves.push("Space");
			moves.push("Space");
			moves.push("      2");
			moves.push("      3");
			moves.push("      4");

			var desc = [];
			desc.push("Jump");
			desc.push("Double Jump");
			desc.push("Dash");
			desc.push("Mind bolt");
			desc.push("AOE attack");

			var euse = [];
			euse.push(0);
			euse.push(1);
			euse.push(2);
			euse.push(3);
			euse.push(4);

			var topY = 200;

			for (var i = 0; i < moves.length; i++) {
				this.fontpink.draw(moves[i], 20, topY, ig.Font.ALIGN.LEFT);
				this.font.draw(desc[i], 230, topY, ig.Font.ALIGN.LEFT);
				for (var e = 0; e < euse[i]; e++) {
					//this.energyFull.draw(600 + ((e + 1) * this.energyFull.width), topY + 20);
				}
				topY = topY + 50;
			}

			this.font.draw(" Press      to Return", cx, topY + 50, ig.Font.ALIGN.CENTER);
			this.fontpink.draw("H    ", cx, topY + 50, ig.Font.ALIGN.CENTER);
		},
	});

	// The title screen is simply a Game Class itself; it loads the LevelTitle
	// runs it and draws the title image on top.

	MyTitle = ig.Game.extend({
		//clearColor: "#d0f4f7",
		//gravity: 1000,
		clearColor : "#000000",


		// The title image
		title : new ig.Image('media/sprites/mainlogo.png'),

		font : new ig.Font('media/fonts/whites.font.png', {
			borderColor : '#000000',
			borderSize : 2
		}),
		fontpink : new ig.Font('media/fonts/pinks.font.png', {
			borderColor : '#000000',
			borderSize : 2
		}),
		
        
        
		init : function() {

			
		
			/*
			 ig.input.bind( ig.KEY.LEFT_ARROW, 'left' );
			 ig.input.bind( ig.KEY.RIGHT_ARROW, 'right' );

			 ig.input.bind( ig.KEY.X, 'jump' );
			 ig.input.bind( ig.KEY.C, 'shoot' );
			 ig.input.bind( ig.KEY.V, 'bolt' );
			 ig.input.bind( ig.KEY.N, 'roll' );
			 ig.input.bind( ig.KEY.B, 'aoe' );
			 */

			ig.input.bind(ig.KEY.S, 'select');
			ig.input.bind(ig.KEY.H, 'how');
			ig.input.bind(ig.KEY.C, 'credits');
			ig.input.bind(ig.KEY.Q, 'quit');

			/*
			// Align touch buttons to the screen size, if we have any
			if (window.myTouchButtons) {
			window.myTouchButtons.align();
			}
			*/
			// We want the font's chars to slightly touch each other,
			// so set the letter spacing to -2px.
			//this.font.letterSpacing = -2;

			//this.loadLevel(LevelTitle);
			//this.maxY = this.backgroundMaps[0].pxHeight - ig.system.height;
		},

		update : function() {
			
			/*
			 if( ig.input.pressed('jump') || ig.input.pressed('shoot') ) {
					ig.system.setGame( MyGame );
					return;
			}
			 */
			// Check for buttons; start the game if pressed
			
			if (ig.input.pressed('select')) {
				ig.system.setGame(MyGame);
				return;
			}
			if (ig.input.pressed('how')) {
				ig.system.setGame(HowToPlay);
				return;
			}
			if (ig.input.pressed('quit')) {
				ig.system.setGame(MyGame);
				return;
			}
			if (ig.input.pressed('credits')) {
				ig.system.setGame(Credits);
				return;
			}

			this.parent();

			/*
			 // Scroll the screen down; apply some damping.
			 var move = this.maxY - this.screen.y;
			 if (move > 5) {
			 this.screen.y += move * ig.system.tick;
			 this.titleAlpha = this.screen.y / this.maxY;
			 }
			 this.screen.x = (this.backgroundMaps[0].pxWidth - ig.system.width) / 2;
			 */
		},

		draw : function() {
			this.parent();
			this.font.letterSpacing = -20;
			this.fontpink.letterSpacing = -15;
			var cx = ig.system.width / 2;
			//this.title.draw(cx - this.title.width / 2, 0);
			
			/*
			 var startText = ig.ua.mobile
			? 'Press Button to Play!'
			: 'Press butts or C to Play!';
		
			this.font.draw( startText, cx, 420, ig.Font.ALIGN.CENTER);
			 */

			//sclaes image
			//ig.system.context.save();
			var image = this.title.data;
			//ig.system.context.rotate(50);
			ig.system.context.drawImage(image, 0, ig.system.height/2 - 2*image.height/3, ig.system.width, 393);

			//fonts are size 50, font: arial black, spacing: 5
			//from http://impactjs.com/font-tool/
			//spacing is needed because there is some overlap
			this.font.draw('- Start Game', ig.system.width/2 - 150, ig.system.height/2 - 2*image.height/3 + image.height, ig.Font.ALIGN.LEFT);
			this.fontpink.draw('S', ig.system.width/2 - 205, ig.system.height/2 - 2*image.height/3 + image.height, ig.Font.ALIGN.LEFT);

			this.font.draw('- How To Play', ig.system.width/2 - 150, ig.system.height/2 - 2*image.height/3 + image.height + 65, ig.Font.ALIGN.LEFT);
			this.fontpink.draw('H', ig.system.width/2 - 205, ig.system.height/2 - 2*image.height/3 + image.height + 65, ig.Font.ALIGN.LEFT);

			this.font.draw('- Credits', ig.system.width/2 - 150, ig.system.height/2 - 2*image.height/3 + image.height + 65*2, ig.Font.ALIGN.LEFT);
			this.fontpink.draw('C', ig.system.width/2 - 205, ig.system.height/2 - 2*image.height/3 + image.height + 65*2, ig.Font.ALIGN.LEFT);
		},
	});

	Credits = ig.Game.extend({
		clearColor : "#000000",


		// Credit Listings:
		congrats : "CONGRATULATIONS!",

		gratsMsg1 : "You have completed",
		gameName : "ELASTIC POLYMER RAMPAGE",
		gratsMsg2 : "And have proven your value to yourself and to others",

		staffHeader : "A Game By",
		AaronJ : "Aaron Jauregui",
		AaronP : "Aaron Piotrowski",
		SamR : "Samuel Reha",
		KimSon : "Kim Son Nguyen",

		artHeader : "With Art By",
		artHeader2 : "Featuring Art From",
		artSource1 : "www.flamingtext.com",
		artSource2 : "www.openclipart.com",
		artSource3 : "www.opengameart.com",
		artSource4 : "www.wikipedia.org",

		specialThanks : "Special Thanks to our TA's and testers",

		closer1 : "This game was made as a part of CMPS 20: Game Design Experience",
		closer2 : "University of California: Santa Cruz - 2014",
		closer3 : "Press 'ESC' or 'Q' to go back",

		// position variable
		startY : 0,
		yBuffer : 65,
		endY : -1900,

		// Load a font
		font : new ig.Font('media/fonts/fredoka-one.font.png', {
			borderColor : '#000000',
			borderSize : 2
		}),
		

		init : function() {

			ig.input.bind(ig.KEY.ESC, 'exit');
			ig.input.bind(ig.KEY.Q, 'quit');

			this.startY = ig.system.height;
		},

		update : function() {
			// Check for buttons
			if (ig.input.pressed('exit')) {
				ig.system.setGame(MyTitle);
				return;
			}
			if (ig.input.pressed('quit')) {
				ig.system.setGame(MyTitle);
				return;
			}

			if (this.startY > this.endY) {
				this.startY--;
			}

			this.parent();
		},

		draw : function() {
			this.parent();
			this.font.letterSpacing = -5;

			this.font.draw(this.staffHeader, ig.system.width/2, this.startY, ig.Font.ALIGN.CENTER);
			this.font.draw(this.AaronJ, ig.system.width/2, this.startY + this.yBuffer*1, ig.Font.ALIGN.CENTER);
			this.font.draw(this.AaronP, ig.system.width/2, this.startY + this.yBuffer*2, ig.Font.ALIGN.CENTER);
			this.font.draw(this.KimSon, ig.system.width/2, this.startY + this.yBuffer*3, ig.Font.ALIGN.CENTER);
			this.font.draw(this.SamR, ig.system.width/2, this.startY + this.yBuffer*4, ig.Font.ALIGN.CENTER);

			this.font.draw(this.artHeader, ig.system.width/2, this.startY + this.yBuffer*6, ig.Font.ALIGN.CENTER);
			this.font.draw(this.AaronJ, ig.system.width/2, this.startY + this.yBuffer*7, ig.Font.ALIGN.CENTER);
			this.font.draw(this.AaronP, ig.system.width/2, this.startY + this.yBuffer*8, ig.Font.ALIGN.CENTER);
			this.font.draw(this.SamR, ig.system.width/2, this.startY + this.yBuffer*9, ig.Font.ALIGN.CENTER);

			this.font.draw(this.artHeader2, ig.system.width/2, this.startY + this.yBuffer*11, ig.Font.ALIGN.CENTER);
			this.font.draw(this.artSource1, ig.system.width/2, this.startY + this.yBuffer*12, ig.Font.ALIGN.CENTER);
			this.font.draw(this.artSource2, ig.system.width/2, this.startY + this.yBuffer*13, ig.Font.ALIGN.CENTER);
			this.font.draw(this.artSource3, ig.system.width/2, this.startY + this.yBuffer*14, ig.Font.ALIGN.CENTER);
			this.font.draw(this.artSource4, ig.system.width/2, this.startY + this.yBuffer*15, ig.Font.ALIGN.CENTER);

			this.font.draw(this.specialThanks, ig.system.width/2, this.startY + this.yBuffer*34, ig.Font.ALIGN.CENTER);

			this.font.draw(this.closer1, ig.system.width/2, this.startY + this.yBuffer*36, ig.Font.ALIGN.CENTER);
			this.font.draw(this.closer2, ig.system.width/2, this.startY + this.yBuffer*37, ig.Font.ALIGN.CENTER);
			this.font.draw(this.closer3, ig.system.width/2, this.startY + this.yBuffer*38, ig.Font.ALIGN.CENTER);
		},
	});

	// If our screen is smaller than 640px in width (that's CSS pixels), we scale the
	// internal resolution of the canvas by 2. This gives us a larger viewport and
	// also essentially enables retina resolution on the iPhone and other devices
	// with small screens.
	var scale = (window.innerWidth < 640) ? 2 : 1;

	// We want to run the game in "fullscreen", so let's use the window's size
	// directly as the canvas' style size.
	var canvas = document.getElementById('canvas');
	var passedLevelone = false;
    var passedLeveltwo = false;
	canvas.style.width = window.innerWidth + 'px';
	canvas.style.height = window.innerHeight + 'px';

	// Listen to the window's 'resize' event and set the canvas' size each time
	// it changes.
	window.addEventListener('resize', function() {
		// If the game hasn't started yet, there's nothing to do here
		if (!ig.system) {
			return;
		}

		// Resize the canvas style and tell Impact to resize the canvas itself;
		canvas.style.width = window.innerWidth + 'px';
		canvas.style.height = window.innerHeight + 'px';
		ig.system.resize(window.innerWidth * scale, window.innerHeight * scale);

		// Re-center the camera - it's dependend on the screen size.
		if (ig.game && ig.game.setupCamera) {
			ig.game.setupCamera();
		}

		// Also repositon the touch buttons, if we have any
		if (window.myTouchButtons) {
			window.myTouchButtons.align();
		}
	}, false);

	// Finally, start the game into MyTitle and use the ImpactSplashLoader plugin
	// as our loading screen
	var width = window.innerWidth * scale, height = window.innerHeight * scale;
	ig.main('#canvas', MyTitle, 60, width, height, 1, ig.ImpactSplashLoader);
	//ig.main('#canvas', IntroScreen, 60, width, height, 1, ig.ImpactSplashLoader);

});

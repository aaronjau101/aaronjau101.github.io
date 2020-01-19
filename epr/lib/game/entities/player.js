ig.module(
	'game.entities.player'
)
.requires(
	'impact.entity',
	'game.entities.bolt',
	'game.entities.cactus',
	'game.entities.guardtower',
	'game.entities.spikedguardtower',
	'game.entities.aoe'
)
.defines(function(){

EntityPlayer = ig.Entity.extend({
	
	// The players (collision) size is a bit smaller than the animation
	// frames, so we have to move the collision box a bit (offset)
	size: {x: 64, y: 64},
	offset: {x: 0, y: 0},
	maxVel: {x: 3000, y: 2000},
	regMaxVel: {x: 800, y: 2000},
	friction: {x: 800, y: 0},
	
	type: ig.Entity.TYPE.A, // Player friendly group
	checkAgainst: ig.Entity.TYPE.B,
	collides: ig.Entity.COLLIDES.PASSIVE,
	
	//animSheet: new ig.AnimationSheet( 'media/sprites/placeholder_tire_64.png', 64, 64),	
	animSheet: new ig.AnimationSheet( 'media/sprites/tires.png', 64, 64),	
	//sfxHurt: new ig.Sound( 'media/sounds/hurt.mp3' ),
	//sfxJump: new ig.Sound( 'media/sounds/jump.mp3' ),
	
	
	health: 5,
	energy: 100,
	rage: 0,

	// These are our own properties. They are not defined in the base
	// ig.Entity class. We just use them internally for the Player
	flip: false,
	accelGround: 3700,
	accelAir: 3500,
	jump: 700,
	speedroll: 1000,	
	maxHealth: 5,
	maxEnergy: 100,
	maxRage: 100,
	
	boltE: 15,
	AOEE: 40,
	doubleJumpE: 15,
	rollE: 15,
	meterHealth: 0.5,
	howManyHits: 0,
	meterChange: 0,
	meterHealthMin: 3.6,
	meterHealthMax: 0.5,

	rageTimer: new ig.Timer(),
	rageMode: false,
	rollTimer: null,
	gainTimer: null,

	hops: false,

	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		// Add the animations
		this.addAnim( 'idle', 1, [0]);
		this.addAnim( 'run', 1, [0]);
		this.addAnim( 'jump', .6, [0,3]);
		this.addAnim( 'fall', .6, [0,3]); // stop at the last frame
		this.addAnim( 'pain', 1, [2]);
		this.addAnim( 'rage', .2, [5,4]);
		// Set a reference to the player on the game instance
		this.meterHealth = 0.5;
		ig.game.player = this;
	},
	
	
	update: function() {
		if (this.standing) {
			this.hops = true;
		}

		// Handle user input; move left or right
		var accel = this.standing ? this.accelGround : this.accelAir;

		// Rage Mode
		if (this.rageMode) {
			if(this.howManyHits > 0){
				this.howManyHits = 0;
			}
			this.meterHealth = this.meterHealthMax;
			this.energy = this.maxEnergy;

			if (this.rageTimer.delta() > 0) {
				this.rageMode = false;
			}
		}

		if( ig.input.state('left') && this.vel.x > -this.regMaxVel.x) {
			this.accel.x = -accel;
			this.flip = true;
		}
		else if( ig.input.state('right') && this.vel.x < this.regMaxVel.x) {
			this.accel.x = accel;
			this.flip = false;
		}
		else {
			this.accel.x = 0;
		}

		// jump
		if( this.standing && ig.input.pressed('jump') ) {
			this.vel.y = -this.jump;
			//this.sfxJump.play();
		}

		//double jump
		else if( this.standing == false && ig.input.pressed('jump') && this.energy > this.doubleJumpE && this.hops){
			this.vel.y = -this.jump;
			//this.sfxJump.play();
			this.hops = false;

			if (!this.rageMode) {
				this.loseEnergy(this.doubleJumpE);
			}
		}

		//speed roll
		else if(ig.input.pressed('roll') && this.energy >= this.rollE){
			if(this.rollTimer == null){
				this.vel.x = this.flip ?  this.vel.x - this.speedroll : this.vel.x + this.speedroll;
				this.rollTimer = new ig.Timer(1);
				this.loseEnergy(this.rollE);
			}else if(this.rollTimer.delta() > 0){
				this.vel.x = this.flip ?  this.vel.x - this.speedroll : this.vel.x + this.speedroll;
				this.loseEnergy(this.rollE);
				this.rollTimer = null;
			}
		}

		// bolt
		else if( ig.input.pressed('bolt') ) {

			if(this.energy >= this.boltE){
				ig.game.spawnEntity( EntityBolt, this.pos.x, this.pos.y+40, {flip:this.flip, playerRef:this } );

				if (!this.rageMode) {
					this.loseEnergy(this.boltE);
				}
			}
		}
		
		// AoE
		else if( ig.input.pressed('aoe') ) {

			if(this.energy >= this.AOEE){
				for(var i = 100; i < 1500; i += 100) {
					ig.game.spawnEntity( EntityAoe, this.pos.x, this.pos.y+40, {flip:this.flip, yvel:i, xvel:-(1500 - i) * Math.sin(i), playerRef:this } );
					ig.game.spawnEntity( EntityAoe, this.pos.x, this.pos.y+40, {flip:this.flip, yvel:i, xvel:(1500 - i) * Math.sin(i), playerRef:this } );
					ig.game.spawnEntity( EntityAoe, this.pos.x, this.pos.y+40, {flip:this.flip, yvel:-i, xvel:-(1500 - i) * Math.sin(i), playerRef:this } );
					ig.game.spawnEntity( EntityAoe, this.pos.x, this.pos.y+40, {flip:this.flip, yvel:-i, xvel:(1500 - i) * Math.sin(i), playerRef:this } );
				}

				if (!this.rageMode) {
					this.loseEnergy(this.AOEE);
				}
			}
		}
		
		if(this.rollTimer !== null && this.rollTimer.delta() > 0){
				this.rollTimer = null;
			}

		if( -this.meterHealth >= this.meterHealthMin ) {
			// We're actually dead and the death (pain) animation is 
			// finished. Remove ourself from the game world.
			this.kill();
		}
		else if( this.rageMode == true){
		   this.currentAnim = this.anims.rage;
		} 
		else if( this.vel.y < 0 ) {
			this.currentAnim = this.anims.jump;
		}
		else if( this.vel.y > 0 ) {
			if( this.currentAnim != this.anims.fall ) {
				this.currentAnim = this.anims.fall.rewind();
			}
		}
		else if( this.vel.x != 0 ) {
			this.currentAnim = this.anims.run;
		}
		else {
			this.currentAnim = this.anims.idle;
		}
		
		this.currentAnim.flip.x = this.flip;
		
		switch(this.howManyHits){
				case 0:
					this.meterChange = 0;
					break;
				case 1:
					this.meterChange = -0.001;
					break;
				case 2:
					this.meterChange = -0.002;
					break;
				case 3:
					this.meterChange = -0.004;
					break;
				case 4:
					this.meterChange = -0.008;
					break;
				default:
					this.meterChange = -0.008;
					break;
			}
			
		this.meterHealth += this.meterChange;
		
		// Move!
		this.parent();
	},

	kill: function() {
		this.parent();

		// Reload this level
		ig.game.reloadLevel();
	},

	giveCoins: function( amount ) {
		// Custom function, called from the EntityCoin
		this.energy += amount;
	},

	receiveDamage: function( amount, from ) {
		if( this.currentAnim == this.anims.pain ) {
			// Already in pain? Do nothing.
			return;
		}

		// We don't call the parent implementation here, because it 
		// would call this.kill() as soon as the health is zero. 
		// We want to play our death (pain) animation first.
		
		
		//this.health -= amount;
		
		
		this.howManyHits++;
		
		//console.log(this.howManyHits);

		// Knockback
		this.vel.x = (from.pos.x > this.pos.x) ? -400 : 400;
		this.vel.y = -300;
		
		// Sound
		this.currentAnim = this.anims.pain;
		//this.sfxHurt.play();
	},

	gainRage: function(amount) {
		this.gainTimer = new ig.Timer(1);
		this.rage += amount;
		if (this.rage > this.maxRage) {
			this.rage = this.maxRage;
		}
	},

	updateRage: function(rate) {
		if (this.rage > 0) {
			this.rage -= ig.system.tick * 2;
		}
	},
	
	loseEnergy: function(amount) {
		this.energy -= amount;
		if (this.energy < 0) {
			this.energy = 0;
		}
	},

	updateEnergy: function(rate) {
		if (this.energy < 100) {
			this.energy += ig.system.tick * 8;
		}
	},
	
	gainCoinEnergy: function(rate) {
		if (this.energy < 100) {
			this.energy += rate;
		}
	},
	
	check: function( other ) {
		if(this.rollTimer !== null && this.rollTimer.delta() < 0){
			if(other.enemyType == "cop"){
				other.dazed = true;
			}
			else if(other.enemyType == "cactus"){
				other.kill();
			}else{
				other.receiveDamage( 1, this );
			}
		}
	},	

});


});
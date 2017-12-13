ig.module(
	'game.entities.bolt'
)
.requires(
	'impact.entity',
	'impact.entity-pool'
)
.defines(function(){

EntityBolt = ig.Entity.extend({

	_wmIgnore: true, // This entity will no be available in Weltmeister

	size: {x: 24, y: 24},
	offset: {x: 6, y: 40},
	maxVel: {x: 2000, y: 400},
	gravityFactor: 0,
	
	// The fraction of force with which this entity bounces back in collisions
	//bounciness: 0.8, 
	
	type: ig.Entity.TYPE.NONE,
	checkAgainst: ig.Entity.TYPE.B, // Check Against B - our evil enemy group
	collides: ig.Entity.COLLIDES.PASSIVE,
		
	animSheet: new ig.AnimationSheet( 'media/sprites/bolt.png', 64, 64 ),
	sfxSpawn: new ig.Sound( 'media/sounds/fireball.*' ),

	playerRef: null,
	relativexdist: 0,
	totalxdist: 0,
	initplayerx: 0,
	
	//bounceCounter: 0,
	
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		this.vel.x = (settings.flip ? -this.maxVel.x : this.maxVel.x);
		this.vel.y = 0;
		this.addAnim( 'idle', 1, [0] );
		if(this.vel.x < 0){
			this.currentAnim.angle = Math.PI;
		}else{
			this.currentAnim.angle = 0;
		}
		
		
		this.sfxSpawn.play();
		this.initplayerx = this.playerRef.pos.x;
		
	},
	
	reset: function( x, y, settings ) {
		// This function is called when an instance of this class is resurrected
		// from the entity pool. (Pooling is enabled at the bottom of this file).
		this.parent( x, y, settings );
		
		this.initplayerx = this.playerRef.pos.x;
		
		this.vel.x = (settings.flip ? -this.maxVel.x : this.maxVel.x);
		this.vel.y = 0;
		this.playerRef = settings.playerRef;
		this.sfxSpawn.play();
		
		// Remember, this a used entity, so we have to reset our bounceCounter
		// as well
		//this.bounceCounter = 0;
	},

	update: function() {
		this.parent();
		if(this.vel.x < 0){
			this.currentAnim.angle = Math.PI;
		}else{
			this.currentAnim.angle = 0;
		}
		
		this.relativexdist = this.pos.x - this.playerRef.pos.x;
		this.totalxdist = this.pos.x - this.initplayerx;
		//this.currentAnim.angle += ig.system.tick * 10;
	},
		
	handleMovementTrace: function( res ) {
		this.parent( res );
		
		
		
		
		// Kill this fireball if it bounced more than 3 times
		if( res.collision.x || res.collision.y || res.collision.slope ) {
			//this.bounceCounter++;
			//if( this.bounceCounter > 3 ) {
				this.kill();
			//}
		}
		
	},
	
	// This function is called when this entity overlaps anonther entity of the
	// checkAgainst group. I.e. for this entity, all entities in the B group.
	check: function( other ) {
		other.receiveDamage( 1, this );
		//other.type = ig.Entity.TYPE.A;
		/*
		if (!this.playerRef.rageMode) {
			this.playerRef.gainRage(20);
		}
		*/
		this.kill();
	}	
});


// If you have an Entity Class that instanced and removed rapidly, such as this 
// Fireball class, it makes sense to enable pooling for it. This will reduce
// strain on the GarbageCollector and make your game a bit more fluid.

// With pooling enabled, instances that are removed from the game world are not 
// completely erased, but rather put in a pool and resurrected when needed.

ig.EntityPool.enableFor( EntityBolt );


});

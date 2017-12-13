ig.module(
	'game.entities.aoe'
)
.requires(
	'impact.entity',
	'impact.entity-pool'
)
.defines(function(){

EntityAoe = ig.Entity.extend({

	_wmIgnore: true, // This entity will no be available in Weltmeister

	size: {x: 24, y: 24},
	offset: {x: 6, y: 40},
	maxVel: {x: 1500, y: 1500},
	friction: {x: 300, y: 0},
	gravityFactor: 4,

	// The fraction of force with which this entity bounces back in collisions
	bounciness: 0.8, 
	
	type: ig.Entity.TYPE.NONE,
	checkAgainst: ig.Entity.TYPE.B, // Check Against B - our evil enemy group
	collides: ig.Entity.COLLIDES.PASSIVE,
		
	animSheet: new ig.AnimationSheet( 'media/sprites/bolt.png', 64, 64 ),
	sfxSpawn: new ig.Sound( 'media/sounds/fireball.*' ),
	
	bounceCounter: 0,
	playerRef: null,
	
	
	init: function( x, y, settings) {
		this.parent( x, y, settings );

		this.vel.x = settings.xvel;
		this.vel.y = settings.yvel;
		this.playerRef = settings.playerRef;
		this.addAnim( 'idle', 1, [0] );
		
		if(this.vel.x < 0){
			this.currentAnim.angle = Math.atan((this.pos.y - this.last.y) / (this.pos.x - this.last.x)) + Math.PI;
		}else{
			this.currentAnim.angle = Math.atan((this.pos.y - this.last.y) / (this.pos.x - this.last.x));
		}
		
		this.sfxSpawn.play();
	},
	
	reset: function( x, y, settings ) {
		// This function is called when an instance of this class is resurrected
		// from the entity pool. (Pooling is enabled at the bottom of this file).
		this.parent( x, y, settings );
		
		//this.vel.x = (settings.flip ? settings.xvel : -settings.xvel);
		this.vel.x = settings.xvel;
		this.vel.y = settings.yvel;
		this.playerRef = settings.playerRef;
		this.sfxSpawn.play();
		
		// Remember, this a used entity, so we have to reset our bounceCounter
		// as well
		this.bounceCounter = 0;
	},

	update: function() {
		
		this.parent();
		if(this.vel.x < 0){
			this.currentAnim.angle = Math.atan((this.pos.y - this.last.y) / (this.pos.x - this.last.x)) + Math.PI;
		}else{
			this.currentAnim.angle = Math.atan((this.pos.y - this.last.y) / (this.pos.x - this.last.x));
		}
		
	},
		
	handleMovementTrace: function( res ) {
		this.parent( res );
		// Kill this fireball if it bounced more than 3 times
		if( res.collision.x || res.collision.y || res.collision.slope ) {
			this.bounceCounter++;
			if( this.bounceCounter > 0 ) {
				this.kill();
			}
		}
		
	},
	
	// This function is called when this entity overlaps anonther entity of the
	// checkAgainst group. I.e. for this entity, all entities in the B group.
	check: function( other ) {
		other.receiveDamage( 1, this );
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

ig.EntityPool.enableFor( EntityAoe );


});
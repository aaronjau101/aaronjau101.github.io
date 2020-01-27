ig.module(
	'game.entities.cactus'
)
.requires(
	'impact.entity'
)
.defines(function(){
	
EntityCactus = ig.Entity.extend({
	size: {x: 64, y: 128},
	offset: {x:0, y: 0},
	maxVel: {x: 100, y: 100},
	friction: {x: 150, y: 0},
	enemyType: "cactus",
	
	type: ig.Entity.TYPE.B, // Evil enemy group
	checkAgainst: ig.Entity.TYPE.A, // Check against friendly
	collides: ig.Entity.COLLIDES.PASSIVE,
	
	health: 1,
	
	
	speed: 0,
	flip: false,
	
	animSheet: new ig.AnimationSheet( 'media/sprites/cactus_small.png', 64, 128 ),
	//sfxDie: new ig.Sound( 'media/sounds/blob-die.*' ),
	
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		this.addAnim( 'idle', 1, [0] );
	},
	
	
	update: function() {
		this.parent();
	},
	
	kill: function() {
		if (!ig.game.player.rageMode) {
			ig.game.player.gainRage(5);
			}
			
		//this.sfxDie.play();
		this.parent();
		
	},
	
	handleMovementTrace: function( res ) {
		this.parent( res );
	},
	
	check: function( other ) {
		
		if(other.rollTimer !== null && other.rollTimer.delta() < 0){
			console.log(other.rollTimer.delta());
			//other.receiveDamage( 1, this );
		}else{
			other.receiveDamage( 1, this );
		}
	}
});

});
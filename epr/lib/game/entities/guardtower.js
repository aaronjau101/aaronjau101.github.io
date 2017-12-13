ig.module(
	'game.entities.guardtower'
)
.requires(
	'impact.entity'
)
.defines(function(){
	
EntityGuardtower = ig.Entity.extend({
	size: {x: 64, y: 256},
	offset: {x:0, y: 0},
	maxVel: {x: 100, y: 100},
	friction: {x: 150, y: 0},
	
	type: ig.Entity.TYPE.B, // Evil enemy group
	checkAgainst: ig.Entity.TYPE.A, // Check against friendly
	collides: ig.Entity.COLLIDES.PASSIVE,
	health: 1,
	speed: 0,
	flip: true,
	animSheet: new ig.AnimationSheet( 'media/sprites/guardtowers.png', 64, 256 ),
	sfxDie: new ig.Sound( 'media/sounds/blob-die.*' ),
	playerRef: null,
	
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		this.addAnim( 'idle', 1, [0] );
		this.addAnim( 'die', 0.9, [1, 2] );
		this.timer = new ig.Timer(4);
		this.playerRef = ig.game.player;
	},
	
	kill: function() {
		if(this.health <= 0){
			this.currentAnim = this.anims.die;
		}
		if (this.currentAnim.frame == 1 && this.currentAnim == this.anims.die)
        {
           ig.game.spawnEntity(EntityBlob, this.pos.x, this.pos.y, {flip:this.flip, blobRef:this }); // Should fix y pos
           
           if (!ig.game.player.rageMode) {
			ig.game.player.gainRage(20);
			}
			
           this.parent();
        }	
	},
        
    update: function() {
    	
    	this.playerRef = ig.game.player;
    	
    	if(this.pos.x - this.playerRef.pos.x < 0) this.flip = false;
    	else this.flip = true;
    	
    	if (this.timer.delta() > 0 && this.distanceTo(ig.game.player) <= 600) {
			ig.game.spawnEntity(EntitySpear, this.pos.x, this.pos.y+40, {flip:this.flip, blobRef:this } );
    		this.timer.reset();
    	}
		this.kill();
		this.parent();
	},
	
	handleMovementTrace: function( res ) {
		this.parent( res );
	},
	
	check: function( other ) {
		//other.receiveDamage( 1, this );
	}
});

});
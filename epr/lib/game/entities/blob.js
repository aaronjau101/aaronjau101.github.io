ig.module(
	'game.entities.blob'
)
.requires(
	'impact.entity'

)
.defines(function(){
	
EntityBlob = ig.Entity.extend({
	size: {x: 64, y: 128},
	offset: {x:0, y: 0},
	maxVel: {x: 100, y: 100},
	friction: {x: 150, y: 0},
	enemyType: "cop",
	
	type: ig.Entity.TYPE.B, // Evil enemy group
	checkAgainst: ig.Entity.TYPE.A, // Check against friendly
	collides: ig.Entity.COLLIDES.PASSIVE,
	
	health: 1,
	dazed: false,
	dazedTimer: null,
	
	
	
	speed: 60,
	flip: false,
	
	animSheet: new ig.AnimationSheet( 'media/sprites/copanim.png', 64, 128 ),
	sfxDie: new ig.Sound( 'media/sounds/blob-die.mp3' ),
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		//this.addAnim( 'crawl', 1, [21] );
		this.addAnim( 'run', 0.2, [7,6,5,4,3,2,1.0] );
		//this.addAnim( 'runleft', 1, [0,1,2,3,4,5,6,7] );
		this.addAnim( 'die', 0.1, [8, 9, 10, 11] );
		
		this.timer = new ig.Timer(3);
	},
	
	kill: function() {
		
		if(this.health <= 0){
			this.currentAnim = this.anims.die;
		}
		
		if (/*this.currentAnim.frame == 1 &&*/ this.currentAnim == this.anims.die)
        {
           this.sfxDie.play();
           
		   ig.game.spawnEntity(EntityCoin, this.pos.x, this.pos.y + 60); // Should fix y pos
           
           if (!ig.game.player.rageMode) {
			ig.game.player.gainRage(20);
			}
           
           this.parent();
        }	
	},
	
	update: function() {
		//Near a edge, then flip
		if( !ig.game.collisionMap.getTile(
				this.pos.x + (this.flip ? +8 : this.size.x -8),
				this.pos.y + this.size.y+1
		) && this.standing
		) {
			this.flip = !this.flip;
			
			// We have to move the offset.x around a bit when going
			// in reverse direction, otherwise the blob's hitbox will
			// be at the tail end.
			//this.offset.x = this.flip ? 0 : 24;
		}
		
		var xdir = this.flip ? -1 : 1;
		this.vel.x = this.speed * xdir;
		this.currentAnim.flip.x = !this.flip;
		
		if (!this.dazed && this.timer.delta() > 0 && this.distanceTo(ig.game.player) <= 600) {
			ig.game.spawnEntity(EntityRound, (this.flip ? this.pos.x - 50 : this.pos.x + 40), this.pos.y+50, {flip:this.flip, blobRef:this } );
    		this.timer.reset();
    	}

		
		this.kill();
		
		//console.log(this.dazed);
		if(this.dazed == true){
			
			if (this.dazedTimer == null){
				this.dazedTimer = new ig.Timer(3);
				//this.dazedTimer.set(0);
			}
				
			if(this.dazedTimer.delta() < 0){
				this.daze();
			}
			else{
				this.dazed = false;
				this.dazedTimer.reset();
				this.dazedTimer == null;
				this.currentAnim.angle = 0;
			}
			
		}

		this.parent();
	},
	
	handleMovementTrace: function( res ) {
		this.parent( res );
		if( res.collision.x ){
			this.flip = !this.flip;
		}
	},
	
	daze: function( ) {
		this.currentAnim.angle -= Math.PI*4 * ig.system.tick;
	},
	
	check: function( other ) {
		//other.receiveDamage( 1, this );
	}
});

});
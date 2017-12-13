ig.module(
	'game.entities.winmessage'
)
.requires(
	'impact.entity'
)
.defines(function(){
	
EntityWinmessage = ig.Entity.extend({
	size: {x: 948, y: 152},
	offset: {x:0, y: 0},
	maxVel: {x: 100, y: 0},
	friction: {x: 150, y: 0},
	enemyType: "winmessage",
	
	type: ig.Entity.TYPE.B,
	checkAgainst: ig.Entity.TYPE.A,
	collides: ig.Entity.COLLIDES.PASSIVE,
	
	health: 1,

	animSheet: new ig.AnimationSheet( 'media/sprites/winmessage.png', 948, 152 ),
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );

		//this.size.x = ig.system.width;
		//this.size.y = ig.system.height;
		this.addAnim( 'idle', 1, [0]);
	},
	
	kill: function() {
		this.parent();
	},
	
	update: function() {
		this.parent();
	},
	
	handleMovementTrace: function( res ) {
		this.parent( res );
	},
	check: function( other ) {
		return;
	}
});

});


ig.module( 'game.levels.levelselect3' )
.requires( 'impact.image','game.entities.player','game.entities.trigger','game.entities.levelchange' )
.defines(function(){
LevelLevelselect3=/*JSON[*/{"entities":[{"type":"EntityPlayer","x":1100,"y":1044},{"type":"EntityTrigger","x":1264,"y":1012,"settings":{"size":{"x":68,"y":108},"target":{"1":"exit3"}}},{"type":"EntityTrigger","x":560,"y":1012,"settings":{"size":{"x":68,"y":108},"target":{"1":"exit1"}}},{"type":"EntityTrigger","x":912,"y":1012,"settings":{"size":{"x":68,"y":108},"target":{"1":"exit2"}}},{"type":"EntityLevelchange","x":1100,"y":896,"settings":{"name":"exit3","level":"cave"}},{"type":"EntityLevelchange","x":392,"y":932,"settings":{"name":"exit1","level":"startertwo"}},{"type":"EntityLevelchange","x":724,"y":928,"settings":{"name":"exit2","level":"starter"}}],"layer":[{"name":"collision","width":20,"height":20,"linkWithCollision":false,"visible":1,"tilesetName":"","repeat":false,"preRender":false,"distance":1,"tilesize":70,"foreground":false,"data":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]},{"name":"main","width":20,"height":20,"linkWithCollision":false,"visible":1,"tilesetName":"media/tilesets/tiles-70.png","repeat":false,"preRender":false,"distance":"1","tilesize":70,"foreground":false,"data":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[155,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,155],[155,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,155],[155,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,155],[155,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,155],[155,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,155],[155,0,0,0,0,0,0,0,63,0,0,0,0,77,0,0,0,0,105,155],[155,0,0,153,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,155],[155,0,0,153,0,0,0,0,80,0,153,0,0,80,0,0,0,0,80,155],[155,0,0,153,0,0,0,0,94,0,153,0,0,94,0,0,0,0,94,155],[120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120],[177,177,177,177,177,177,177,177,177,177,177,177,177,177,177,177,177,177,177,177],[177,177,177,177,177,177,177,177,177,177,177,177,177,177,177,177,177,177,177,177],[177,177,177,177,177,177,177,177,177,177,177,177,177,177,177,177,177,177,177,177]]}]}/*]JSON*/;
LevelLevelselect3Resources=[new ig.Image('media/tilesets/tiles-70.png')];
});
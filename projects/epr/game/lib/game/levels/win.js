ig.module( 'game.levels.win' )
.requires( 'impact.image','game.entities.player','game.entities.trigger','game.entities.hurt','game.entities.winmessage' )
.defines(function(){
LevelWin=/*JSON[*/{"entities":[{"type":"EntityPlayer","x":1012,"y":984},{"type":"EntityTrigger","x":-768,"y":1364,"settings":{"size":{"x":1264,"y":32},"target":{"1":"hurt100"},"wait":0}},{"type":"EntityTrigger","x":1612,"y":1364,"settings":{"size":{"x":1596,"y":32},"target":{"1":"hurt100"},"wait":0}},{"type":"EntityHurt","x":1044,"y":1596,"settings":{"name":"hurt100","damage":100}},{"type":"EntityWinmessage","x":568,"y":532}],"layer":[{"name":"terrain","width":30,"height":20,"linkWithCollision":false,"visible":1,"tilesetName":"media/tilesets/tiles-70.png","repeat":false,"preRender":false,"distance":"1","tilesize":70,"foreground":false,"data":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,11676,0,0,11676,11676,11676,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,11676,11676,11676,0,13281,13281,13281,13281,13281,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,13281,13281,13281,13281,13281,13281,13281,13281,13281,13281,13281,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[13281,13281,13281,13281,13281,13281,13281,13281,13281,13281,13281,13281,13281,0,0,0,0,11676,0,0,0,0,0,0,0,0,0,0,0,0],[13281,13281,13281,13281,13281,13281,13281,13281,13281,13281,13281,13281,13281,13281,13281,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,13281,13281,13281,13281,13281,13281,13281,13281,13281,13281,13281,13281,13281,13281,13281,13281,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,13281,13281,13281,13281,13281,13281,13281,155,155,155,169,155,155,169,155,155,155,0,0,0,0,0,0,0,0,0,0],[0,0,13281,13281,13281,13281,17,3,170,13281,155,169,155,155,155,155,155,155,169,155,0,17,3,170,0,0,0,0,0,0],[0,0,0,0,0,13281,13281,13281,13281,13281,155,155,169,155,155,169,169,155,155,169,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,83,83,83,83,83,83,83,83,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,17,3,170,0,0,0,0,0,0,0,0,0,0,0,0,17,3,170,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,97,55,55,0,17,3,3,3,3,170,97,55,55,55,0,0,0,0,0,0,0,0],[0,0,0,0,0,97,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,97,87,86,86,86,86,86,86,86,86,86,86,86,86,86,86,86,86,59,0,0,0,0,0,0],[0,0,0,0,0,97,97,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,0,0,0,0,0,0,0],[0,0,0,0,0,97,97,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,0,0,0,0,0,0,0],[0,0,0,0,0,97,97,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,0,0,0,0,0,0,0],[161,161,161,161,161,161,161,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,161,161,161,161,161,161,161]]},{"name":"collision","width":30,"height":20,"linkWithCollision":false,"visible":1,"tilesetName":"","repeat":false,"preRender":false,"distance":1,"tilesize":70,"foreground":false,"data":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,12,12,12,0,1,0,0,0,0,0,0,0,0,1,0,12,12,12,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,48,48,48,48,48,48,48,48,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,12,12,12,0,0,0,0,0,0,0,0,48,48,0,0,12,12,12,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,48,48,0,12,12,12,12,12,12,48,48,48,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0],[0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0]]}]}/*]JSON*/;
LevelWinResources=[new ig.Image('media/tilesets/tiles-70.png')];
});
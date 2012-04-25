var bullets = new Array();
var bulletscount = 1;
//root.append('<div id="debug"></div>');
//var debug=$("#debug");
//debug.html("123");
function shutting(tank)
{
	this_id = "bullet-"+bulletscount;
	bulletscount+=1;
	root.append('<div class="bullet" id="'+this_id+'"></div>');
	var self=$("#"+this_id);
	self.id=this_id;
	self.x=tank.h*B_HEIGHT+17;
	self.y=tank.v*B_WIDTH+17;
	self.css("position","absolute").offset(
		 	{top:offset0.top + self.x,
			 left:offset0.left + self.y,});
	self.width("9").height("9");
	self.d=tank.d;
	bullets.push(self);
	move_bullet(self);
	return self;
}
function move_bullet(self)
{
//	var self=$("#"+bulletid);
	self.x+=dx[self.d];
	self.y+=dy[self.d];
	self.css("position","absolute").offset(
		 	{top:offset0.top + self.x,
			 left:offset0.left + self.y,});
	if (self.x<0||self.x>SIZE_H*B_HEIGHT||self.y<0||self.y>SIZE_W*B_WIDTH)
	{
		$("#"+self.id).remove();
	}
	else
	{
		var t=setTimeout(move_bullet,5,self);
	}
}

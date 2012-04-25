B_WIDTH = 40
B_HEIGHT = 40

var root;
var debug;
var blocks = new Array();
var tanks = new Array();
var dx = new Array(0,-1,0,1);
var dy = new Array(-1,0,1,0);
bom = new Array()

$(document).ready(function(){
    root = $("#paper");
    draw_block(15,10);
    add_tank(0,0,"red");
    add_tank(5,5,"blue");
/*
    keycode   37 = Left
	keycode   38 = Up
	keycode   39 = Right
	keycode   40 = Down*/
    add_action("37",function(){move(tanks[0],0)});
    add_action("38",function(){move(tanks[0],1)});
    add_action("39",function(){move(tanks[0],2)});
    add_action("40",function(){move(tanks[0],3)});
    add_action("32",function(){shutting(tanks[0])});
    
    add_action("65",function(){move(tanks[1],0)});
    add_action("87",function(){move(tanks[1],1)});
    add_action("68",function(){move(tanks[1],2)});
    add_action("83",function(){move(tanks[1],3)});
    add_action("13",function(){shutting(tanks[1])});

})

function draw_block(num_h,num_v){
    var i,j;
    root.width(num_h*B_WIDTH).height(num_v*B_HEIGHT);
    root.offset({"top":(window.innerHeight-num_v*B_HEIGHT)/2,
                "left":(window.innerWidth-num_h*B_WIDTH)/2});
    offset0 = $("#paper").offset();
    for(i=0;i<num_v;++i){
        blocks[i] = new Array();
        for(j=0;j<num_h;++j){
            this_id = 'b-'+i+'-'+j
            root.append('<div class="block" id="'+this_id+'"></div>')
            blocks[i][j] = $("#"+this_id);
            blocks[i][j].css("position","absolute").offset({
                top:offset0.top + i*B_HEIGHT,
                left:offset0.left+j*B_WIDTH,
            });
            blocks[i][j].width(B_WIDTH).height(B_HEIGHT);
        }
    }
}

function add_tank(i,j,col){
    this_id = "t-"+tanks.length;
    root.append('<div class="tank" id="'+this_id+'"></div>');
    $("#"+this_id+".tank").css("background-color",col);

    root.append('<div class="gun" id="'+this_id+'"></div>');
    var self =$("#"+this_id+".tank");
    self.gun=$("#"+this_id+".gun");
    self.gun.css("position","absolute").offset(
			{top:offset0.top + i*B_HEIGHT +15,
			 left:offset0.left + j*B_WIDTH +15, });
	self.gun.width("3").height("30");
    self.h = i;
    self.v = j;
    self.d = 1;
    updata(self);
    self.width(B_WIDTH).height(B_HEIGHT);
    tanks.push(self);
    return self;
}

function updata(tank){
    tank.offset(blocks[tank.h][tank.v].offset());
    var xby=15;
	if (tank.d==1)xby=xby-30;
	var yby=15;
	if (tank.d==0)yby=yby-30;
    tank.gun.css("position","absolute").offset(
			{top:offset0.top + tank.h*B_HEIGHT + xby,
			 left:offset0.left + tank.v*B_WIDTH + yby, });
	if (tank.d==0||tank.d==2)
		tank.gun.width("30").height("3");
	if (tank.d==1||tank.d==3)
		tank.gun.width("3").height("30");
}

function move(tank,dir){
	var h=dx[dir];
	var v=dy[dir];
	var th,tv;
    if((tank.h+h<blocks.length)&&(tank.h+h>=0))
        th = tank.h + h;
	else 
		th = tank.h;
    if((tank.v+v<blocks[tank.h].length)&&(tank.v+v>=0))
        tv = tank.v + v;
	else
		tv = tank.v;
	for (t in tanks)
	{
		if (tanks[t].h == th && tanks[t].v == tv )
		{
			th = tank.h;
			tv = tank.v;
		}
	}
	tank.h = th;
	tank.v = tv;
    tank.d = dir;
    updata(tank);
}

function cmd(){
    eval(prompt())
}
add_action("C+36",cmd);

B_WIDTH = 40
B_HEIGHT = 40

var root;
var blocks = new Array();
var tanks = new Array();

bom = new Array()

$(document).ready(function(){
    root = $("#paper");
    draw_block(15,10);
    add_tank(0,0,"red");
    add_tank(5,5,"blue");
    add_action("39",function(){move(tanks[0],0,1)});
    add_action("37",function(){move(tanks[0],0,-1)});
    add_action("38",function(){move(tanks[0],-1,0)});
    add_action("40",function(){move(tanks[0],1,0)});
    
    add_action("68",function(){move(tanks[1],0,1)});
    add_action("65",function(){move(tanks[1],0,-1)});
    add_action("87",function(){move(tanks[1],-1,0)});
    add_action("83",function(){move(tanks[1],1,0)});

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
    $("#"+this_id).css("background-color",col);
    var self = $("#"+this_id);
    self.h = i;
    self.v = j;
    updata(self);
    self.width(B_WIDTH).height(B_HEIGHT);
    tanks.push(self);
    return self;
}

function updata(tank){
    tank.offset(blocks[tank.h][tank.v].offset());
}

function move(tank,h,v){
    if((tank.h+h<blocks.length)&&(tank.h+h>=0))
        tank.h += h;
    if((tank.v+v<blocks[tank.h].length)&&(tank.v+v>=0))
        tank.v += v;
    updata(tank);
}

function cmd(){
    eval(prompt())
}
add_action("C+36",cmd);

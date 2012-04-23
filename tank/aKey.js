_action = new Object();
_aid = 0;

document.onkeydown = function(event){
    var keycode = event.keyCode;
    if(event.ctrlKey==1)
        keycode = "C+"+keycode;
    if(typeof(_action[keycode])!="undefined")
        action(keycode);
};

document.onkeyup = function(event){
    var keycode = "U+"+event.keyCode;
    if(typeof(_action[keycode])!="undefined")
        action(keycode);
}

function add_action(keycode,fun){
    if(!_action[keycode])
        _action[keycode] = new Object();
    _action[keycode][++_aid] = fun;
    return _aid;
}

function rm_action(keycode,aid){
    delete _action[keycode][aid];
}

function action(keycode){
    for(ac in _action[keycode])
        _action[keycode][ac]();
}
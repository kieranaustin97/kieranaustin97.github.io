function allowDrop(ev) {
    ev.preventDefault();
}
  
function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}
  
function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}

//Set size of HTML grid
window.onload = function(){
    var box_width = (window.innerWidth - 40)/15;
    var box_height = (window.innerHeight - 100)/13;
    var columnWidthString = ""
    var columnHeightString = ""

    for (let i = 0; i < 15; i++) {
            columnWidthString += box_width-7.5 + "px "
        }
        
    for (let i = 0; i < 13; i++) {
        columnHeightString += box_height + "px "
    }

    document.getElementById("drawnGrid").style.gridTemplateColumns = columnWidthString;
    document.getElementById("drawnGrid").style.gridTemplateRows = columnHeightString;
    
};

//Draw HTML Grid
const gridDrawing = document.getElementById("drawnGrid");

let htmlString = "";
for (let i = 0; i < 195; i++) {
    htmlString += '<div id=gridBox' + i + ' ondrop="drop(event)" ondragover="allowDrop(event)" class="grid-item"></div>'
}
gridDrawing.innerHTML = htmlString;

//Create End Zone
for (let i = 0; i <=14; i++) {
    document.getElementById('gridBox' + i).className += (" end-zone");
    document.getElementById('gridBox' + (194-i)).className += (" scrimmage-line");
};
//Create Pitch Lines
for (let i = 15; i < 195; i += 15) {
    document.getElementById('gridBox' + i).className += (" left-border");
    document.getElementById('gridBox' + (i + 14)).className += (" right-border");
    document.getElementById('gridBox' + (i + 3)).className += (" right-border");
    document.getElementById('gridBox' + (i + 4)).className += (" left-border");
    document.getElementById('gridBox' + (i + 10)).className += (" right-border");
    document.getElementById('gridBox' + (i + 11)).className += (" left-border");
};

//Team lists
var crocodile_dict = {
    "KX": "Kroxigor",
    "SB": "Saurus Blocker",
    "SK": "Skink",
    "CS": "Chameleon Skink"
  };
var orc_dict = {
    "UT": "Untrained Troll",
    "GB": "Goblin",
    "BU": "Big Un",
    "BL": "Blitzer",
    "TH": "Thrower",
    "LM": "Linemen",
};

function change_team(race_dict) {

    document.getElementById("bench").innerHTML=""

    for (const [key, value] of Object.entries(race_dict)) {
        var button = document.createElement('button');
        var text = document.createTextNode(value);
        button.appendChild(text);
        button.onclick = function() {new_player(key)};
        document.getElementById("bench").appendChild(button);
    };
};

//Create new players
var playerCounter = 1;

function new_player(player_type) {
    var img = document.createElement('img');
    img.id = "drag" + playerCounter;
    playerCounter = playerCounter + 1;
    img.src = player_type+".svg";

    img.draggable = true;
    img.setAttribute('ondragstart', 'drag(event)');
    img.width = "75";
    img.height = "75";
    document.getElementById("bench").appendChild(img);
};
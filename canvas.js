function allowDrop(ev) {
    ev.preventDefault();
}
  
function drag(ev) {
    ev.dataTransfer.setData("playerID", ev.target.id);
}
  
function drop(ev) {
    ev.preventDefault();
    var ID = ev.dataTransfer.getData("playerID");
    ev.target.appendChild(document.getElementById(ID));
}

const box_width = (window.innerWidth - 40)/15;
const box_height = (window.innerHeight - 100)/13;

//Set size of HTML grid
window.onload = function(){
    var columnWidthString = "";
    var columnHeightString = "";

    for (let i = 0; i < 15; i++) {
            columnWidthString += box_width-7.5 + "px "
        }
        
    for (let i = 0; i < 13; i++) {
        columnHeightString += box_height + "px "
    }

    document.getElementById("drawnGrid").style.gridTemplateColumns = columnWidthString;
    document.getElementById("drawnGrid").style.gridTemplateRows = columnHeightString;

    var benchWidthString = "";

    for (let i = 0; i < 11; i++) {
        benchWidthString += box_width + "px "
    }
    
    document.getElementById("drawnBench").style.gridTemplateColumns = benchWidthString;
    document.getElementById("drawnBench").style.gridTemplateRows = box_height + "px ";
};

//Draw HTML Grid
const gridDrawing = document.getElementById("drawnGrid");

let gridHtmlString = "";
for (let i = 0; i < 195; i++) {
    gridHtmlString += '<div id=gridBox' + i + ' ondrop="drop(event)" ondragover="allowDrop(event)" class="grid-item"></div>'
}
gridDrawing.innerHTML = gridHtmlString;

//Create End Zone
for (let i = 0; i <=14; i++) {
    document.getElementById('gridBox' + (194-i)).className += (" end-zone");
    document.getElementById('gridBox' + i).className += (" scrimmage-line");
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

//Draw Bench
const benchDrawing = document.getElementById("drawnBench");

//Create Bench
let benchHtmlString = "";
for (let i = 0; i < 11; i++) {
    benchHtmlString += '<div id=benchBox' + i + ' class="grid-item"></div>'
}
benchDrawing.innerHTML = benchHtmlString;

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
var rat_dict = {
    "RO": "Rat Ogre",
    "GR": "Gutter Runner",
    "BL": "Blitzer",
    "TH": "Thrower",
    "LM": "Linemen",
};

function change_team(race_dict) {

    document.getElementById("bench").innerHTML=""
    document.getElementById("playerButtons").innerHTML=""

    for (const [key, value] of Object.entries(race_dict)) {
        var button = document.createElement('button');
        var text = document.createTextNode(value);
        button.appendChild(text);
        button.onclick = function() {new_player(key)};
        document.getElementById("playerButtons").appendChild(button);
    };
};

//Create new players
var playerCounter = 0;

function new_player(player_type) {
    if (playerCounter < 11) {
        const outerDiv = document.createElement("div");
        outerDiv.setAttribute('class','player-icon')
        outerDiv.draggable = true;
        outerDiv.id = "drag" + playerCounter;
        outerDiv.setAttribute('ondragstart', 'drag(event)');

        const playerText = document.createElement("div");
        playerText.setAttribute('class','text-block circleBase type1')
        playerText.setAttribute('style', 'height:' + (box_height-2) + "px; width:" + (box_height-2) + "px;")
        const text = document.createElement('h1')
        text.innerHTML = player_type
        playerText.appendChild(text);
        outerDiv.appendChild(playerText);

        document.getElementById("benchBox" + (playerCounter)).appendChild(outerDiv);
        playerCounter = playerCounter + 1;
    }
    else {
        console.log("No more space for players on pitch")
    }

};
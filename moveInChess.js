"use strict"

// Création image de fond + div container
document.body.style.backgroundImage = "url(img/chess.jpg)";
document.body.style.backgroundSize = 'cover';

let divContainer = document.createElement('div');
divContainer.id = 'container';
divContainer.style.width = '630px';
divContainer.style.backgroundColor = 'white';
divContainer.style.margin = '0px auto';
divContainer.style.textAlign = 'center';
document.body.appendChild(divContainer);

// Choix piéce 
let selectText = document.createElement('h3');
selectText.textContent ='Pièce au choix : ';
selectText.style.display = 'inline';
divContainer.appendChild(selectText);

let select = document.createElement('select');
select.id = 'pieces';
select.style.marginTop = '15px';
select.style.marginBottom = '15px';
divContainer.appendChild(select);

let option1 = document.createElement('option');
option1.value = 'pion';
option1.textContent = 'pion';
select.appendChild(option1);

let option2 = document.createElement('option');
option2.value = 'fou';
option2.textContent = 'fou';
select.appendChild(option2);

let option3 = document.createElement('option');
option3.value = 'tour';
option3.textContent = 'tour';
select.appendChild(option3);

let option4 = document.createElement('option');
option4.value = 'cavalier';
option4.textContent = 'cavalier';
select.appendChild(option4);

let option5 = document.createElement('option');
option5.value = 'reine';
option5.textContent = 'reine';
select.appendChild(option5);

let option6 = document.createElement('option');
option6.value = 'roi';
option6.textContent = 'roi';
select.appendChild(option6);

// Choix coordonées X Y
let div = document.createElement('div');
divContainer.appendChild(div);

selectText = document.createElement('h3');
selectText.textContent ='Coordonnées de départ : ';
selectText.style.display = 'inline';
div.appendChild(selectText);

let YStart = 4;
let regle1 = document.createElement('input');
regle1.type = 'range';
regle1.id = 'regle1'
regle1.min = '1';
regle1.max = '8';
regle1.step = '1';
regle1.style.width = '140px';
regle1.value = YStart;
div.appendChild(regle1);

let XStart = 4;
let regle2 = document.createElement('input');
regle2.type = 'range';
regle2.id = 'regle2';
regle2.min = '1';
regle2.max = '8';
regle2.step = '1';
regle2.style.width = '140px';
regle2.value = XStart;
div.appendChild(regle2);

selectText = document.createElement('h3');
selectText.id = 'showXY';
selectText.textContent =` X= ${regle2.value}, Y= ${regle1.value}`;
selectText.style.display = 'inline';
div.appendChild(selectText);

// Affichage coordonnees X Y

function showXY(){
    console.log(regle2.value,regle1.value);
    document.getElementById('showXY').textContent = ` X= ${regle1.value}, Y= ${regle2.value}`;
}

document.getElementById('regle2').addEventListener('click', () => {
    return showXY();  
});

document.getElementById('regle1').addEventListener('click', () => {
    return showXY();  
});

// Bouton validation pièce + position

let validBtn = document.createElement('button');
validBtn.textContent ='Valider la pièce et sa position';
validBtn.id = 'start';
validBtn.style.marginTop = '15px';
validBtn.style.marginBottom = '5px';
divContainer.appendChild(validBtn);

// Bouton montre les mouvements possibles pour une pièce

let moveBtn = document.createElement('button');
moveBtn.textContent ='Afficher les déplacements possibles';
moveBtn.id = 'move';
moveBtn.style.marginLeft = '15px';
divContainer.appendChild(moveBtn);

// ligne séparation choix - échiquier
let hr = document.createElement('hr');
hr.style.marginBottom = '10px';
divContainer.appendChild(hr);


// Affichage échiquier
let table;

function drawChess(){
    table = document.createElement('table');
    table.id = 'chessTable';
    divContainer.appendChild(table);

    for(let j=8; j>-1; j--){
        let tr = document.createElement('tr');
        table.appendChild(tr);
        for(let i=0; i<9; i++){
            let td = document.createElement('td');
            td.width = '62px';
            td.height = '62px';
            td.style.border = '2px solid black';
            td.id = `${j}${i}`;
            td.title = `${j}${i}`;
            td.style.textAlign = 'center';
            td.style.fontSize = '20px';
            if(j%2 !== 0 && i%2 !== 0 || j%2 === 0 && i%2 === 0 && j !== 0 && i!== 0){
                td.style.backgroundColor = 'black';
            }
            tr.appendChild(td);
        }
    }

    // Affichage numérotation 1-8 suivant X, puis Y
    for(let i=1; i<9; i++){
        document.getElementById(`0${i}`).textContent = `${i}`;
    }
    for(let i=1; i<9; i++){
        document.getElementById(`${i}0`).textContent = `${i}`;
    }
}

drawChess();

// Affichage initial piece

let tdImgPiece = document.getElementById('44');
let imgPiece = document.createElement('img');
imgPiece.src = 'img/pion.jpg';
tdImgPiece.appendChild(imgPiece);

// Affichage pièce choisie à la position choisie

let selectedPiece;
let posPieceX;
let posPieceY;
let greenCases;
let greenTd;

function piecePos(){
    // nettoyage de l'échiquier
    table = document.getElementById('chessTable');
    divContainer.removeChild(table);
    drawChess();
    greenCases = [];
    // mise en place image pièce
    selectedPiece = select.value;
    posPieceX = parseInt(regle2.value);
    posPieceY = parseInt(regle1.value);
    tdImgPiece = document.getElementById(`${posPieceX}${posPieceY}`);
    imgPiece.src = `img/${selectedPiece}.jpg`;
    tdImgPiece.appendChild(imgPiece);
    console.log(`${selectedPiece},${posPieceX},${posPieceY}`);
}

// Affichage en vert des deplacements

function movePiece(){
    for(let greenCase of greenCases){
        // controle on ne sort pas de l'échiquier pour cases vertes
        if(greenCase[0]> 0 && greenCase[0]< 9 && greenCase[1]< 9 && greenCase[1]> 0 && greenCases !== []){
            greenTd = document.getElementById(`${greenCase[0]}${greenCase[1]}`);
            greenTd.style.backgroundColor = 'green';
        }
        
    }   
}

// deplacements tour
function moveTour(){
    for(let i=1; i<9; i++){
        if(i !== posPieceX){
            greenCases.push([i,posPieceY]);
        }
    }
    for(let j=1; j<9; j++){
        if(j !== posPieceY){
            greenCases.push([posPieceX,j]);
        }
    }
}

// deplacements fou
function moveFou(){
    let k= posPieceX-1;
    let m= posPieceY-1;
    let n= posPieceY+1;
    for(k; k>-7; k--){
        greenCases.push([k,m]);
        m--;
        greenCases.push([k,n]);
        n++;
    }
    let l= posPieceX+1;
    m= posPieceY-1;
    n= posPieceY+1;  
    for(l; l<9; l++){
        greenCases.push([l,m]);
        m--;
        greenCases.push([l,n]);
        n++;         
    }
}

//
// Actions lors clic bouttons
//

// Boutton "validation piece et position"
document.getElementById('start').addEventListener('click', () => {
    piecePos();
    
});

// Boutton "déplacements possibles"
document.getElementById('move').addEventListener('click', () => {
    switch(selectedPiece){
        case 'pion':
            greenCases.push([posPieceX+1,posPieceY]);
            break;
        case 'roi':
            greenCases.push([posPieceX-1,posPieceY-1]);
            greenCases.push([posPieceX,posPieceY-1]);
            greenCases.push([posPieceX+1,posPieceY-1]);
            greenCases.push([posPieceX-1,posPieceY]);
            greenCases.push([posPieceX+1,posPieceY]);
            greenCases.push([posPieceX-1,posPieceY+1]);
            greenCases.push([posPieceX,posPieceY+1]);
            greenCases.push([posPieceX+1,posPieceY+1]);
            break;
        case 'tour':
            moveTour();
            break;
        case 'fou':
            moveFou();
            break;
        case 'reine':
            moveTour();
            moveFou();
            break;
        case 'cavalier':
            greenCases.push([posPieceX-2,posPieceY+1]);
            greenCases.push([posPieceX-1,posPieceY+2]);
            greenCases.push([posPieceX+1,posPieceY+2]);
            greenCases.push([posPieceX+2,posPieceY+1]);
            greenCases.push([posPieceX+2,posPieceY-1]);
            greenCases.push([posPieceX+1,posPieceY-2]);
            greenCases.push([posPieceX-1,posPieceY-2]);
            greenCases.push([posPieceX-2,posPieceY-1]);
            break;
        default:
            console.log('désolé, pas possible');
    }
    
    console.log(selectedPiece);
    console.log(greenCases);
    movePiece();
    
});
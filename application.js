
// DIE

function Die() {
  this.value = 0,
  this.sides = 6
};

Die.prototype.roll = function(){
  var newValue = Math.floor(Math.random() * 6) + 1;
  this.value = newValue;
};

// BOARD 

function Board() {
  this.bag = [];
};

Board.prototype.addDie = function() {
  this.bag.push(new Die);
  $('.dice').append('<div class="die">0</div>');
};

// make method called render bag 

Board.prototype.rollAll = function(){
  // console.log(this.bag); 
  $(this.bag).each(function(index,element) {
    this.roll();
  });
};

Board.prototype.renderAll = function(){
  var self = this;
  $('.die').each(function(index){ 
    // bag is an array, treat it like one
    $(this).text(self.bag[index].value);
  });
};

// function renderDie(){
//   $('.dice').append('<div class="die">0</div>');
// }

// function rollDie(die){
//   console.log('derp')
// }

// function rollAll(){
//   // $.each()
//   console.log('hello')
// }

$(document).ready(function() {

  // initialize board
  var diceBoard = new Board;
  
  diceBoard.rollAll();
  $('#roller button.add').on('click', function() {
    diceBoard.addDie();
  });

  $('#roller button.roll').on('click', function() {
    diceBoard.rollAll();
    diceBoard.renderAll();

  });
});


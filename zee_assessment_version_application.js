
// DIE

function Die() {
  this.value = 0;
  this.sides = 6;
}

Die.prototype.roll = function(){
  var self = this;
  $.get('/roll', function(value) {
    self.value = value;
    $(self).trigger('changed');
  });
};

function Board() {
  this.bag = [];
}

Board.prototype.addDie = function() {
  var die = new Die();
  this.bag.push(die);
  $(this).trigger('added', die);
};

// make method called render bag 

Board.prototype.rollAll = function(){
  this.bag.forEach(function(die) {
    die.roll();
  });
};

function View(selector, model) {
  this.element = $(selector);
  this.model = model;
}

View.prototype.append = function(view) {
  this.element.append(view.element);
};

View.prototype.setText = function(text) {
  this.element.text(text);
};


function DieView(model) {
  View.call(this, '<div class="die">0</div>', model);

  var self = this;
  $(model).on('changed', function() {
    self.render();
  });
}

DieView.prototype = Object.create(View.prototype);

DieView.prototype.render = function() {
  this.setText(this.model.value);
};

function BoardView(selector, collection) {
  View.call(this, selector, collection);
  var self = this;
  $(this.model).on('added', function(e, die) {
    self.append(new DieView(die));
  });
}

BoardView.prototype = Object.create(View.prototype);
// BOARD 



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


function GameView() {
  // This is like super, kinda. BUT NOT REALLY
  View.call(this, '#roller');

  var diceBoard = new Board;
  new BoardView('.dice', diceBoard);
  
  diceBoard.rollAll();

  this.element.on('click', '.add', function() {
    diceBoard.addDie();
  });
  this.element.on('click', '.roll', function() {
    diceBoard.rollAll();
  });
}

$(document).ready(function() {
  new GameView();
});


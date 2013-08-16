$(document).ready(function() {


  // --- MODEL
  // classname = constructor
  Die = function(opts) {
    opts = opts || {sides: 6};
    this.sides = opts.sides;
    this.value = opts.sides;
    this.view  = $('<div class="die">'+ this.value +'</div>');
  }

  // class.prototype.methodname = function
  Die.prototype.roll = function(){
    this.value = Math.floor((Math.random()*this.sides)+1);
  }

  Die.prototype.render = function(container){
    this.view.text(this.value);
    container.append(this.view);
  }

  // ---- Dice fucntions

  Die.allDice = [];

  Die.addDie = function(numberOfDice){
    numberOfDice = numberOfDice || 1;
    for (numberOfDice; numberOfDice > 0; numberOfDice--) {
      Die.allDice.push(new Die({sides: 6}));  
    }
  }

  Die.rollAll = function() {
    for (var i = 0; i < Die.allDice.length; i++){
      Die.allDice[i].roll();  
    }
  };

  // View
  Die.renderAll = function(){
    for (var i = 0; i < Die.allDice.length; i++){
      // console.log(Die.allDice[i].value)
      Die.allDice[i].render($('.dice'));
    }
  }

  // Controller
  $('#roller button.add').on('click', function(){
    Die.addDie();
    Die.renderAll();
  });

  $('#roller button.roll').on('click', function(){
    Die.rollAll();
    Die.renderAll();
  });

});

  

});

// 

  // $('#roller button.add').on('click', function() {
  //   console.log("WAT")
  //   $('.dice').append('<div class="die">0</div>');
  // });

  // $('#roller button.roll').on('click', function() {
  //   $('.die').each(function(k, die) {
  //     var value = Math.floor((Math.random()*6)+1);
  //     $(die).text(value);
  //   });
  // });













// $(document).ready(function() {
//   $('#roller button.add').on('click', function() {
//     console.log("WAT")
//     $('.dice').append('<div class="die">0</div>');
//   });

//   $('#roller button.roll').on('click', function() {
//     $('.die').each(function(k, die) {
//       var value = Math.floor((Math.random()*6)+1);
//       $(die).text(value);
//     });
//   });
// });

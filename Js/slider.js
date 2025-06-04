  //Portfolio slider

  //Declarando variaveis do slider

  var sliderContainer = document.querySelector('.jl-slider-container');
  var sliderList = document.querySelector('.jl-slider-list');
  var sliderItem = document.querySelectorAll('.jl-portfolio-item');
  var sliderTotalItems = sliderItem.length;
  var sliderListWidth = 0;
  var prevItem = document.querySelector('.jl-item-prev');
  var nextItem = document.querySelector('.jl-item-next');
  var sliderPos = 0;
  var currentSlider = document.querySelector('.jl-current-slider');
  var totalSlider = document.querySelector('.jl-total-slider');
  var currentCounter = 1;
  var navItems = document.querySelectorAll('.jl-item-navigator a');
  var navCounter = document.querySelector('.jl-navigator-counter span');
  var liItems = document.querySelectorAll('.jl-slider-list li');

  

  //Capturando larguras individuais

  var containerWidth = sliderContainer.parentElement.offsetWidth;
  
  //Passando larguras dinamicas

  sliderContainer.style.width = containerWidth +'px';
  for(var p = 0; p < sliderItem.length; p++){
    sliderItem[p].style.width = containerWidth +'px';

    var sliderItemWidth = sliderItem[p].offsetWidth;

    sliderListWidth += sliderItemWidth;
  }

  sliderList.style.width = sliderListWidth + 'px';

  //Fazendo animação do slider onclick

  //Handlers

  //Next slider animação
  var nextSliderAnim = function (){
    var lastItem = sliderListWidth - containerWidth;

    if ((-1 * (sliderPos) === lastItem)) {
      return;
    }

    sliderPos -= containerWidth;

    anime({
      targets: sliderList,
      translateX: sliderPos,
      easing: 'cubicBezier(0,1.01,.32,1)'
    });
  }
  //Prev slider animação
  var prevSliderAnim = function (){
    if (sliderPos === 0) {
        return;
      }
    
      sliderPos += containerWidth;
    
      anime({
        targets: sliderList,
        translateX: sliderPos,
        easing: 'cubicBezier(0,1.01,.32,1)'
      });
  }

  // Atualizando o contador de slides
var atualizarContador = function () {
  currentSlider.innerHTML = String(currentCounter).padStart(2, '0');
  navCounter.innerHTML = String(currentCounter).padStart(2, '0');
};

  //CounterAdd

  // CounterAdd (Incrementa o contador)
var counterAdd = function () {
  if (currentCounter < sliderTotalItems) {
    currentCounter++;
    atualizarContador();
  }
};

  // CounterRemove (Decrementa o contador)
var counterRemove = function () {
  if (currentCounter > 1) {
    currentCounter--;
    atualizarContador();
  }
};

//SET Active nav

// Capturando os itens do navegador

// Função para atualizar o navegador de itens
var atualizarNavigator = function () {
  // Remove a classe ativa de todos os itens
  navItems.forEach(function (item) {
    item.classList.remove('jl-item-active');
    anime({
      targets: item, // Aplica animação apenas no item individualmente
      width: 20,
      duration: 300,
      easing: 'easeInOutQuad'
    });
  });

  
  // Adiciona a classe ativa ao item correspondente ao slide atual
  var newActiveItem = navItems[currentCounter - 1]; 
  newActiveItem.classList.add('jl-item-active');

  anime({
    targets: newActiveItem, // Aplica animação apenas no item individualmente
      width: 90,
      duration: 300,
      easing: 'easeInOutQuad'
  });

};

//SET Active Slide
var setActiveSlide = function () {
  // Remove a classe ativa de todos os itens
  liItems.forEach(function (item) {
    item.classList.remove('jl-slide-active');
    item.querySelector('.jl-portfolio-item-box').classList.remove('jl-scale-right');
    item.querySelector('.jl-portfolio-item-thumb img').classList.remove('jl-scale-up');
    
    
  });

  
  // Adiciona a classe ativa ao item correspondente ao slide atual
 var newActiveSlide = liItems[currentCounter - 1];
 

  newActiveSlide.classList.add('jl-slide-active');
  newActiveSlide.querySelector('.jl-portfolio-item-box').classList.add('jl-scale-right');
  newActiveSlide.querySelector('.jl-portfolio-item-thumb img').classList.add('jl-scale-up');
  

};

  //Actions
totalSlider.innerHTML = String(sliderTotalItems).padStart(2, '0');
atualizarContador(); // Inicializa com o slide atual

anime({
  targets: '.jl-item-active',
  width: 90
})

nextItem.addEventListener('click', function(){
    nextSliderAnim();
    counterAdd();
    atualizarNavigator();
    setActiveSlide();
});

prevItem.addEventListener('click', function(){
    prevSliderAnim();
    counterRemove();
    atualizarNavigator(); 
    setActiveSlide();
});


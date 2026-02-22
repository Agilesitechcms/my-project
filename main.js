document.addEventListener('DOMContentLoaded',function(){
  // nav toggle
  var btn=document.querySelector('.nav-toggle');
  if(btn){
    btn.addEventListener('click',function(){
      var nav=document.getElementById('main-nav');
      var expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', String(!expanded));
      if(nav) nav.style.display = expanded ? '' : 'flex';
    });
  }

  // simple quiz handler: count checked inputs with data-correct="true"
  document.querySelectorAll('.quiz').forEach(function(quiz){
    var btn = quiz.querySelector('.quiz-submit');
    var resultEl = quiz.querySelector('.result');
    if(btn && resultEl){
      btn.addEventListener('click',function(){
        var questions = quiz.querySelectorAll('.question');
        var correct=0, total=questions.length;
        questions.forEach(function(q){
          var checked = q.querySelector('input[type="radio"]:checked');
          if(checked && checked.dataset.correct === 'true') correct++;
        });
        resultEl.textContent = `Score: ${correct} / ${total}`;
      });
    }
  });
  
  // Enhanced quiz handler
  if(document.querySelectorAll('.quiz').length){
    document.querySelectorAll('.quiz').forEach(function(quiz){
      var btn = quiz.querySelector('.quiz-submit');
      var resultEl = quiz.querySelector('.result');
      if(btn && resultEl){
        btn.addEventListener('click',function(){
          var questions = quiz.querySelectorAll('.question');
          var correct=0, total=questions.length;
          questions.forEach(function(q){
            var checked = q.querySelector('input[type="radio"]:checked');
            var guide = q.querySelector('.study-guide');
            if(guide) guide.style.display = 'none'; // Hide all guides first
            if(checked && checked.dataset.correct === 'true') correct++;
            else if(checked && guide){
              guide.style.display = 'block'; // Show guide for incorrect answer
            }
          });
          resultEl.textContent = `Score: ${correct} / ${total}`;
        });
      }
    });
  }

  // Dark mode toggle
  function toggleDarkMode(){
    var theme = document.documentElement.getAttribute('data-theme');
    if(theme==='dark'){
      document.documentElement.setAttribute('data-theme','');
      document.querySelectorAll('body,.site-header,.site-footer,.question').forEach(function(el){el.removeAttribute('data-theme');});
    }else{
      document.documentElement.setAttribute('data-theme','dark');
      document.querySelectorAll('body,.site-header,.site-footer,.question, .background').forEach(function(el){el.setAttribute('data-theme','dark');});
    }
  }
  window.toggleDarkMode = toggleDarkMode;
});

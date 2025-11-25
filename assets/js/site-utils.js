/* site-utils.js - small helpers for the site
   - sets the text of elements with class 'site-year' to the current year
   This file is safe to load with `defer` on every page. */
(function(){
  function setSiteYear(){
    try{
      var y = new Date().getFullYear();
      document.querySelectorAll('.site-year').forEach(function(el){ el.textContent = y; });
    }catch(e){ /* fail silently */ }
  }
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', setSiteYear);
  } else {
    setSiteYear();
  }
})();

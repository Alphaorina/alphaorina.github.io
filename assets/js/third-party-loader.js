/* third-party-loader.js
   Loads a configured list of external scripts after user interaction
   or when the browser is idle. Configuration: set `window.__thirdPartyScripts` to
   an array of script descriptor objects: { src, async?, defer?, crossorigin?, id?, attrs? }
*/
(function(){
  'use strict';

  var loaded = false;

  function insertScript(desc){
    try{
      if(!desc || !desc.src) return;
      if(desc.id && document.getElementById(desc.id)) return; // already present
      var s = document.createElement('script');
      s.src = desc.src;
      if(desc.async) s.async = true;
      if(desc.defer) s.defer = true;
      if(desc.crossorigin) s.crossOrigin = desc.crossorigin;
      if(desc.type) s.type = desc.type;
      if(desc.id) s.id = desc.id;
      if(desc.attrs){ Object.keys(desc.attrs).forEach(function(k){ s.setAttribute(k, desc.attrs[k]); }); }
      (document.head || document.body).appendChild(s);
    }catch(e){ /* swallow */ }
  }

  function loadAll(){
    if(loaded) return; loaded = true;
    try{
      var list = window.__thirdPartyScripts || [];
      list.forEach(function(d){ insertScript(d); });
    }catch(e){}
  }

  // load on first user interaction
  function onUserInteraction(){ loadAll(); removeListeners(); }
  function removeListeners(){
    ['scroll','mousemove','touchstart','keydown','pointerdown'].forEach(function(ev){ window.removeEventListener(ev,onUserInteraction); });
  }

  ['scroll','mousemove','touchstart','keydown','pointerdown'].forEach(function(ev){ window.addEventListener(ev,onUserInteraction,{passive:true,once:true}); });

  // otherwise load when idle or after a short timeout
  if('requestIdleCallback' in window){
    requestIdleCallback(loadAll, {timeout: 3000});
  } else {
    setTimeout(loadAll, 2500);
  }

  // also expose manual trigger
  window.__loadThirdParty = loadAll;

})();

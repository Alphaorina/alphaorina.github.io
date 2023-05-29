function selectElementText(el, win) {
  el.focus();
  win = win || window;
  var doc = win.document,
    sel,
    range;
  if (win.getSelection && doc.createRange) {
    sel = win.getSelection();
    range = doc.createRange();
    range.selectNodeContents(el);
    sel.removeAllRanges();
    sel.addRange(range);
  } else if (doc.body.createTextRange) {
    range = doc.body.createTextRange();
    range.moveToElementText(el);
    range.select();
  }
}

window.onload = function() {
  var elements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6');
  elements.forEach(function(element) {
    element.onmouseover = function(e) {
      e = e || window.event;
      var target = e.target || e.srcElement;
      selectElementText(target);
    };
  });
};

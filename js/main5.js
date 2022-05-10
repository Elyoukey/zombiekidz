document.addEventListener("DOMContentLoaded", function(){

  // images display
  let a = document.getElementsByTagName('area');
  for(let i = 0;i < a.length; i++)
  {
    a[i].addEventListener('click', function(e){
      e.preventDefault();
      var elt = $_(this.getAttribute('href'));
      elt.style.visibility= 'visible';
      elt.scrollIntoView({behavior: "smooth", block: "center", inline: "center"});
    });
  }

  // zoom buttons
  $('zoomin').addEventListener('click', zoomin);
  $('zoomout').addEventListener('click', zoomout);

  // set up wheel mouse to zoom
  window.addEventListener('wheel', zoom);

  // make draggable canvas
  dragElement($("canvas"));



});

/* Utilities */
function $(id){ return document.getElementById(id);}
function $_(q){ return document.querySelector(q);}
function $_s(q){ return document.querySelectorAll(q);}

/* ZOOM */
let zoomLevel = 5;
function zoom(e){
  if( e.deltaY > 0){ return zoomout(e);}
  else{ return zoomin(e);}
}
function zoomout(e){
  if(zoomLevel==1)return;
  zoomLevel--;
  $('canvas').className='zoom-level-'+zoomLevel;
}
function zoomin(e){
  if(zoomLevel>=9)return;
  zoomLevel++;
  $('canvas').className='zoom-level-'+zoomLevel;
}


// Make the DIV element draggable:
function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

  // otherwise, move the DIV from anywhere inside the DIV:
  document.body.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
    elmnt.style.cursor='grabbing';
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement(e) {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
    elmnt.style.cursor='grab';
  }
}

function popupwindowFb(w, h) {
  var left = (screen.width/2)-(w/2);
  var top = (screen.height/2)-(h/2);
  return window.open("https://www.facebook.com/sharer/sharer.php?u="+ window.location.href, "", 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+w+', height='+h+', top='+top+', left='+left);
}

function popupwindowTwitter(w, h) {
  var left = (screen.width/2)-(w/2);
  var top = (screen.height/2)-(h/2);
  return window.open("https://twitter.com/intent/tweet?text=Hey,%20check%20out%20this%20event%20right%20here!&url="+ window.location.href +"&hashtags=HappeNUS", "", 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+w+', height='+h+', top='+top+', left='+left);
}  

function search() {
  
  function updateContainer(res){
    $('#result').innerHTML = res;
  }
  
	var search = encodeURIComponent($("input[type=search]").value);
  
  //check cache
  var ls = localStorage.getItem(search);
  if(ls != null && ls != undefined){
    updateContainer(ls);
    return;
  }
  
	var url = "http://www.itmaster.com.ar/demos/wikipedia.php?query=" + search;
	
  var ajax = new XMLHttpRequest();
  ajax.open('GET', url);
  ajax.addEventListener('load', function(){
    var res = ajax.response;
    updateContainer(res);
    localStorage.setItem(search, res);
  });
  ajax.send();
}

function $(id) {
	return document.querySelector(id);
}
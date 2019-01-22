//for launching the game in a new window
function newGame(url) {
  var resolution = document.getElementById('resolution');
  var value = resolution.options[resolution.selectedIndex].value;
  console.log(value);
	popupWindow = window.open(url,'popUpWindow','height='+value*0.5625+',width='+value+',left=0,top=0,resizable=0,scrollbars=no,toolbar=no,menubar=no,location=no,directories=no,status=yes')
}

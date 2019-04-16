function display() {
    document.getElementById("accountList").style.opacity=0.2;
    document.getElementById("modalTable").style.display = 'block';
  }
  function disappear() {
    document.getElementById("accountList").style.opacity=1;
    document.getElementById("modalTable").style.display = 'none';
  }
   const close= document.getElementById("close");

close.addEventListener('click', disappear);
function toogleNav(){
  let navbar = document.getElementById("navbar");
  navbar.style.display=navbar.style.display==="none"?"block":"none";
}
function display() {
    document.getElementById("accountList").style.display='none';
    document.getElementById("modalTable").style.display = 'block';
  }
  function disappear() {
    document.getElementById("accountList").style.display='block';
    document.getElementById("modalTable").style.display = 'none';
  }
   const close= document.getElementById("close");

close.addEventListener('click', disappear);
function toogleNav(){
  let navbar = document.getElementById("navbar");
  navbar.style.display=navbar.style.display==="none"?"block":"none";
}

const btnMenu=document.getElementById('menu');
btnMenu.addEventListener('click',()=>{
  document.getElementById('sidebar').style.display='block';
  document.getElementById('content').style.display='block';
})
const loginModal = document.getElementById('LoginModal');
const registerModal = document.getElementById('RegisterModal');
const postLoginModal = document.getElementById('PostLoginModal');

if(postLoginModal !== null){
  postLoginModal.onclick = function(e) {
    e.preventDefault();
    display(loginModal);
  };
}

document.getElementById("Login").onclick = function(e) {
  e.preventDefault();
  display(loginModal);
};

document.getElementById("Register").onclick = function(e) {
  e.preventDefault();
  display(registerModal);
};

document.getElementById('closeLogin').onclick = close(loginModal);
document.getElementById('closeRegister').onclick = close(registerModal);

window.onclick = function(event) {
  if (event.target == loginModal) {
    close(loginModal);
  } else if(event.target == registerModal){
    close(registerModal)
  }
};

function close(block){
  block.style.display = "none";
}

function display(block){
  block.style.display = "block";
}
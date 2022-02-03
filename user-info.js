var submitBtn = document.querySelector(".submit");
var user1Input = document.querySelector(".user1-input");
var user2Input = document.querySelector(".user2-input");

var naming = function () {
  user1.name = user1Input.value;
  user2.name = user2Input.value;
  console.log(user1, user2);
};
submitBtn.addEventListener("click", naming);

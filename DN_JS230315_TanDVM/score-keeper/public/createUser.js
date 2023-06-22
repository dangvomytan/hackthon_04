const formElement = document.querySelector("#createForm");

formElement.addEventListener("submit", function(event) {
  event.preventDefault(); // Ngăn chặn hành vi mặc định của form

  const player1Input = document.querySelector("#player_1");
  const player2Input = document.querySelector("#player_2");
  const player3Input = document.querySelector("#player_3");
  const player4Input = document.querySelector("#player_4");
  
  const player1Value = player1Input.value;
  const player2Value = player2Input.value;
  const player3Value = player3Input.value;
  const player4Value = player4Input.value;

});
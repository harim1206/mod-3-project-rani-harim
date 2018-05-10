let optionOneButton = document.getElementById('optionOne')
let optionTwoButton = document.getElementById('optionTwo')


optionOneButton.addEventListener('click', function(){
  console.log("hello!")
  runOptionOneSound()
  runOptionOneJS()
})

optionTwoButton.addEventListener('click', function(){
  console.log("hello!")
  runOptionThreeJS()
})

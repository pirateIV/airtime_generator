function loadEvents(){
  generateBtn.addEventListener('click', generatePin)
  saveBtn.addEventListener('click', save)
}

function getRandomCardPin(){
  let PIN = ''

  for(let i = 1; i <= 16; i++){
    PIN += Math.floor(Math.random() * 10)
  }
  return PIN
}

function generatePin(){
  networkOption.addEventListener('change', selNetwork)

  genInput.value = getRandomCardPin()
  pin = genInput.value
  function selNetwork(){
    let select = networkOption.value

    if(select === 'Airtel NG'){
      genInput.value = getRandomCardPin()
      pin = `*126*${genInput.value}#`
    }
    else if(select === 'MTN NG'){
      genInput.value = getRandomCardPin()
      pin = `*555*${genInput.value}#`
    }
    if(select === 'Glo NG'){
      genInput.value = getRandomCardPin()
      pin = `*123*${genInput.value}#`
    }
    if(select === '9Mobile'){
      genInput.value = getRandomCardPin() 
      pin = `*606*${genInput.value}#`
    }

    /*  Call the checkSelection function whenever the network is selected */
    checkSelection()
  }

  selNetwork()
  getRandomCardPin()
}

function checkSelection(){
  if(networkOption.value && amount.value){
    
    // Enable the save button
    saveBtn.style.display = 'inline-block'
    generateBtn.addEventListener('click', ()=>{
      error.classList.add('')
      genInput.classList.add('green')
    })

    error.innerHTML = ''

    // error.innerHTML = ''
    genInput.classList.remove('red')
    genInput.classList.add('green')
    
    // add classes to message
    // error.classList.remove('text-danger')
    // error.classList.add('text-success')
    // error.classList.add('small')


    console.log(true)
  }
   else {
    // Disable the save button
    saveBtn.style.display = 'none'

    genInput.value = ''
    generateBtn.addEventListener('click', ()=>{
      genInput.classList.add('red')
        setInterval(() => {
        genInput.classList.remove('red')
        }, 3500);
    })
    
    console.log(false)
  }
}

checkSelection()

let tablePinArray = []
let selAmount = amount.value


function save(){
  saveBtn.style.display = 'none'

  let value = {
    network: networkOption.value,
    date: recentDate.toLocaleDateString(),
    amount: amount.value,
    pin: pin,
    status: 'UNUSED',
    // delete: 
  }
 
  tablePinArray.push(value)
  savedPin.value = genInput.value

  if(savedPin.value ===  genInput.value){
    generateBtn.addEventListener('click', ()=>{
      genInput.classList.add('red')
      error.innerHTML = 'pin already saved,' + ' <span style="color: red;">cannot regenerate...</span>'
      error.classList.add('small')
      error.classList.add('text-success')

      setTimeout(() => {
        genInput.classList.remove('green')
        error.innerHTML = ''
      }, 5000);
    })
  }
  genInput.value = ''

  // reset to to default
  networkOption.value = ''
  amount.value = ''

  // genInput.classList.remove('green')

  console.log(value)
  displayRechargeData()
}

function displayRechargeData(){
   
  // tablePinArray.push(value)
  tableDisplay.innerHTML = ''
  tablePinArray.forEach((component, index)=>{
    tableDisplay.innerHTML += `
      <tr class="text-center table-light">
        <td>${index + 1}</td>
        <td>${component.network}</td>
        <td>${component.date}</td>
        <td>${component.amount}</td>
        <td>${component.pin}</td>
        <td>${component.status}</td>
        <td></td>
      </tr>
    `
  })
}



getRandomCardPin()
loadEvents()
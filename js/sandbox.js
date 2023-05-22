function loadEvents(){
  generateBtn.addEventListener('click', generatePin)
  saveBtn.addEventListener('click', save)
}

// Random Pin Number
function getRandomCardPin(){
  let PIN = ''

  for(let i = 1; i <= 16; i++){
    PIN += Math.floor(Math.random() * 10)
  }
  return PIN
}

// Return the Random Number
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
  console.log(getRandomCardPin()
  )
}

// Check if the Network and Amount are selected
function checkSelection(){
  genInput.classList.remove('red')

  if(networkOption.value && amount.value){
    
    // Enable the save button
     saveBtn.style.display = 'inline-block'

    // success.classList.remove('text-danger')
    error.innerHTML = ''
    generateBtn.addEventListener('click', ()=>{
    genInput.classList.add('green')
      setTimeout(() => {  
        genInput.classList.remove('green')
        success.innerHTML = ''
      }, 5000);
    })


    console.log(true)
  }
   else {
    // Disable the save button
    saveBtn.style.display = 'none'

    genInput.value = ''
    generateBtn.addEventListener('click', ()=>{
      genInput.classList.add('red')
      error.classList.add('text-danger')
      error.classList.add('small')
      error.innerHTML = 'Enter network and amount!'
        setInterval(() => {
        error.style.display = 'none'
        error.innerHTML = ''
        genInput.classList.remove('red')
        }, 3500);
    })
    
    console.log(false)
  }
}

checkSelection()

let selAmount = amount.value

let tablePinArray = []
if (localStorage.getItem('tablePinArray')) {
  tablePinArray = JSON.parse(localStorage.getItem('tablePinArray'))

  displayRechargeData()
}

// Save data
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

  // Store the updated array in local storage
  localStorage.setItem('tablePinArray', JSON.stringify(tablePinArray))
  savedPin.value = genInput.value

  // if(savedPin.value ===  genInput.value){
    generateBtn.addEventListener('click', ()=>{
      genInput.classList.add('red')
      errorTwo.innerHTML = 'pin already saved,' + ' <span style="color: red;">cannot regenerate...</span>'
      errorTwo.classList.add('small')
      errorTwo.classList.add('text-success')

      setTimeout(() => {
        genInput.classList.remove('green')
        errorTwo.innerHTML = ''
      }, 5000);
    })
  // }
  genInput.value = ''

  // reset to to default
  networkOption.value = ''
  amount.value = ''

  // genInput.classList.remove('green')

  console.log(value)
  displayRechargeData()
}

// Show results in document
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

function recharge(e){
  
}


getRandomCardPin()
loadEvents()
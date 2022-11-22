const convert = async (from, to) => {
    const response = await fetch(`https://api.exchangerate.host/latest?base=${from}&symbols=${to}`)
    const data = await response.json()
    return Object.values(data.rates)[0]
}
function setRight () { rightInput.value = format(+(leftInput.value.split(' ').join('')) * +leftValue.textContent) }
function setLeft () { leftInput.value = format(+rightInput.value * +rightValue.textContent) }
// initialize all needed elements
let from = 'RUB', to = 'USD'
const leftFrom = document.querySelector('.left .from')
const leftTo = document.querySelector('.left .to')
const leftValue = document.querySelector('.left .value')
const leftInput = document.querySelector('.left input')
const allLeftCur = document.querySelectorAll('.left .changeCurrency li')
const rightFrom = document.querySelector('.right .from')
const rightTo = document.querySelector('.right .to')
const rightValue = document.querySelector('.right .value')
const rightInput = document.querySelector('.right input')
const allRightCur = document.querySelectorAll('.right .changeCurrency li')
// update all values
function setAll(side) {
    convert(from, to, side).then(ratio => {
        leftFrom.textContent = from
        leftTo.textContent = to
        leftValue.textContent = ratio.toFixed(4)
        rightFrom.textContent = to
        rightTo.textContent = from
        rightValue.textContent = (1 / ratio).toFixed(4)
        if (side == true) setRight()
        else if (side == false) setLeft()
    })
    .catch(() => alert("Couldn't connect to API"))
} setAll()
// currencies buttons
allLeftCur.forEach(item =>{
    item.addEventListener('click', (event) => {
        allLeftCur.forEach(item => item.classList.remove("selected"))
        event.target.classList.add("selected")
        from = event.target.textContent
        setAll(false)
    })
})
allRightCur.forEach(item =>{
    item.addEventListener('click', (event) => {
        allRightCur.forEach(item => item.classList.remove("selected"))
        event.target.classList.add("selected")
        to = event.target.textContent
        setAll(true)
    })
})
// both inputs
leftInput.addEventListener('input', (event) => {
    event.target.value = event.target.value.replace(/[^0-9.,]/g, '').replace(/,/g, '.').replace(/(\..*)\./g, '$1')
    setRight()
    event.target.value = format(event.target.value)
})
rightInput.addEventListener('input', (event) => {
    event.target.value = event.target.value.replace(/[^0-9.,]/g, '').replace(/,/g, '.').replace(/(\..*)\./g, '$1')    
    setLeft()
    event.target.value = format(event.target.value)    
})
// formating functions
const onlyZeros = (str) => { return str.toString().trim() == 0 }
function format (number) {
    string = number.toString()
    if (string.indexOf('.') == -1) return string.replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')
    let parts = string.split('.')
    parts[0] = parts[0].replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')
    if (onlyZeros(parts[1])) parts[1] = ''
    else parts[1] = parts[1].substring(0, 4)
    return parts[0] + '.' + parts[1]
}
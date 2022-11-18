const convert = async (from, to) => {
    const response = await fetch(`https://api.exchangerate.host/latest?base=${from}&symbols=${to}`)
    const data = await response.json()
    return Object.values(data.rates)[0]
}

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
function setAll() {
    convert(from, to).then(ratio => {
        leftFrom.textContent = from
        leftTo.textContent = to
        leftValue.textContent = ratio
        rightFrom.textContent = to
        rightTo.textContent = from
        rightValue.textContent = 1 / ratio
    })
}
setAll()

allLeftCur.forEach(item =>{
    item.addEventListener('click', (event) => {
        allLeftCur.forEach(item => item.classList.remove("selected"))
        event.target.classList.add("selected")
        from = event.target.textContent
        setAll()
    })
})

allRightCur.forEach(item =>{
    item.addEventListener('click', (event) => {
        allRightCur.forEach(item => item.classList.remove("selected"))
        event.target.classList.add("selected")
        to = event.target.textContent
        setAll()
    })
})
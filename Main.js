
function getRandomNumberBetween(min,max){
  return Math.floor(Math.random()*(max-min+1)+min)
}

let ruleta
ruleta = getRandomNumberBetween(1,27)

const ruleta_fija = ruleta

console.log(ruleta)
console.log(ruleta_fija)

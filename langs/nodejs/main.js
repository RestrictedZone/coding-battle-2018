
const argv = process.argv.slice(2).map(i => parseInt(i))

console.log(argv.reduce((carry, arg) => carry + arg, 0))

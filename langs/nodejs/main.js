
function print(text) {
  process.stdout.write("" + text)
}

const argv = process.argv.slice(2).map(i => parseInt(i))

print(argv.reduce((carry, arg) => carry + arg, 0))

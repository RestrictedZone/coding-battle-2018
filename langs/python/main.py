
import sys
from functools import reduce

argv = list(map(int, sys.argv[1:]))

print(reduce((lambda x, y: x + y), argv))

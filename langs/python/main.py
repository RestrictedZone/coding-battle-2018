
import sys
from functools import reduce

# sys.stdout을 사용해야합니다.
def prt(value):
  sys.stdout.write(str(value))

argv = list(map(int, sys.argv[1:]))

prt(reduce((lambda x, y: x + y), argv))

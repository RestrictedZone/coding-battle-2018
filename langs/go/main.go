package main

import (
	"fmt"
	"os"
	"strconv"
)

func main() {
	total := 0
	for _, arg := range os.Args[1:] {
		i, err := strconv.Atoi(arg)
		if err != nil {
			panic(err)
		}
		total += i
	}

	fmt.Print(total)
}

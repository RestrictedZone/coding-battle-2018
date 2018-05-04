package main

import (
	"fmt"
	"os"
	"strconv"
)

const (
	ActionUp = iota
	ActionRight
	ActionDown
	ActionLeft
)

func main() {
	args := []int{}
	for _, i := range os.Args[1:] {
		j, err := strconv.Atoi(i)
		if err != nil {
			panic(err)
		}
		args = append(args, j)
	}

	// map 정보 만들기
	mapWidth := args[0]
	mapHeight := args[1]
	var tiles []int
	for _, arg := range args[2 : mapWidth*mapHeight+2] {
		tiles = append(tiles, arg)
	}
	playerArgs := args[(mapWidth*mapHeight + 2):]

	me := map[string]int{
		"x": playerArgs[1],
		"y": playerArgs[2],
	}
	var players []map[string]int
	for i := 1; i < playerArgs[0]; i++ {
		players = append(players, map[string]int{
			"x": playerArgs[i*2+1],
			"y": playerArgs[i*2+2],
		})
	}

	// _ = me
	_ = players

	// 1 or 0 or 513
	for i := range tiles {
		if tiles[i] != 513 && tiles[i] != 0 {
			tiles[i] = 1
		}
	}

	// s recursive

	// fmt.Println(me["x"])
	// fmt.Println(me["y"])
	// fmt.Println(mapWidth)
	s := me["x"] + me["y"]*mapWidth
	tiles[s] = 0

	// for i, v := range tiles {
	// 	if i != 0 && i%mapWidth == 0 {
	// 		fmt.Println()
	// 	}
	// 	fmt.Print(v)
	// }
	// fmt.Println()
	// c := make(chan int)
	// fmt.Println(s)
	e := recur(s, mapWidth, tiles)
	// fmt.Println(e)
	// e := <-c

	if e-s == 1 {
		fmt.Print(ActionRight)
	} else if e-s == -1 {
		fmt.Print(ActionLeft)
	} else if e-s == mapWidth {
		fmt.Print(ActionDown)
	} else {
		fmt.Print(ActionUp)
	}
}

func recur(id int, w int, route []int) int {

	// fmt.Println(id)

	if route[id] == 513 {
		// quit <- id
		// fmt.Println(id, route[id])
		return id
	}

	// var ret int

	if id+w < len(route) && route[id+w] > 0 {
		// route[id+w] = 0
		// fmt.Println(id + w)
		if recur(id+w, w, route) != -1 {
			// quit <- id
			// fmt.Println(id + w)
			return id + w
		}
		// route[id+w] = 1
	}

	if id+1 < len(route) && route[id+1] > 0 {
		// route[id+1] = 0

		if recur(id+1, w, route) != -1 {
			// quit <- id
			// fmt.Println(id)
			return id + 1
		}
		// route[id+1] = 1
	}

	if id-1 >= 0 && route[id-1] > 0 {
		// route[id-1] = 0
		if recur(id-1, w, route) != -1 {
			// quit <- id
			// fmt.Println(id)
			return id - 1
		}
		// route[id-1] = 1
	}

	if id-w >= 0 && route[id-w] > 0 {
		// route[id-w] = 0
		if recur(id-w, w, route) != -1 {
			// quit <- id
			// fmt.Println(id)
			return id - w
		}
		// route[id-w] = 1
	}

	// fmt.Println(id)
	return -1
}

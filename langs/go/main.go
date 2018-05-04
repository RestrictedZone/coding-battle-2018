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

	_ = me
	_ = players

	// 코딩 시작하기

	fmt.Print(ActionDown)
}

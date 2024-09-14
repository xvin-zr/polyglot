/**
 * Problem 3: https://adventofcode.com/2020/day/3
 */

package main

import (
	"fmt"
	"strings"
)

type Thing = string

const (
	Tree Thing = "#"
	Snow Thing = "."
)

func getInput() string {
	return `..##.......
#...#...#..
.#....#..#.
..#.#...#.#
.#...##..#.
..#.##.....
.#.#.#....#
.#........#
#.##...#...
#...##....#
.#..#...#.#`
}

func main() {
	var treeCount = 0
	for r, line := range strings.Split(getInput(), "\n") {
		if string(line[r*3%len(line)]) == Tree {
			treeCount++
		}
	}

	fmt.Printf("treecount: %v\n", treeCount)
}

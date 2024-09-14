/**
 * Problem 3: https://adventofcode.com/2020/day/3
 */

function getInput(): string {
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
.#..#...#.#`;
}

enum Thing {
    Tree = '#',
    Snow = '.',
}

const things = getInput()
    .split('\n')
    .map((x) => x.split(''));

const colLen = things[0].length;

let treeCount = 0;

things.forEach((thingRow, i) => {
    thingRow[(i * 3) % colLen] === Thing.Tree && treeCount++;
});

console.log({ treeCount });

function getInput(): string {
  return `forward 5
down 5
forward 8
up 3
down 8
forward 2`;
}

type Dir = "forward" | "up" | "down";

function parseLine(line: string): [number, number] {
  const [dir, a] = line.split(" ");
  const amount = Number(a);

  if (dir === "forward") {
    return [amount, 0];
  } else if (dir === "up") {
    return [0, -amount];
  } else {
    // down
    return [0, amount];
  }
}

const out = getInput()
  .split("\n")
  .map(parseLine)
  .reduce(
    ([x, y], [dx, dy]) => {
      return [x + dx, y + dy];
    },
    [0, 0]
  );

console.log(out, out[0] * out[1]);

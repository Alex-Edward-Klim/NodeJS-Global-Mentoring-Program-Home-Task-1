const reverse = (str) => str.split("").reverse().join("");

process.stdin.on("data", (data) => {
  const str = data.toString().trim();

  process.stdout.write(`${reverse(str)}\n\n`);
});

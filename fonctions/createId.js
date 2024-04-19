module.exports = async prefix => {
  let car = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'];
  let ID = [];
  for (let i = 0; i < 10; i++) ID.push(car[Math.floor(Math.random() * car.length)]);

  return `${prefix}-${ID.join("")}`;
}
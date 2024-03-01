// Basic  -- 1
console.log(1 + '2' + '2');
console.log(1 + +'2' + '2');
console.log(1 + -'1' + '2');
console.log(+'1' + '1' + '2');
console.log('A' - 'B' + '2');
console.log('A' - 'B' + 2);

// Basic -- 2
console.log(1 == '1');
console.log(1 == [1]);
console.log(1 == true);
console.log(0 == '');
console.log(0 == '0');
console.log(0 == false);

// Basic -- 3
const member = {
  name: 'Jon',
  address: { street: '7th street' },
};

const member2 = { ...member };
member.address.street = '9th street';
member.name = 'Jon Doe';

console.log(member2);

// Challenge 04
setTimeout(() => console.log(1));

Promise.resolve().then(() => console.log(2));

Promise.resolve().then(() => setTimeout(() => console.log(3)));

new Promise(() => console.log(4));

setTimeout(() => console.log(5));


// Challenge 05 What gets logged?

setTimeout(() => console.log(1));

(async () => {
  console.log(2);
  await Promise.resolve();
  console.log(3);
})()

Promise.resolve().then(() => {
  setTimeout(() => console.log(4))
});


// Number is prime or not
/* function isPrime(num) {
  if (num < 2) {
    return false; // numbers less than 2 are not prime
  }

  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) {
      return false; // if the number is divisible by any number between 2 and sqrt(num), it's not prime
    }
  }

  return true; // if the number is not divisible by any number between 2 and sqrt(num), it's prime
} */

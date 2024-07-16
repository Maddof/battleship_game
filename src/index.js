import { sayGoodBye } from "./modules/saygoodbye";

function sayHello() {
  console.log("Hello world");
}

export default function add(a, b) {
  return a + b;
}

sayHello();
sayGoodBye();

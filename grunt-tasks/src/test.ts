class Greeter {
    constructor(public greeting: string) { }
    greet() {
        if (2 === 3) {
            var hede = 4;
        }
        return "<h1>" + this.greeting + "</h1>";
    }
}

var greeter = new Greeter("Hello, world!");

document.body.innerHTML = greeter.greet();
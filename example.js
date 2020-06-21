// Factory functions

// function person(name, catchPhrase){
//   return{
//     name: name,
//     catchPhrase: catchPhrase,
//     saySomething: function(){
//       console.log(`My name is ${name}, and ${catchPhrase}`)
//     }
//   }
// }

// people = []

// const corinna = person("corinna", "i need espresso")
// const bryant = person("bryant", "i love react")
// const pharia = person("pharia", "i am awake")

// people.push(corinna)
// people.push(bryant)
// people.push(pharia)

// ****************************************
// Constructor functions!


// Person.all = []

// function Person(name, catchPhrase){
//   this.name = name
//   this.catchPhrase = catchPhrase
//   Person.all.push(this)
// }


// const corinna = new Person("corinna", "i need espresso")
// const bryant = new Person("bryant", "i love react")
// const pharia = new Person("pharia", "i am awake")
// const matt = new Person("matt", "I'll try anything once")

// Person.prototype.saySomething = function(){
//   console.log(`My name is ${this.name}, and ${this.catchPhrase}`)
// }

// Person.allSaySomething = function(){
//   for (const person of Person.all){
//     person.saySomething()
//   }
// }

// *********************************
// ES6 Classes 


class Person {
  static all = []

  constructor(name, catchPhrase){
    this.name = name
    this.catchPhrase = catchPhrase
    Person.all.push(this)
  }

  saySomething(){
    console.log(`My name is ${this.name}, and ${this.catchPhrase}`)
  }

  static allSaySomething(){
    for (const person of Person.all){
      person.saySomething()
    }
  }

}

const corinna = new Person("corinna", "i need espresso")
const bryant = new Person("bryant", "i love react")
const pharia = new Person("pharia", "i am awake")
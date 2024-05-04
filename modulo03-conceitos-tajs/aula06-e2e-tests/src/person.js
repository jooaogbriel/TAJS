class Person {

  static validate(person) {
      if(!person.name) throw new Error('name is required')
      if(!person.cpf) throw new Error('cpf is required')
  }

  static format (person){
      const [name, ...lastName] = person.name.split(' ')
       return {
          cpf: person.cpf.replace(/\D/g, ''),
          name,
          lastName: lastName.join(' ')
      }
  }

  static save (person) {
      if(!['cpf', 'name', 'lastName'].every(prop => person[prop])){ // O método every() testa se todos os elementos do array passam pelo teste implementado pela função fornecida. Este método retorna um valor booleano.
          throw new Error(`cannot save invalid person: ${JSON.stringify(person)}`)
      }
      console.log('Registrado com sucesso!', person)
  }

  static process(person){
      this.validate(person)
      const personFormatted = this.format(person)
      console.log('Processing person...')
      this.save(personFormatted)
      return 'Ok'
  }
}
Person.process({
  name: 'Zezin da Silva', 
  cpf: '123.456.789-00'
})
export default Person
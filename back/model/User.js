class User {

  constructor(id, username, email, password, recuperacao) {
      this.id = id;
      this.username = username;
      this.email = email;
      this.password = password;
      this.recuperacao = recuperacao;
  }
}

module.exports = User;
const bcryptjs =  require('bcryptjs');
module.exports = {
  async up(queryInterface, Sequelize) {
    // aqui informo em qual tabala vou inserir os dados, e os campos da tabelas
    //com seus repectivos dados;
    await queryInterface.bulkInsert('users', [{
      nome: 'Thamires Tavares',
      email:'thamires2000@gmail.com',
      password_hash: await bcryptjs.hash('123456', 8),
      created_at: new Date(),
      updated_at: new Date(),
    }], {});

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('users', null, {});

  }
};

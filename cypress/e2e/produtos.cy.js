/// <reference types="cypress" />
import contrato from '../contracts/produtos.contract'
describe('Teste da funcionalidade Produtos', () => {
    let token

    before(() => {
        cy.token('fulano@qa.com', 'teste').then(tkn => { token = tkn })
    });

    it.only('Deve validar contrato de produtos', () => {
        cy.request('produtos').then(Response => {
            return contrato.validateAsync(Response.body)
        })
    });


    it('Listar Produtos', () => {
        cy.request({
            method: 'GET',
            url: 'http://localhost:3000/Produtos/'
        }).then((Response) => {
            expect(Response.body.produtos[1].nome).to.equal('Samsung 60 polegadas')
            expect(Response.status).to.equal(200)
            expect(Response.body).to.have.property('produtos')
            expect(Response.duration).to.be.lessThan(20)
        })
    });

    it('Cadastrar Produto', () => {
        cy.request({
            method: 'POST',
            url: 'http://localhost:3000/Produtos/',
            body: {
                "nome": "Relogio1",
                "preco": 400,
                "descricao": "acessório",
                "quantidade": 80
              },
              headers: {autorization: token}
           //Cadastrar produto novo   
        }).then((response) => {
            expect(response.status).to.equal(201)
            expect(response.body.message).to.equal("Cadastro realizado com sucesso") 
        })


    });

});
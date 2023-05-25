const express = require('express')

module.exports = function(server){
    //API Routes
    //Todas as rotas da api serao chamadas pelo router
    const router = express.Router()
    server.use("/api",router)

    //TODO Routes
    //todoService fornece os metodos get,put,delete,post
    const todoService = require('../api/todo/todoService')
    //define url base do webservice
    todoService.register(router, '/todos')
}
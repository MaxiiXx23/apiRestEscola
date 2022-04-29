class HomeController {
   async index(req,res) {
        res.json('Hello Home here!') 
    }
}

export default new HomeController();
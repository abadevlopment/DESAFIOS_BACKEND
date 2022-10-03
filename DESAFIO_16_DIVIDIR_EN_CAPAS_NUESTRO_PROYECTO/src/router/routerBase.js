import express from "express"

const routerBase = express.Router()

routerBase.get("/", (req, res) => {
    if (req.user) {
        res.redirect("/user/home")
    } else {
        // console.log(datosFaker);
        res.render("index", {
            // Products: datosFaker,
            // ProductsQty: datosFaker.length
        })
    }

})

export { routerBase }
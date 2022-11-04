import express from "express"
import { getAllProducts } from "../controller/index.js"

const routerBase = express.Router()

routerBase.get("/", getAllProducts)

export { routerBase }
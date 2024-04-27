import { searchDoc } from "../services/generalServices.js"
export const dashboard = (request, response) => {
    response.render("dashboard")
}

export const getLogs = async (request, response) => {
    const logs = await searchDoc('attacklog');
    response.json(logs)


}
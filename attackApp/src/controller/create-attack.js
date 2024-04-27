import { attackaction } from "../services/generalServices.js";

export const createAttack = (request, response) => {
    const attack = request.body;
    attackaction(request.body.targetIp, request.body.attackType)
    console.log(attack)

    response.json({message: "Attack Initialised"})
}

export const getAttack = (request, response) => {
    response.render("attack")
}




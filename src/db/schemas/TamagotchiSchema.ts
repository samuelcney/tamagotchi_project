export const TamagotchiSchema = {
    name: "Tamagotchi",

    properties:{
        _id: "string",
        name: "string",
        imageURL: "string",
        hungry: "int",
        happiness: "int",
        sleep: "int",
        status: "string"
    },

    primaryKey: "_id"
}
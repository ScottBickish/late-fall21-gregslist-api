import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class HousesService{

async getAll(query = {}){
const houses = await dbContext.Houses.find(query).populate('creator', 'name picture')
return houses
}

async create(body){
const house = await dbContext.Houses.create(body)
return house
}

async getById(id){
const house = await dbContext.Houses.findById(id).populate('creator', 'name picture')
if(!house){
    throw new BadRequest('Invalid house Id')
}
return house
}

async edit(body){
    const house = await this.getById(body.id)
    if(house.creatorId.toString() !== body.creatorId){
        throw new Forbidden('this is not your house to edit')
    }
    const update = dbContext.Houses.findOneAndUpdate({_id: body.id, creatorId: body.creatorId}, body, {new: true})
    return update
}

async destroy(userId, houseId){
    const house = await this.getById(houseId)
    if (house.creatorId.toString() !== userId) {
        throw new Forbidden('this is not your house to delete!')
    }
    await dbContext.Houses.findByIdAndDelete(houseId)
}

}

export const housesService = new HousesService()
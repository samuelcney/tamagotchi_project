import Realm from 'realm'
import {TamagotchiSchema} from './schemas/TamagotchiSchema'
import { UserSchema } from './schemas/UserSchema'


export const getRealm = async()=>
    await Realm.open({
        path: 'myDB',
        schema: [TamagotchiSchema, UserSchema],
    })


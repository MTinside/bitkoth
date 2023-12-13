import { Users } from "../model/User.js";
import bcrypt from 'bcrypt'
export async function getPasswords(req,res){
    const{email,masterPassword} = req.body;
    console.log(req.body);
    const currUser = await Users.findOne({email:email});

    console.log(currUser);
    if(currUser){
        try {
            console.log("bcrypt compare result:",await bcrypt.compare(masterPassword,currUser.masterPassword)); 
            if(await bcrypt.compare(masterPassword,currUser.masterPassword)){

                console.log({ passwords: currUser.savedPasswords });
                res.status(200).json({passwords: `${currUser.savedPasswords}`});
            }else{
                res.status(403).json({
                    message:"invalid password"
                })
            }

        } catch (error) {
            res.status(500).json({
                error:error
            })
        }
    }
    else{
        res.status(404).json({
            message:"User does not exist"
        })
    }
}
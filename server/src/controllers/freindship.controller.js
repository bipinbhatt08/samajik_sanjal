const Friendship = require("../models/friendShip.model")
const User = require("../models/user.model")

exports.checkFriendshipStatus=async(req,res)=>{
    const userA= req.user._id
    const userB= req.params.id
    const userBexists= await User.findById(userB)
    if(!userBexists){
        return res.status(400).json({
            message:"Invalid user id"
        })
    }
    //error aauna sakxa A le send gareko Id B le accept garda so kei work garnu paryo tesma
    let newUser, oldUser
    ///thulo wala naya ho
    if(String(userA)>String(userB)){
       newUser=userA,
       oldUser = userB 
    }
    const FriendshipStatus = await Friendship.findOne({userA:newUser,userB:oldUser})
    if(!FriendshipStatus){
        return res.status(400).json({
            message:"No friendship found",
            data:'Not initiated'
            
        })
    }
    res.status(200).json({
        message:"Friendship Status fethched successfully",
        data:FriendshipStatus
    })

}

exports.changeFriendshipStatus = async(req,res)=>{ //friend request pani garne
    const userA= req.user._id
    const userB= req.params.id
    const {status} = req.body
    
    const userBexists= await User.findById(userB)
    if(!userBexists){
        return res.status(400).json({
            message:"Invalid user id"
        })
    }
    //error aauna sakxa A le send gareko Id B le accept garda so kei work garnu paryo tesma
    let newUser
    let oldUser
    ///thulo wala naya ho
    if(String(userA)>String(userB)){
       newUser=userA,
       oldUser = userB 
    }
    const FriendshipExists = await Friendship.findOne({userA:newUser,userB:oldUser})
    if(!FriendshipExists){
        const data = await Friendship.create({userA:newUser,userB:oldUser})
        return res.status(200).json({
            message:"Friendship Status created successfully",
            data
        })
    }
    FriendshipExists.status=status
    await FriendshipExists.save()
    res.status(200).json({
        message:"Friendship Status changed successfully",
        data: FriendshipExists
    })
}

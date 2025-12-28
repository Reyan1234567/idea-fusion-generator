import User from "@/models/users"

export const MutateIdea=async(id:number, newStatus:boolean)=>{
    const user=await User.findOne({
        id
    })
    user.is_bookmarked=newStatus
    await user.save()
    }
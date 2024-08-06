"use client"
import { useAuth } from "@/Hooks/useCurrentUser"
import axios from "axios"
import { useQuery } from "react-query"
import Avatar from "../Avatar"

const FollowBar = () => {
    const { user } = useAuth()
    const { data } = useQuery(["Other"], () => {
        return axios.post(`http://localhost:4000/Friends/Follow`, {}, {
            headers: {
                'content-type': 'application/json',
                // 'authorization': `Bearer ${user?.token}`
            }
        }).then((res) => res.data?.following)
    })
    console.log(data)
    return (
        <div className="px-6 py-4 hidden lg:block p-4">
            <div className="bg-neutral-500 rounded-xl p-4">
                <h1 className="text-white text-xl font-semibold">People you may know</h1>
            <div className="gap-6 mt-6 flex flex-col">
                {data?.map((user: Record<string, any>) => (
                    <div key={user.id} className="flex flex-row gap-4">
                        <Avatar profileImage={user.profileImage}  userId={user.id} />
                        <div className="flex flex-col">
                            <p className="text-white font-semibold text-sm mt-6">
                                {user.UserName}
                            </p>
                            <p className="text-neutral-400 text-sm">
                                @{user.UserName}
                            </p>
                        </div>
                    </div>
                ))}
                </div>
            </div>
        </div>
    )
}
export default FollowBar
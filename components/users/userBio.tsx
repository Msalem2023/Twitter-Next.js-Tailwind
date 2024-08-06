import { format, parseISO } from "date-fns"
import { useMemo } from "react"
import Button from "../button"
import { BiCalendar } from "react-icons/bi"
import useEditModal from "@/Hooks/useEditModal"
import { useMutation } from "react-query"
import { Follow } from "../Http"
import { useAuth } from "@/Hooks/useCurrentUser"
import toast from "react-hot-toast"
import { client } from "@/app/layout"
interface UserBioProps {
    createdAt: string
    id: string,
    userId: string,
    onClick: () => void
    UserName: string,
    Email: string,
    bio: string
    Followers: number,
    Following: number
    label: string
}

const UserBio: React.FC<UserBioProps> = ({
    createdAt,
    id,
    userId,
    onClick,
    UserName,
    Email,
    bio,
    Followers,
    Following,
    label
}) => {
    const { user } = useAuth()
    const DateOfCreation = useMemo(() => {
        if (createdAt) {

            const date = parseISO(createdAt);

            return format(date, "MMMM yyyy")
        }
    }, [createdAt])
    const Edit = useEditModal()

    const { mutate } = useMutation({
        mutationFn: Follow,
        onSuccess: () => {
            client.invalidateQueries({ queryKey: ["Other"] })
            toast.success("You have new friend")
        }
    })
    const HandelFollow = async (user: any, userId: string) => {
        mutate({ user, userId })
    }


    return (
        <div className="border-b-[1px] border-neutral-800 pb-4">
            <div className="p-2 justify-end flex">
                {JSON.stringify(id) === JSON.stringify(userId) ? (
                    <Button secondary fullwidth large label="edit" onClick={() => Edit.onOpen()} />
                ) : (<Button label={label} secondary onClick={() => HandelFollow(user, userId)} />)}
            </div>
            <div className="mt-8 px-4">
                <div className="flex flex-col">
                    <p className="text-white text-2xl font-semibold">
                        {UserName}

                    </p>
                    <p className="text-neutral-500 text-md">
                        {Email}
                    </p>
                </div>
                <div className="flex flex-col mt-4">
                    <p className="text-white">
                        {bio}
                    </p>
                </div>
                <div className="flex flex-row items-center gap-2 mt-4 text-neutral-500">
                    <BiCalendar size={24} color="white" />
                    {`Joined on ${DateOfCreation}`}
                </div>
                <div className="flex flex-row items-center gap-6 mt-4">
                    <div className="flex flex-row items-center gap-2">
                        <p className="text-white">
                            {Followers}
                        </p>
                        <p className="text-neutral-500">
                            Followers
                        </p>
                    </div>
                    <div className="flex flex-row items-center gap-1">
                        <p className="text-white">
                            {Following}
                        </p>
                        <p className="text-neutral-500">
                            Following
                        </p>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default UserBio
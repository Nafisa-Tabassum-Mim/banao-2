import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

const UserList = () => {
    const { data: users = [], isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axios.get('https://602e7c2c4410730017c50b9d.mockapi.io/users');
            return res.data;
        },
    });
    // console.log(users)
    const handleImageError = (e) => {
        e.target.src = "https://i.ibb.co/8xdJQ3y/images.png";
    };


    const [selectedUser, setSelectedUser] = useState(null);

    const handleDetails = (username) => {
        const user = users.find(u => u.profile.username === username);
        setSelectedUser(user);
    }

    if (isLoading) {
        return (
            <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-white bg-opacity-80 z-50">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="flex">
            <div className="w-1/2 md:w-3/5">
                <h3 className="text-3xl font-bold p-8">User List</h3>
                {users.map((user, index) => (
                    <div key={index} className="border-b-2  flex flex-col md:flex-row  items-center p-4">
                        <div className="avatar">
                            <div className="w-24 rounded-full">
                                <img
                                    src={user.avatar}
                                    alt="User Avatar"
                                    onError={handleImageError}
                                />
                            </div>
                        </div>
                        <div className="ml-4 ">
                            <h3 className="text-lg mb-2">{`${user.profile.firstName}  ${user.profile.lastName}`}</h3>
                            <button onClick={() => handleDetails(user.profile.username)} className=" bg-gray-500 text-white font-bold px-6 py-[6px] rounded-lg">Details</button>
                        </div>


                    </div>
                ))}
            </div>

            <div className="w-1/2 md:w-2/5 fixed top-0 right-0 h-full border-l-2 border-l-500 bg-white px-2 pt-8 md:p-8 overflow-y-auto">
                <h3 className="text-3xl font-bold mb-8">User Details</h3>
                {selectedUser ? (
                    <div>
                        <div className="avatar">
                            <div className="w-24 rounded">
                                <img
                                    src={selectedUser.avatar}
                                    alt="User Avatar"
                                    onError={handleImageError}
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <h3 className="text-xl font-bold">{`${selectedUser.profile.firstName} ${selectedUser.profile.lastName}`}</h3>
                            <p className="md:text-lg">{selectedUser.Bio}</p>
                            <p className="md:text-lg">Username - {selectedUser.profile.username}</p>
                            <p className="md:text-lg">Job title - {selectedUser.jobTitle}</p>
                            <p className="md:text-lg">Email - {selectedUser.profile.email}</p>
                            <p className="md:text-lg">Created At - {new Date(selectedUser.createdAt).toLocaleString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                                hour: "numeric",
                                minute: "numeric",
                                second: "numeric",
                                hour12: true
                            })}</p>
                        </div>
                    </div>
                ) : (
                    <p className="text-red-500">Select a user to see their details</p>
                )}
            </div>
        </div>
    );
};

export default UserList;

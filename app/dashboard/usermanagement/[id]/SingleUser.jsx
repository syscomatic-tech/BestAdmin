"use client";

import UserDynamicHead from "@/components/dashboard/userpage/dynamic/UserDynamicHead";
import { fetchApi } from "@/utils/FetchApi";

import Image from "next/image";
import { useState } from "react";
import Loading from "../../loading";
import useImgBBUpload from "@/utils/useImgBBUpload";

export default function SingleUser({ user }) {
  const [isLoading, setIsLoading] = useState(false);

  const { error, handleUpload, imageUrl, uploading } = useImgBBUpload();

  const handleUserImgFileChange = async (event) => {
    const file = event.target.files[0];
    setIsLoading(true);

    try {
      const uploadedImageUrl = await handleUpload(file);

      setIsLoading(false);
      console.log(uploadedImageUrl);
    } catch (error) {
      console.error("Error uploading image:", error);
      setIsLoading(false);
    }
  };

  const updateProfile = (e) => {
    e.preventDefault();

    setIsLoading(true);
    const fromData = new FormData(e.target);

    const data = {
      userName: fromData.get("userName"),
      outletId: fromData.get("outletName"),
      role: fromData.get("role"),
      firstName: fromData.get("firstName"),
      lastName: fromData.get("lastName"),
      phoneNumber: fromData.get("phoneNumber"),
      email: fromData.get("email"),
      profilePicture: user?.profilePicture || imageUrl,
    };

    try {
      const response = fetchApi(`/auth/users/${user?._id}`, "PUT", data);

      if (response) {
        setIsLoading(false);
        console.log(response);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }

    console.log(data);
    setIsLoading(false);
  };
  // /auth/users/
  return (
    <main className="">
      {isLoading ? (
        <Loading />
      ) : (
        <form onSubmit={updateProfile} action="">
          <section className="mt-10 flex justify-between items-center">
            <UserDynamicHead user={user} />
            <button
              type="submit"
              className="text-sm text-white bg-black rounded-md px-3 py-2"
            >
              {isLoading ? "Updating..." : "Update"}
            </button>
          </section>

          <section className="grid grid-cols-1 justify-between items-start gap-5 w-full my-10">
            {/* main one section */}
            <div className="flex flex-col justify-start items-center w-full col-span-2 space-y-5">
              {/* one */}
              <div className="p-5 border bg-white rounded-md shadow-md w-full">
                <h5 className="text-md font-bold mb-3">Personal info</h5>
                <div className="grid grid-cols-3 justify-between items-start gap-5 ">
                  {user?.profilePicture ? (
                    <Image
                      src={user?.profilePicture}
                      alt="user"
                      width={145}
                      height={145}
                      className="w-[145px] h-[145px] object-cover rounded-md"
                    />
                  ) : (
                    <div>
                      <input
                        type="file"
                        id="file-upload"
                        name="file-upload"
                        onChange={handleUserImgFileChange}
                        className="hidden "
                      />
                      <label
                        for="file-upload"
                        className="z-20 flex flex-col-reverse items-center justify-center w-[145px] h-[145px] cursor-pointer border py-2 bg-gray-200 rounded-md"
                      >
                        <svg
                          width="21"
                          height="20"
                          viewBox="0 0 21 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M10.0925 2.4917C6.35684 2.4917 4.48901 2.4917 3.32849 3.65177C2.16797 4.81185 2.16797 6.67896 2.16797 10.4132C2.16797 14.1473 2.16797 16.0145 3.32849 17.1746C4.48901 18.3347 6.35684 18.3347 10.0925 18.3347C13.8281 18.3347 15.6959 18.3347 16.8565 17.1746C18.017 16.0145 18.017 14.1473 18.017 10.4132V9.99626"
                            stroke="black"
                            strokeWidth="1.25"
                            strokeLinecap="round"
                          />
                          <path
                            d="M4.66602 17.4913C8.17433 13.5319 12.117 8.28093 17.9993 12.2192"
                            stroke="black"
                            strokeWidth="1.25"
                          />
                          <path
                            d="M15.4982 1.66504V8.33847M18.8362 4.98087L12.1602 4.99327"
                            stroke="black"
                            strokeWidth="1.25"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </label>
                    </div>
                  )}

                  <div className="col-span-2 grid grid-cols-2 justify-between items-center gap-5">
                    <div className="flex flex-col col-span-2 space-y-1 w-full">
                      <label
                        htmlFor="userName"
                        className="text-sm font-semibold text-gray-600"
                      >
                        User Name
                      </label>
                      <input
                        type="text"
                        id="userName"
                        name="userName"
                        defaultValue={user?.userName}
                        className="border border-gray-300 rounded-md p-2 focus:outline-none "
                      />
                    </div>
                    <div className="">
                      <label
                        htmlFor="outletName"
                        className="text-sm font-semibold text-gray-600"
                      >
                        Outlet
                      </label>
                      <br />
                      <div className="relative flex border border-gray-300 px-2 mt-1 rounded-md bg-white hover:border-gray-400">
                        <svg
                          className="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 412 232"
                        >
                          <path
                            d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z"
                            fill="#648299"
                            fill-rule="nonzero"
                          />
                        </svg>
                        <select
                          id="outletName"
                          name="outletName"
                          className=" text-gray-600 h-10 pl-5 pr-10 w-full focus:outline-none appearance-none"
                        >
                          <option value={""}>Choose a Outlet</option>
                          <option>Banani</option>
                          <option>Gulshan</option>
                          <option>Motizhill</option>
                          <option>Merul</option>
                          <option>Demra</option>
                        </select>
                      </div>
                    </div>
                    <div className="">
                      <label
                        htmlFor="ordaerDate"
                        className="text-sm font-semibold text-gray-600"
                      >
                        Role
                      </label>
                      <br />
                      <div className="relative flex border border-gray-300 px-2 mt-1 rounded-md bg-white hover:border-gray-400">
                        <svg
                          className="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 412 232"
                        >
                          <path
                            d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z"
                            fill="#648299"
                            fill-rule="nonzero"
                          />
                        </svg>
                        <select
                          id="role"
                          name="role"
                          className=" text-gray-600 h-10 pl-5 pr-10 w-full focus:outline-none appearance-none"
                        >
                          <option value={user?.role}>{user?.role}</option>
                          <option value={"BA"}>Branch Admin</option>
                          <option value={"HQ"}>Head Office</option>
                          <option value={"AD"}>Admin</option>
                          <option value={"MGR"}>Manager</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex flex-col space-y-1 w-full">
                      <label
                        htmlFor="outletName"
                        className="text-sm font-semibold text-gray-600"
                      >
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        defaultValue={user?.firstName}
                        className="border border-gray-300 rounded-md p-2 focus:outline-none "
                      />
                    </div>
                    <div className="flex flex-col space-y-1 w-full">
                      <label
                        htmlFor="outletLocation"
                        className="text-sm font-semibold text-gray-600"
                      >
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        defaultValue={user?.lastName}
                        className="border border-gray-300 rounded-md p-2 focus:outline-none "
                      />
                    </div>
                    <div className="flex flex-col space-y-1 w-full">
                      <label
                        htmlFor="outletName"
                        className="text-sm font-semibold text-gray-600"
                      >
                        Phone Number
                      </label>
                      <input
                        type="text"
                        id="phoneNumber"
                        name="phoneNumber"
                        defaultValue={user?.phoneNumber}
                        className="border border-gray-300 rounded-md p-2 focus:outline-none "
                      />
                    </div>
                    <div className="flex flex-col space-y-1 w-full">
                      <label
                        htmlFor="outletLocation"
                        className="text-sm font-semibold text-gray-600"
                      >
                        Email
                      </label>
                      <input
                        type="text"
                        id="email"
                        name="email"
                        defaultValue={user?.email}
                        className="border border-gray-300 rounded-md p-2 focus:outline-none "
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </form>
      )}
    </main>
  );
}
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-object-type */
import { styles } from "@/app/styles/styles";
import {
  useEditLayoutMutation,
  useGetHeroDataQuery,
} from "@/redux/features/layout/layoutApi";
import { AiOutlineCamera } from "react-icons/ai";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

type Props = {};

const EditHero = (props: Props) => {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const { data, refetch } = useGetHeroDataQuery("Banner", {
    refetchOnMountOrArgChange: true,
  });
  const [editLayout, { isLoading, isSuccess, error }] =
    useEditLayoutMutation();

  useEffect(() => {
    if (data) {
      setTitle(data?.layout?.banner.title);
      setSubTitle(data?.layout?.banner.subTitle);
      setImage(data?.layout?.banner?.image?.url);
    }
    if (isSuccess) {
      refetch();
      toast.success("Hero Updated Successfully");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData?.data?.message);
      }
    }
  }, [data, isSuccess, error, refetch]);

  const handleUpdate = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (reader.readyState === 2) {
          setImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = async () => {
    await editLayout({
      type: "Banner",
      image,
      title,
      subTitle,
    });
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0a0a2c] to-black text-white overflow-hidden px-4 md:px-16">
      <div className="w-full max-w-[1400px] flex flex-col md:flex-row items-center justify-between gap-10">
        {/* LEFT SIDE - Circular Image */}
        <div className="flex-shrink-0 relative w-[600px] h-[600px] rounded-full bg-[#0a0a2c] flex items-center justify-center">
          <img
            src={image}
            alt="Banner preview"
            className="max-w-[90%] h-auto object-contain z-10"
          />
          <input
            type="file"
            name="banner"
            id="banner"
            accept="image/*"
            onChange={handleUpdate}
            className="hidden"
          />
          <label
            htmlFor="banner"
            className="absolute bottom-6 right-6 bg-[#37a39a] text-white p-2 rounded-full cursor-pointer z-20"
          >
            <AiOutlineCamera className="text-[18px]" />
          </label>
        </div>

        {/* RIGHT SIDE - Title & SubTitle */}
        <div className="flex flex-col justify-center items-start w-full max-w-[600px] md:ml-10 relative">
          <textarea
            className="resize-none font-extrabold leading-[1.2] w-full bg-transparent outline-none border-none text-[38px] xl:text-[52px] tracking-tight"
            placeholder="Improve Your Online Learning Experience Better Instantly"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            rows={4}
          />
          <textarea
            value={subTitle}
            onChange={(e) => setSubTitle(e.target.value)}
            placeholder="We have 40k+ Online courses & 500k+ Online registered students. Find your desired Courses from them."
            className="mt-4 resize-none text-[16px] xl:text-[18px] text-[#bbbbbb] font-medium bg-transparent outline-none border-none w-full"
            rows={3}
          />

          {/* Save Button */}
          <div
            className={`${styles.button} !w-[90px] !h-[36px] text-white absolute bottom-[-60px] right-0 ${
              data?.layout?.banner?.title !== title ||
              data?.layout?.banner?.subTitle !== subTitle ||
              data?.layout?.banner?.image?.url !== image
                ? "cursor-pointer bg-[#42d383]"
                : "cursor-not-allowed bg-[#cccccc34]"
            } rounded`}
            onClick={
              data?.layout?.banner?.title !== title ||
              data?.layout?.banner?.subTitle !== subTitle ||
              data?.layout?.banner?.image?.url !== image
                ? handleEdit
                : () => null
            }
          >
            Save
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditHero;

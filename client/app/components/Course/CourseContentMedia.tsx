/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { styles } from "@/app/styles/styles";
import CoursePlayer from "@/app/utils/CoursePlayer";
import {
  useAddAnswerMutation,
  useAddNewQuestionMutation,
  useAddReplyMutation,
  useAddReviewMutation,
  useGetCourseDetailsQuery,
} from "@/redux/features/courses/coursesApi";
import Image from "next/image";
import React, { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { format } from "timeago.js";
import {
  AiFillStar,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineStar,
} from "react-icons/ai";
import { BiMessage } from "react-icons/bi";
import { VscVerifiedFilled } from "react-icons/vsc";
import Ratings from "@/app/utils/Ratings";
import socketIO from 'socket.io-client';
import { IoTennisball } from "react-icons/io5";
const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || '';
const socketId = socketIO(ENDPOINT, { transports : ["websockets"] });

type Props = {
  data: any;
  id: string;
  activeVideo: number;
  setActiveVideo: (activeVideo: number) => void;
  user: any;
  refetch: any;
};

const CourseContentMedia = ({
  data,
  id,
  activeVideo,
  setActiveVideo,
  user,
  refetch,
}: Props) => {
  const [activeBar, setActiveBar] = useState(0);
  const [rating, setRating] = useState(0);
  const [question, setQuestion] = useState("");
  const [review, setReview] = useState("");
  const [answer, setAnswer] = useState("");
  const [questionId, setQuestionId] = useState("");
  const [reply, setReply] = useState("");
  const [reviewId, setReviewId] = useState("");
  const { data: courseData, refetch: courseRefetch } = useGetCourseDetailsQuery(
    id,
    {
      refetchOnMountOrArgChange: true,
    }
  );
  const [isReviewReply, setIsReviewReply] = useState(false);
  const course = courseData?.course;

  const [
    addAnswer,
    {
      isSuccess: answerSuccess,
      error: answerError,
      isLoading: answerCreationLoading,
    },
  ] = useAddAnswerMutation();

  const [
    addNewQuestion,
    { isSuccess, error, isLoading: questionCreationLoading },
  ] = useAddNewQuestionMutation();

  const [
    addReview,
    {
      isSuccess: reviewSuccess,
      error: reviewError,
      isLoading: reviewCreationLoading,
    },
  ] = useAddReviewMutation();

  const [
    addReply,
    {
      isSuccess: replySuccess,
      error: replyError,
      isLoading: replyCreationLoading,
    },
  ] = useAddReplyMutation();

  const isReviewExists = course?.reviews?.find(
    (item: any) => item.user._id === user._id
  );

  const handleQuestion = () => {
    if (question.length === 0) {
      toast.error("Question cannot be empty!");
    } else {
      addNewQuestion({
        question,
        courseId: id,
        contentId: data[activeVideo]._id,
      });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setQuestion("");
      refetch();
      toast.success("Question added successfully!");
      socketId.emit("notification", {
          title: "New Question Receivedr",
          message: `You have a new question in ${data[activeVideo].title}`,
          userId: user._id,
        })
    }
    if (answerSuccess) {
      setAnswer("");
      refetch();
      toast.success("Answer added successfully!");
      if(user.role !== 'admin'){
        socketId.emit("notification", {
          title: "New Rep;y Receivedr",
          message: `You have a new question reply in ${data[activeVideo].title}`,
          userId: user._id,
        })
      }
    }
    if (reviewSuccess) {
      setReview("");
      setRating(1);
      courseRefetch();
      toast.success("Review added successfully!");
      socketId.emit("notification", {
          title: "New Review Receivedr",
          message: `You have a new review in ${data[activeVideo].title}`,
          userId: user._id,
        })
    }
    if (replySuccess) {
      setReply("");
      courseRefetch();
      toast.success("Reply added successfully!");
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
    if (answerError) {
      if ("data" in answerError) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
    if (reviewError) {
      if ("data" in reviewError) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
    if (replyError) {
      if ("data" in replyError) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [isSuccess, error, refetch, courseRefetch, answerSuccess, answerError, reviewSuccess, reviewError, replySuccess, replyError, data, activeVideo, user._id, user.role]);

  const handleAnswerSubmit = () => {
    addAnswer({
      answer,
      courseId: id,
      contentId: data[activeVideo]._id,
      questionId: questionId,
    });
  };

  const handleReviewSubmit = async () => {
    if (review.length === 0) {
      toast.error("Review can't be empty");
    } else {
      addReview({ review, rating, courseId: id });
    }
  };

  const handleReplySubmit = () => {
    if (!replyCreationLoading) {
      if (reply === "") {
        toast.error("Reply cannot be empty!");
      } else {
        addReview({ comment: reply, courseId: id, reviewId });
      }
    }
  };

  return (
    <div className="w-[95%] 800px:w-[86%] py-4 m-auto">
      <CoursePlayer
        title={data[activeVideo]?.title}
        videoUrl={data[activeVideo]?.videoUrl}
      />
      <div className="w-full flex items-center justify-between my-3">
        {/* Previous Button */}
        <div
          className={`${
            styles.button
          } text-white !w-[unset] !min-h-[40px] !py-[unset] ${
            activeVideo === 0 ? "!cursor-not-allowed opacity-80" : ""
          }`}
          onClick={() =>
            setActiveVideo(activeVideo === 0 ? 0 : activeVideo - 1)
          }
        >
          <AiOutlineArrowLeft className="mr-2" />
          Previous Lesson
        </div>

        {/* Next Button */}
        <div
          className={`${
            styles.button
          }text-white !w-[unset] !min-h-[40px] !py-[unset] ${
            data.length - 1 === activeVideo
              ? "!cursor-not-allowed opacity-80"
              : ""
          }`}
          onClick={() =>
            setActiveVideo(
              data && data.length - 1 === activeVideo
                ? activeVideo
                : activeVideo + 1
            )
          }
        >
          Next Lesson
          <AiOutlineArrowRight className="ml-2" />
        </div>
      </div>
      <h1 className="pt-2 text-[25px] font-[600] dark:text-white text-black">
        {data[activeVideo]?.title}
      </h1>
      <br />
      <div className="w-full p-4 flex items-center justify-between bg-slate-500 bg-opacity-20 backdrop-blur shadow-[bg-slate-700] rounded">
        {["Overview", "Resources", "Q&A", "Reviews"].map((text, index) => (
          <h5
            key={index}
            className={`800px:text-[20px] cursor-pointer ${
              activeBar === index
                ? "text-red-500"
                : "dark:text-white text-black"
            }`}
            onClick={() => setActiveBar(index)}
          >
            {text}
          </h5>
        ))}
      </div>
      <br />
      {activeBar === 0 && (
        <p className="text-[18px] whitespace-pre-line mb-3 dark:text-white text-black">
          {data[activeVideo]?.description}
        </p>
      )}

      {activeBar === 1 && (
        <div>
          {data[activeVideo]?.links.map((item: any, index: number) => (
            <div className="mb-5" key={index}>
              <h2 className="800px:text-[20px] 800px:inline-block dark:text-white text-black">
                {item.title && `${item.title} :`}
              </h2>
              <a
                className="inline-block text-[#4395c4] 800px:text-[20px] 800px:pl-2 "
                href={item.url}
              >
                {item.url}
              </a>
            </div>
          ))}
        </div>
      )}

      {activeBar === 2 && (
        <>
          <div className="flex w-full">
            <Image
              src={
                user.avatar
                  ? user.avatar.url
                  : "https://res.cloudinary.com/dshp9jmy/image/upload/v1665822253/avatars/nrxsg8sd91y1bbsoenn.png"
              }
              width={50}
              height={50}
              alt="User Avatar"
              className="w-[50px] h-[50px] rounded-full object-cover"
            />
            <textarea
              name=""
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              id=""
              cols={40}
              rows={5}
              placeholder="Write your question..."
              className="outline-none bg-transparent ml-3 border border-[#ffffff57] 800px:w-full p-2 rounded w-[90%] 800px:text-[18px] font-Poppins"
            />
          </div>
          <div className="w-full flex justify-end">
            <button
              className={`${
                styles.button
              } !w-[120px] !h-[40px] text-[18px] mt-5 ${
                questionCreationLoading && "cursor-not-allowed"
              }`}
              onClick={questionCreationLoading ? () => {} : handleQuestion}
            >
              Submit
            </button>
          </div>
          <br />
          <br />
          <div className="w-full h-[1px] bg-[#ffffff3b]">
            <CommentReply
              data={data}
              activeVideo={activeVideo}
              answer={answer}
              setAnswer={setAnswer}
              handleAnswerSubmit={handleAnswerSubmit}
              user={user}
              questionId={questionId}
              setQuestionId={setQuestionId}
              answerCreationLoading={answerCreationLoading}
            />
          </div>
        </>
      )}

      {activeBar === 3 && (
        <div className="w-full">
          <>
            {!isReviewExists && (
              <>
                <div className="flex w-full">
                  <Image
                    src={
                      user.avatar
                        ? user.avatar.url
                        : "https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd91y1bbsoenn.png"
                    }
                    width={50}
                    height={50}
                    alt=""
                    className="w-[50px] h-[50px] rounded-full object-cover"
                  />

                  <div className="w-full">
                    <h5 className="pl-3 text-[20px] font-[500] dark:text-white text-black">
                      Give a Rating <span className="text-red-500">*</span>
                    </h5>
                    <div className="flex w-full ml-2 pb-3">
                      {[1, 2, 3, 4, 5].map((i) =>
                        rating >= i ? (
                          <AiFillStar
                            key={i}
                            className="mr-1 cursor-pointer"
                            color="rgb(246,186,0)"
                            size={25}
                            onClick={() => setRating(i)}
                          />
                        ) : (
                          <AiOutlineStar
                            key={i}
                            className="mr-1 cursor-pointer"
                            color="rgb(246,186,0)"
                            size={25}
                            onClick={() => setRating(i)}
                          />
                        )
                      )}
                    </div>
                    <textarea
                      value={review}
                      onChange={(e) => setReview(e.target.value)}
                      cols={40}
                      rows={5}
                      placeholder="Write your comment..."
                      className="outline-none bg-transparent 800px:ml-3 border border-[#ffffff57] w-[95%] 800px:w-full p-2 rounded text-[18px] font-Poppins"
                    />
                  </div>
                </div>
                <div className="w-full flex justify-end">
                  <button
                    className={`${
                      styles.button
                    } !w-[120px] !h-[40px] text-[18px] mt-5 ${
                      reviewCreationLoading && "cursor-not-allowed"
                    }`}
                    onClick={
                      reviewCreationLoading ? () => {} : handleReviewSubmit
                    }
                  >
                    Submit
                  </button>
                </div>
              </>
            )}
            <br />
            <div className="w-full h-[1px] bg-[#ffffff3b]"></div>
            <div className="w-full">
              {course?.reviews &&
                [...course.reviews]
                  .reverse()
                  ?.map((item: any, index: number) => (
                    <div className="w-full my-5" key={index}>
                      <div className="w-full flex">
                        <div>
                          <Image
                            src={
                              item.user.avatar
                                ? item.user.avatar.url
                                : "https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd91y1bbsoenn.png"
                            }
                            width={50}
                            height={50}
                            alt={item.user.name}
                            className="w-[50px] h-[50px] rounded-full object-cover"
                          />
                        </div>
                        <div className="ml-2">
                          <h1 className="text-[18px] text-black dark:text-white">
                            {item?.user.name}
                          </h1>
                          <Ratings rating={item.rating} />
                          <p className="text-black dark:text-white">
                            {item.comment}
                          </p>
                          <small className="text-[#ffffff83] dark:text-[#ffffff83]">
                            {format(item.createdAt)}
                          </small>
                        </div>
                      </div>
                      {user.role === "admin" && item.commentReplies.length === 0 && (
                        <span
                          className={`${styles.label} !ml-13 cursor-pointer`}
                          onClick={() => {
                            setIsReviewReply(true);
                            setReviewId(item._id);
                          }}
                        >
                          Add Reply{" "}
                        </span>
                      )}
                      {isReviewReply && reviewId === item._id && (
                        <div className="w-full flex relative">
                          <input
                            type="text"
                            placeholder="Enter your reply..."
                            value={reply}
                            onChange={(e) => setReply(e.target.value)}
                            className="block 800px:ml-12 mt-2 outline-none bg-transparent border-b border-[#ffffff] p-[5px] w-[95%] dark:border-[#ffffff57] text-black dark:text-white"
                          />
                          <button
                            type="submit"
                            className="absolute right-0 bottom-1 text-black dark:text-white"
                            onClick={handleReplySubmit}
                            disabled={replyCreationLoading}
                          >
                            Submit
                          </button>
                        </div>
                      )}
                      {item.commentReplies?.map((i: any, index: number) => (
                        <div
                          className="w-full flex 800px:ml-16 my-5"
                          key={index}
                        >
                          <div className="w-[50px] h-[50px]">
                            <Image
                              src={
                                i.user.avatar
                                  ? i.user.avatar.url
                                  : "https://res.cloudinary.com/dshp9jmy/image/upload/v1665822253/avatars/nrxsg8sd91y1bbsoenn.png"
                              }
                              width={50}
                              height={50}
                              alt="User Avatar"
                              className="w-[50px] h-[50px] rounded-full object-cover"
                            />
                          </div>
                          <div className="pl-2">
                            <div className="flex items-center">
                              <h5 className="text-[20px]">{item.user.name}</h5>{" "}
                              {item.user.role === "admin" && (
                                <VscVerifiedFilled className="text-[#0095F6] ml-2 text-[20px]" />
                              )}
                            </div>
                            <p className="text-black dark:text-white">
                              {i.comment}
                            </p>
                            <small className="text-[#ffffff83] dark:text-[#ffffff83]">
                              {format(i.createdAt)} •
                            </small>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
            </div>
          </>
        </div>
      )}
    </div>
  );
};

const CommentReply = ({
  data,
  activeVideo,
  answer,
  setAnswer,
  user,
  questionId,
  setQuestionId,
  handleAnswerSubmit,
  answerCreationLoading,
}: any) => {
  return (
    <>
      <div className="w-full my-3">
        {data[activeVideo]?.questions.map((item: any, index: number) => (
          <CommentItem
            key={index}
            data={data}
            activeVideo={activeVideo}
            questionId={questionId}
            setQuestionId={setQuestionId}
            item={item}
            index={index}
            answer={answer}
            setAnswer={setAnswer}
            handleAnswerSubmit={handleAnswerSubmit}
            answerCreationLoading={answerCreationLoading}
          />
        ))}
      </div>
    </>
  );
};

const CommentItem = ({
  data,
  activeVideo,
  questionId,
  setQuestionId,
  item,
  answer,
  setAnswer,
  handleAnswerSubmit,
  answerCreationLoading,
}: any) => {
  const [replyActive, setReplyActive] = useState(false);

  return (
    <div className="my-4">
      <div className="flex mb-2">
        <div>
          <Image
            src={
              item.user.avatar
                ? item.user.avatar.url
                : "https://res.cloudinary.com/dshp9jmy/image/upload/v1665822253/avatars/nrxsg8sd91y1bbsoenn.png"
            }
            width={50}
            height={50}
            alt="User Avatar"
            className="w-[50px] h-[50px] rounded-full object-cover"
          />
        </div>
        <div className="pl-3">
          <h5 className="text-[20px] text-black dark:text-white">
            {item?.user.name}
          </h5>
          <p className="text-black dark:text-white">{item?.question}</p>
          <small className="text-[#000000b8] dark:text-[#ffffff83]">
            {!item.createdAt ? "" : format(item?.createdAt)}
          </small>
        </div>
      </div>
      <div className="w-full flex items-center">
        <span
          className="800px:pl-16 text-[#000000b8] dark:text-[#ffffff83] cursor-pointer mr-2"
          onClick={() => {
            setReplyActive(!replyActive);
            setQuestionId(item._id);
          }}
        >
          {!replyActive
            ? item.questionReplies.length !== 0
              ? "All Replies"
              : "Add Reply"
            : "Hide Replies"}
        </span>
        <BiMessage
          size={20}
          className="dark:text-[#ffffff83] cursor-pointer text-[#000000b8]"
        />
        <span className="pl-1 mt-[-4px] cursor-pointer text-[#000000b8] dark:text-[#ffffff83]">
          {item.questionReplies.length}
        </span>
      </div>
      {replyActive && questionId === item._id && (
        <>
          {item.questionReplies.map((item: any) => (
            <div className="w-full flex 800px:ml-16 my-5 text-black dark:text-white">
              <div>
                <Image
                  src={
                    item.user.avatar
                      ? item.user.avatar.url
                      : "https://res.cloudinary.com/dshp9jmy/image/upload/v1665822253/avatars/nrxsg8sd91y1bbsoenn.png"
                  }
                  width={50}
                  height={50}
                  alt="User Avatar"
                  className="w-[50px] h-[50px] rounded-full object-cover"
                />
              </div>
              <div className="pl-3">
                <div className="flex items-center">
                  <h5 className="text-[20px]">{item.user.name}</h5>{" "}
                  {item.user.role === "admin" && (
                    <VscVerifiedFilled className="text-[#0095F6] ml-2 text-[20px]" />
                  )}
                </div>
                <p>{item.answer}</p>
                <small className="text-[#000000b8] dark:text-[#ffffff83]">
                  {!item.createdAt ? "" : format(item?.createdAt)}
                </small>
              </div>
            </div>
          ))}
          <>
            <div className="w-full flex relative dark:text-white text-black">
              <input
                type="text"
                placeholder="Enter your answer..."
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className={`block 800px:ml-12 mt-2 outline-none bg-transparent border-b border-[#00000027] p-[5px] w-[95%] text-[#000000b8] dark:text-[#ffffff83] dark:border-[#ffffff57] ${
                  answer === "" ||
                  (answerCreationLoading && "cursor-not-allowed")
                }`}
              />
              <button
                type="submit"
                // className={`absolute right-0 bottom-1 ${
                //   isLoading ? "cursor-not-allowed opacity-70" : "cursor-pointer"
                // }`}
                className="absolute right-0 bottom-1"
                onClick={handleAnswerSubmit}
                disabled={answer === "" || answerCreationLoading}
              >
                Submit
              </button>
            </div>
          </>
        </>
      )}
    </div>
  );
};

export default CourseContentMedia;

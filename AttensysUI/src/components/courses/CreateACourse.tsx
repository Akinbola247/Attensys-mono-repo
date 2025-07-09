import React, { useEffect, useState, useCallback } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import edit from "../../assets/edi.svg";
import tdesign_video from "../../assets/tdesign_video.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { handleCreateCourse } from "@/utils/helpers";
import { courseQuestions } from "@/constants/data";

interface CourseDraft {
  courseName: string;
  courseImage: {
    url?: string;
    IpfsHash?: string;
  };
  progress: number;
  isPublished?: boolean;
}

const CreateACourse = () => {
  const router = useRouter();
  const [drafts, setDrafts] = useState<CourseDraft[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const calculateProgress = useCallback((draft: any) => {
    const requiredFields = [
      "courseName",
      "courseDescription",
      "courseCategory",
      "difficultyLevel",
      "studentRequirements",
      "learningObjectives",
      "courseImage",
      "courseCurriculum",
    ];

    const filledFields = requiredFields.filter((field) => {
      const value = draft[field];
      if (field === "courseCurriculum") {
        return Array.isArray(value) && value.length > 0;
      }
      if (field === "courseImage") {
        return value && (value.url || value.IpfsHash);
      }
      return value && value !== "";
    }).length;

    return Math.round((filledFields / requiredFields.length) * 100);
  }, []);

  useEffect(() => {
    let mounted = true;

    const loadDrafts = async () => {
      try {
        const courseData = localStorage.getItem("courseData");

        if (!courseData) {
          if (mounted) {
            setDrafts([]);
            setIsLoading(false);
          }
          return;
        }

        const draft = JSON.parse(courseData);

        // Show draft if it has any content, regardless of progress
        if (
          draft.courseName ||
          draft.courseDescription ||
          draft.courseCategory ||
          draft.difficultyLevel ||
          draft.studentRequirements ||
          draft.learningObjectives ||
          draft.courseImage ||
          (draft.courseCurriculum && draft.courseCurriculum.length > 0)
        ) {
          const progress = calculateProgress(draft);
          const courseDraft: CourseDraft = {
            courseName: draft.courseName || "Untitled Course",
            courseImage: draft.courseImage || {},
            progress,
            isPublished: draft.isPublished,
          };

          if (mounted) {
            setDrafts([courseDraft]);
          }
        } else {
          if (mounted) {
            setDrafts([]);
          }
        }
      } catch (error) {
        console.error("Error loading drafts:", error);
        if (mounted) {
          setError("Failed to load course drafts");
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    loadDrafts();

    return () => {
      mounted = false;
    };
  }, [calculateProgress]);

  const handleEditDraft = useCallback(
    (draft: CourseDraft) => {
      const courseData = localStorage.getItem("courseData");
      if (courseData) {
        localStorage.setItem("currentCourseData", courseData);
        handleCreateCourse(
          {} as React.FormEvent<HTMLButtonElement>,
          courseQuestions[0],
          router,
        );
      }
    },
    [router],
  );

  if (isLoading) {
    return (
      <div className="py-12">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#4A90E2]"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-12">
        <div className="flex justify-center items-center h-64">
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12">
      {/* header */}
      <div className="px-4 xl:px-0">
        <h1 className="font-bold py-5 text-[#A01B9B] text-[20px] leading-[22px]">
          Create a course
        </h1>
        <div className="bg-transparent sm:bg-white sm:p-10 rounded-xl border-[#bcbcbc] sm:border">
          <div className="block sm:flex items-center justify-between text-sm">
            <div className="">
              <p className="font-semibold text-[16px] leading-[22px]">{`Let's get started`}</p>
              <p className="text-[14px] font-normal text-[#333333] leading-[22px]">
                Setup your course in a few easy steps
              </p>
            </div>
            <div className="my-4 sm:my-0">
              <button
                className="bg-[#4A90E2] px-8 py-3 text-white w-auto text-sm rounded-xl"
                type="submit"
                onClick={(e) =>
                  handleCreateCourse(e, courseQuestions[0], router)
                }
              >
                Create a course
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* content - Only show if there are incomplete drafts */}
      {drafts.length > 0 && (
        <div className="bg-white rounded-xl border-[#bcbcbc] border-[1px] my-6">
          <div className="flex justify-between items-center py-5 px-10 border-b border-[#bcbcbc]">
            <h1 className="font-bold py-5 text-[#A01B9B] text-[20px] leading-[22px]">
              Incomplete Drafts
            </h1>

            <div className="hidden sm:flex items-center">
              <p className="underline">Manage & publish</p>
              <Image src={edit} alt="edit" />
            </div>
          </div>

          {drafts.map((draft, index) => (
            <div
              key={index}
              className="p-10 block sm:flex items-center justify-between text-sm border-b border-[#bcbcbc] last:border-b-0"
            >
              <div className="flex-1">
                <div className="w-auto h-[164px] sm:w-[80%] rounded-xl bg-[#d5d5d5] flex text-center justify-center overflow-hidden">
                  {draft.courseImage?.url ? (
                    <Image
                      src={draft.courseImage.url}
                      alt={draft.courseName}
                      width={300}
                      height={164}
                      className="object-cover h-full w-full rounded-xl"
                    />
                  ) : draft.courseImage?.IpfsHash ? (
                    <Image
                      src={`https://gateway.pinata.cloud/ipfs/${draft.courseImage.IpfsHash}`}
                      alt={draft.courseName}
                      width={300}
                      height={164}
                      className="object-cover h-full w-full rounded-xl"
                    />
                  ) : (
                    <Image
                      src={tdesign_video}
                      alt="placeholder"
                      className="object-cover h-full w-full rounded-xl"
                    />
                  )}
                </div>
              </div>
              <div className="flex-auto my-3 sm:my-0">
                <div>
                  <p className="font-medium text-[20px] text-[#2D3A4B] leading-[22px] mb-3">
                    {draft.courseName}
                  </p>
                  <div>
                    <ProgressBar
                      completed={draft.progress}
                      height="15px"
                      bgColor="#9B51E0"
                    />
                    <p className="flex justify-end mt-2">
                      {draft.progress}% completed
                    </p>
                  </div>
                </div>
              </div>

              <div className="my-3 sm:my-0 flex items-center">
                <button
                  onClick={() => handleEditDraft(draft)}
                  className="flex items-center text-[#4A90E2] hover:text-[#357ABD]"
                >
                  <span className="underline mr-2">Continue editing</span>
                  <Image src={edit} alt="edit" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CreateACourse;

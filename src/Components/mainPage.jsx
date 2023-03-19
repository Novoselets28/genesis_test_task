import React, {useEffect, useState} from "react";
import Pagination from "./pagination";
import {paginate} from "../utils/paginate";
import CourseCard from "./Courses/courseCard";
import { getCourses } from "../services/api";

const MainPage = () => {
    document.body.style.backgroundColor = 'WhiteSmoke';
    const [courses, setCourses] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;
    useEffect(() => {
        const getApi = async () => {
            const data = await getCourses();
            setCourses(data.courses);
        };
        getApi();
    }, []);
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    if (courses) {
        const count = courses.length;
        const usersCrop = paginate(courses, currentPage, pageSize);
        return <>
            <div className="container mt-5">
                <div className="row row-cols-1 row-cols-md-2 g-4 d-flex align-items-stretch mb-5">
                    {Object.values(usersCrop).map((course) =>
                        <div key={course.id}>
                            <CourseCard
                                id={course.id}
                                imageSrc={course.previewImageLink}
                                title={course.title}
                                description={course.description}
                                lessonCount={course.lessonsCount}
                                rating={course.rating}
                                skills={course.meta.skills}
                                videoSrc={course.meta.courseVideoPreview.link}
                                tag={course.tags}
                            />
                        </div>
                    )}
                </div>
                <div className="d-flex justify-content-center">
                    <Pagination
                        itemsCount={count}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </>
    }
    return (
        <div className="d-flex justify-content-center mt-5">
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}

export default MainPage;
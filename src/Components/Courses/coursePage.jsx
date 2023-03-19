import React, {useState, useEffect} from "react";
import {useParams, Link} from "react-router-dom";
import { getById } from "../../services/api";
import LockCheck from "../lockCheck";

const CoursePage = () => {
    const params = useParams();
    const {courseId, lessonId} = params;
    const [course, setCourse] = useState();
    useEffect(() => {
        const getApi = async (id) => {
            const data = await getById(id);
            setCourse(data);
        };
        getApi(courseId);
    }, [courseId]);
    if (course) {
        let shownLesson = course.lessons[0];
        let lessonNumber = 0;
        course.lessons.forEach((lesson, lessonIndex) => {
            if (lesson.id === lessonId) {
                shownLesson = lesson
                lessonNumber = lessonIndex
            }
        })

        function getLockedStatus(numberOfLesson) {
            return course.lessons[numberOfLesson].status === "unlocked";
        }

        return <>
            <div className="container mt-5">
                <nav style={{bsBreadcrumbDivider: '>'}} aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to={`/`}>
                            Back to courses
                        </Link></li>
                        <li className="breadcrumb-item active" aria-current="page">{course.title}</li>
                        <li className="breadcrumb-item active"
                            aria-current="page">{`Lesson ${lessonNumber + 1}. ${shownLesson.title}`}</li>
                    </ol>
                </nav>
                <LockCheck status={getLockedStatus(lessonNumber)} lessons={course.lessons} lesson={shownLesson}
                           course={course} lessonNumber={lessonNumber} className="card bg-dark text-white"/>
                <ul className="list-group my-5">
                    {course.lessons.map((lesson, lessonNumberMap) =>
                        <Link key={lesson.id} to={`/${courseId}/${lesson.id}`}
                              className={`list-group-item d-flex justify-content-between align-items-start ${!getLockedStatus(lessonNumberMap) ? "text-black-50" : ""}`}>
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">Lesson {lessonNumberMap + 1}</div>
                                {lesson.title}
                            </div>
                            <span className="badge bg-primary rounded-pill">Loked status: <i
                                className={`bi bi-${getLockedStatus(lessonNumberMap) ? "unlock-fill" : "lock-fill"}`}></i></span>
                        </Link>
                    )}
                </ul>
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

export default CoursePage;
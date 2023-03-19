import React from "react";
import Video from "./video/video";
import PropTypes from "prop-types";

const LockCheck = ({status, lessons, lesson, course, lessonNumber}) => {
    if (status) {
        return <Video lessons={lessons} lesson={lesson} course={course} lessonNumber={lessonNumber}/>
    }
    return <>
        <div>
            <div className="fs-2 text-break text-center">Sorry, this lesson is not available yet</div>
            <div className="fs-2 text-break text-center">But you can try watching the lessons below, which have a locked
                status <i
                    className="bi bi-unlock-fill"></i></div>
        </div>
    </>
}

LockCheck.propTypes = {
    status: PropTypes.bool.isRequired,
    lessons: PropTypes.array.isRequired,
    lesson: PropTypes.object.isRequired,
    course: PropTypes.object.isRequired,
    lessonNumber: PropTypes.number.isRequired
}

export default LockCheck;
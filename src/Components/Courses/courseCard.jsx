import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import VideoPreview from "../video/videoPreview";

const CourseCard = ({id, imageSrc, title, description, lessonCount, rating, skills, videoSrc, tag}) => {
    let skillList = '';
    if (skills) {
        skillList = skills.join(", ");
    }
    return <>
        <div className="col h-100">
            <div className="card border-dark mb-3 h-100">
                <div className="card-img-top">
                    <VideoPreview videoSrc={videoSrc} imageSrc={imageSrc + '/cover.webp'}/>
                </div>
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                    <p className="badge rounded-pill bg-primary">{tag}</p>
                </div>
                <div className="card-footer">
                    <p className="text-muted">Lesson count: {lessonCount}</p>
                    <p className="text-muted">Skills: {skillList}</p>
                    <p className="text-muted">Rating: {rating}</p>
                    <Link key={id} to={`/${id}`} className="btn btn-primary w-100">
                        Watch the course
                    </Link>
                </div>
            </div>
        </div>
    </>
}

CourseCard.propTypes = {
    id: PropTypes.string.isRequired,
    imageSrc: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    lessonCount: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    skills: PropTypes.array,
    videoSrc: PropTypes.string.isRequired,
    tag: PropTypes.array.isRequired
}

export default CourseCard;
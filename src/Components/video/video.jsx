import React, {useRef} from "react";
import PropTypes from "prop-types";
import Hls from "hls.js";

const Video = ({lesson, course, lessons, lessonNumber}) => {
    const videoRef = useRef();
    if (lessons[lessonNumber]) {
        const video = videoRef.current;
        if (Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource(lesson.link);
            hls.attachMedia(video);
            hls.on(Hls.Events.MANIFEST_PARSED, function () {
                video.play();
            });

            return <>
                <video
                    controls
                    preload="metadata"
                    poster={`${lessons[lessonNumber].previewImageLink}/lesson-${lessons[lessonNumber].order}.webp`}
                    src={course.meta.courseVideoPreview.link}
                    ref={videoRef}
                    className="container"
                ></video>
            </>
        }
    }
}

Video.propTypes = {
    lessons: PropTypes.array.isRequired,
    lesson: PropTypes.object,
    course: PropTypes.object.isRequired,
    lessonNumber: PropTypes.number.isRequired
}

export default Video;
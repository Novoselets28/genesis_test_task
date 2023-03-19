import {useState, useRef} from 'react';
import Hls from 'hls.js';

const VideoPreview = ({videoSrc, imageSrc}) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef(null);
    if (videoSrc) {
        const handleMouseEnter = () => {
            setIsPlaying(true);
            if (Hls.isSupported()) {
                const hls = new Hls();
                hls.loadSource(videoSrc);
                hls.attachMedia(videoRef.current);
                hls.on(Hls.Events.MANIFEST_PARSED, () => {
                    if (videoRef.current.readyState > 3) {
                        videoRef.current.play();
                    } else {
                        videoRef.current.addEventListener('canplaythrough', () => {
                            if (videoRef.current) {
                                videoRef.current.play();
                            }
                        });
                    }
                });
            } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
                if (videoRef.current.readyState > 3) {
                    videoRef.current.play();
                } else {
                    videoRef.current.src = videoSrc;
                    videoRef.current.addEventListener('canplaythrough', () => {
                        videoRef.current.play();
                    });
                }
            }
        };

        const handleMouseLeave = () => {
            setIsPlaying(false);
            if (videoRef.current) {
                videoRef.current.pause();
                videoRef.current.currentTime = 0;
            }
        };

        const handleVideoClick = () => {
            if (!isPlaying) {
                setIsPlaying(true);
                videoRef.current.play();
            }
        }

        return (
            <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={handleVideoClick}>
                {isPlaying ?
                    <video ref={videoRef} poster={imageSrc} muted autoPlay className="card-img-top"/> :
                    <img src={imageSrc} alt="video preview" className="card-img-top"/>}
            </div>
        );
    }
}

export default VideoPreview;
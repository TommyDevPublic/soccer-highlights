import React from 'react';

const VideoList = (props) => {

    const renderVideoList = props.videos.map( (video, i) => {
        return (
            <div className="video-item" key={i}>
                <figure>
                    <img src={video.thumbnail} alt={`${video.title} image`} />
                </figure>
                <h6 className="title">{video.title}</h6>
            </div>
        )
    });

    return (
        <div className="video-list border p-4">
            {renderVideoList}
        </div>
    )


};

export default VideoList;


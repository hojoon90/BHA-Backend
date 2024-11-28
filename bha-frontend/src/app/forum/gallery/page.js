"use client";

import Image from "next/image";
import Link from "next/link";
import URL from "@/data/url";
import ForumLeftbar from "@/components/leftmenu/ForumLeftbar";

const images = [
    { id: 1, src: "/images/img_sample1.png", title: "Photo 1" },
    { id: 2, src: "/images/img_sample1.png", title: "Photo 2" },
    { id: 3, src: "/images/img_sample1.png", title: "Photo 3" },
    { id: 4, src: "/images/img_sample1.png", title: "Photo 4" },
    { id: 5, src: "/images/img_sample1.png", title: "Photo 5" },
];

const ForumGallery = () => {
    return (
        <div className="container">
            <div className="c_wrap">
                {/* Location */}
                <div className="location">
                    <ul>
                        <li><Link href={URL.HOME} className="home">Home</Link></li>
                        <li><Link href={URL.FORUM_FREE}>참여마당</Link></li>
                        <li>갤러리</li>
                    </ul>
                </div>
                <div className="layout">
                    {/* Navigation */}
                    <ForumLeftbar />

                    <div className="contents SITE_GALLARY_LIST" id="contents">
                        <div className="top_tit">
                            <h1 className="tit_1">참여마당</h1>
                        </div>

                        <h2 className="tit_2">갤러리</h2>

                        <div className="gallery-board">
                            {images.map((image) => (
                                <div key={image.id} className="gallery-card">
                                    <Image
                                        src={image.src}
                                        alt={image.title}
                                        className="image"
                                        width={185}
                                        height={80}
                                    />
                                    <div className="card-title">{image.title}</div>
                                    <div className="card-content">{image.title}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForumGallery;
import Link from "next/link";
import URL from "@/data/url";
import NewsLeftbar from "@/components/leftmenu/NewsLeftbar";
import BoardList from "@/components/board/BoardList";
import {useRouter} from "next/navigation";
import {useContext} from "react";
import {AuthContext} from "@/components/AuthProvider";

function NewsDefaultPage({pageUrl, pageName, bbsId}){
    const router = useRouter();
    const { user, updateUser } = useContext(AuthContext);
    const handleCreatePost = () => {
        // 로그인 상태면 게시글 작성 페이지로 이동
        router.push(`${pageUrl}/create`);
    };

    return (
        <div className="container">
            <div className="c_wrap">
                {/* Location */}
                <div className="location">
                    <ul>
                        <li><Link href={URL.HOME} className="home">Home</Link></li>
                        <li><Link href={URL.NEWS_NOTICE}>사찰 소식</Link></li>
                        <li>{pageName}</li>
                    </ul>
                </div>

                <div className="layout">
                    {/* Navigation */}
                    <NewsLeftbar />

                    <div className="contents SITE_GALLARY_LIST" id="contents">
                        <div className="top_tit">
                            <h1 className="tit_1">사찰 소식</h1>
                        </div>

                        <h2 className="tit_2">{pageName}</h2>

                        {/* 게시판목록 */}
                        <BoardList
                            listUrl={pageUrl}
                            bbsId={bbsId}
                        />

                        {user?.authority === 'ADMIN' ? (
                            <div className="board_btn_area">
                                <div className="left_col btn1">
                                </div>

                                <div className="right_col btn1">
                                    <button
                                        className="btn btn_blue_h46 w_100"
                                        onClick={handleCreatePost}
                                    >
                                        등록
                                    </button>
                                </div>
                            </div>
                        ):(
                            <></>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewsDefaultPage;
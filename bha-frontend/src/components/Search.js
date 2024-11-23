import Link from "next/link";
import URL from "@/data/url";


function Search(){


    return (
        <div className="condition">
            <ul>
                <li className="third_1 L">
                    <label className="f_select" htmlFor="sel1">
                        <select id="sel1" title="조건" defaultValue={searchCondition.searchCnd} ref={cndRef}
                                onChange={e => {
                                    cndRef.current.value = e.target.value;
                                }}
                        >
                            <option value="0">제목</option>
                            <option value="1">내용</option>
                            <option value="2">작성자</option>
                        </select>
                    </label>
                </li>
                <li className="third_2 R">
                        <span className="f_search w_500">
                            <input type="text" name="" defaultValue={searchCondition.searchWrd}
                                   placeholder="" ref={wrdRef}
                                   onChange={e => {
                                       wrdRef.current.value = e.target.value;
                                   }}
                            />
                            <button type="button"
                                    onClick={() => {
                                        retrieveList({
                                            ...searchCondition,
                                            pageIndex: 1,
                                            searchCnd: cndRef.current.value,
                                            searchWrd: wrdRef.current.value
                                        });
                                    }}>조회</button>
                        </span>
                </li>
                {/*{user.id && masterBoard.bbsUseFlag === 'Y' &&*/}
                {/*    <li>*/}
                {/*        <Link href={URL.INFORM_GALLERY_CREATE} state={{bbsId: bbsId}}*/}
                {/*              className="btn btn_blue_h46 pd35">등록</Link>*/}
                {/*    </li>*/}
                {/*}*/}
            </ul>
        </div>
    );
}

export default Search;
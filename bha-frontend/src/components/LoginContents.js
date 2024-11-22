"use client"; // 클라이언트 컴포넌트로 지정

import { useState, useEffect, useRef, useContext } from 'react';
import { useRouter } from 'next/navigation';
import * as ExtApi from '@/lib/api';
import {jwtDecode} from "jwt-decode";

import URL from '@/data/url';
import CODE from '@/data/code';
import { getLocalItem, setLocalItem, setSessionItem } from '@/lib/storage';
import { AuthContext } from '@/components/AuthProvider';

export default function LoginContents({ onChangeLogin }) {
    const router = useRouter();
    const { updateUser } = useContext(AuthContext);

    const [userInfo, setUserInfo] = useState({ accountId: '', password: 'default' });
    const [saveIDFlag, setSaveIDFlag] = useState(false);

    const checkRef = useRef();
    const idRef = useRef(null);
    const passwordRef = useRef(null);

    const KEY_ID = "KEY_ID";
    const KEY_SAVE_ID_FLAG = "KEY_SAVE_ID_FLAG";

    const handleSaveIDFlag = () => {
        setLocalItem(KEY_SAVE_ID_FLAG, !saveIDFlag);
        setSaveIDFlag(!saveIDFlag);
    };

    useEffect(() => {
        let idFlag = getLocalItem(KEY_SAVE_ID_FLAG);
        if (idFlag === null) {
            setSaveIDFlag(false);
            idFlag = false;
        } else {
            setSaveIDFlag(idFlag);
        }
        if (!idFlag) {
            setLocalItem(KEY_ID, "");
            checkRef.current.className = "f_chk";
        } else {
            checkRef.current.className = "f_chk on";
        }
    }, []);

    useEffect(() => {
        let data = getLocalItem(KEY_ID);
        if (data !== null) {
            setUserInfo({ accountId: data, password: 'default' });
        }
    }, []);

    const activeEnter = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            if (e.target === idRef.current && passwordRef.current.value === "") {
                alert("비밀번호 입력 여부를 확인하여 주세요");
                passwordRef.current.focus();
            } else {
                submitFormHandler(e);
            }
        }
    };

    const submitFormHandler = (e) => {
        ExtApi.loginUser(userInfo)
            .then(resp  => {
                // let resultVO = resp.resultVO;
                let accessToken = resp?.data.accessToken || null;

                setSessionItem('accessToken', accessToken);

                if (Number(resp.resultCode) === Number(CODE.RCV_SUCCESS)) {

                    let resultVO = jwtDecode(accessToken);
                    setSessionItem('loginUser', resultVO);
                    updateUser(resultVO);
                    if (saveIDFlag) setLocalItem(KEY_ID, resultVO?.id);
                    router.push(URL.HOME);
                } else {
                    alert(resp.resultMessage);
                }
            });
    };


    return (
        <div className="contents" id="contents">
            {/* <!-- 본문 --> */}
            <div className="Plogin">
                <h1>로그인</h1>
                {/*<p className="txt">전자정부표준프레임워크 경량환경 홈페이지 로그인 페이지입니다.<br />로그인을 하시면 모든 서비스를 제한없이 이용하실 수 있습니다.</p>*/}

                <div className="login_box">
                    <form name="" method="" action="" >
                        <fieldset>
                            <legend>로그인</legend>
                            <span className="group">
                                <input type="text" name="" title="아이디" placeholder="아이디" value={userInfo?.accountId}
                                       onChange={e => setUserInfo({ ...userInfo, accountId: e.target.value })}
                                       ref={idRef}
                                       onKeyDown={activeEnter}
                                />
                                <input type="password" name="" title="비밀번호" placeholder="비밀번호"
                                       onChange={e => setUserInfo({ ...userInfo, password: e.target.value })}
                                       ref={passwordRef}
                                       onKeyDown={activeEnter} />
                            </span>
                            <div className="chk">
                                <label className="f_chk" htmlFor="saveid" ref={checkRef}>
                                    <input type="checkbox" name="" id="saveid" onChange={handleSaveIDFlag} checked={saveIDFlag}/> <em>ID저장</em>
                                </label>
                            </div>
                            <button type="button" onClick={submitFormHandler} ><span>LOGIN</span></button>
                        </fieldset>
                    </form>
                </div>

                <ul className="list">
                    <li>비밀번호는 6~12자의 영문 대/소문자, 숫자, 특수문자를 혼합해서 사용하실 수 있습니다.</li>
                    <li>쉬운 비밀번호나 자주 쓰는 사이트의 비밀번호가 같을 경우, 도용되기 쉬우므로 주기적으로
                        변경하셔서 사용하는 것이 좋습니다.</li>
                </ul>
                {/*<div className="btn_social">*/}
                {/*    <SnsNaverBt />*/}
                {/*    <SnsKakaoBt />*/}
                {/*</div>*/}
            </div>
            {/* <!--// 본문 --> */}
        </div>
    );
}
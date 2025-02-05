import Link from "next/link";
import URL from "@/data/url";
import {useRouter} from "next/navigation";
import {removeSessionItem} from "@/lib/storage";
import {AuthContext} from "@/components/AuthProvider";
import { useContext } from 'react';

function UserInfo()  {
    const router = useRouter();
    const { user, updateUser } = useContext(AuthContext);

    const logInHandler = () => { // 로그인 정보 없을 시
        router.push(URL.LOGIN);
        // PC와 Mobile 열린메뉴 닫기
        document.querySelector('.all_menu.WEB').classList.add('closed');
        document.querySelector('.btnAllMenu').classList.remove('active');
        document.querySelector('.btnAllMenu').title = '전체메뉴 닫힘';
        document.querySelector('.all_menu.Mobile').classList.add('closed');
    }

    //로그아웃
    const logOutHandler = () => { // 로그인 정보 존재할 때
        console.log("===>>> logout");
        removeSessionItem('loginUser');
        removeSessionItem('accessToken');
        window.alert("로그아웃되었습니다!");
        updateUser(null);
        router.push(URL.HOME);
        // PC와 Mobile 열린메뉴 닫기
        document.querySelector('.all_menu.WEB').classList.add('closed');
        document.querySelector('.btnAllMenu').classList.remove('active');
        document.querySelector('.btnAllMenu').title = '전체메뉴 닫힘';
        document.querySelector('.all_menu.Mobile').classList.add('closed');

    }

    return (
        user ? (
            <>
                <span className="person">{user.accountId} </span> 님, 환영합니다.
                <button onClick={logOutHandler} className="btn logout">로그아웃</button>
            </>
        ):(
            <>
            </>
        )
    );
}

export default UserInfo;
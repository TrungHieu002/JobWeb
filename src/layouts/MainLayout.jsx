import { Box, Stack } from "@mui/material";
import { Outlet } from "react-router-dom";
import { createContext, useContext, useEffect, useState } from "react";
import { refreshTokens } from "services/gg_cloud/tokenHelper";
import { useUserContext } from "contexts/UserContext";
import dayjs from "dayjs";

// Tạo badge thông báo trên Item của NavMenu
const NotifyContext = createContext(null);
export const useNotifyContext = () => {
	return useContext(NotifyContext);
}

const MainLayout = () => {
	const [notify, setNotify] = useState(null);
	const [user, setUser] = useUserContext();
	
	var refreshTimer; // dùng để dọn setTimeout
  // Xử lý refresh tokens định kì
  const handleRefreshTokens = async () => {
    const updatedUser = user;
    if (updatedUser !== null) {
      await refreshTokens(updatedUser.refreshToken)
        .then(result => {
          console.log('User tokens refreshed!');
          updatedUser.token = result.id_token;
					updatedUser.lastTokenRefresh = dayjs().toString();
          setUser(updatedUser);
					// Gọi lại hàm sau 59 phút
          refreshTimer = setTimeout(()=>handleRefreshTokens(), 59*60*1000); 
        })
        .catch(error => {
          // Refresh gặp lỗi thì thử lại sau 5s
          console.log('User tokens refresh failed, retry in 5 secs.', error);
          refreshTimer = setTimeout(()=>handleRefreshTokens(), 5000);
        })
    }
  }
	// Gọi lần đầu
	useEffect(() => {
		handleRefreshTokens();
		return () => {
			// dọn dẹp setTimeout refresh tokens
			clearTimeout(refreshTimer);
		}
	}, [])

	return (
		<NotifyContext.Provider value={[notify, setNotify]}>
			<Stack direction={'row'} minHeight='100%' overflow={"hidden"}>
				<Box sx={{width: "100vw", height : "100vh"}}>
					<Outlet/>
				</Box>
			</Stack>
		</NotifyContext.Provider>
	)
}

export default MainLayout;
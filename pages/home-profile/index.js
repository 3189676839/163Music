// pages/home-profile/index.js
import { getUserInfo } from '../../service/api_login'
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  async handleGetUser(event) {
    const UserInfo = await getUserInfo()
    console.log(UserInfo);
  }
})
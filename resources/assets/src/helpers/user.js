import { config } from '../config';

export const userHelper = {
  getImage: (user) => {
    if (user.image) {
      return user.image;
    }
    if (user.fb_image) {
      return user.fb_image;
    }
    if (user.g_image) {
      return user.g_image;
    }

    return `${config.url.base}storage/profile_placeholder.png`;
  },


  ratioBohurt: user => Math.ceil(Math.abs((((user.bohurtTable.down + user.bohurtTable.suicide) / (user.bohurtTable.won + user.bohurtTable.lastMan)) * 100) - 100)),

  isClubAdmin: (currentUser, clubId) => {
    if (currentUser.clubAdmin !== null) {
      if (currentUser.clubAdmin === clubId) {
        return true;
      }
    }
    return false;
  },
};

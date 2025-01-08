'use client';

import React from 'react';

const ProfileImage: React.FC = () => {
  return (
    <div className="avatar flex justify-center mb-5">
      <div className="w-24 rounded-full">
        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
      </div>
    </div>
  );
};

export default ProfileImage;

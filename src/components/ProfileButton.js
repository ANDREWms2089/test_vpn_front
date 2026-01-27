import React from 'react';
import './ProfileButton.css';
import profileIcon from '../images/icons/icon_profile.png';

function ProfileButton({ onOpenProfile }) {
  const handleClick = () => {
    if (onOpenProfile) {
      onOpenProfile();
    }
  };

  return (
    <button className="profile-button" onClick={handleClick}>
      <img src={profileIcon} alt="" className="button-icon" />
      <span className="button-text">Профиль</span>
    </button>
  );
}

export default ProfileButton;


import React from 'react';
import './ProfileButton.css';
import profileIcon from '../images/icons/icon_profile.png';
import { triggerHaptic } from '../services/telegram';

function ProfileButton({ onOpenProfile }) {
  const handleClick = () => {
    triggerHaptic();
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


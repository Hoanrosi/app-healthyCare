import React, { createContext, useContext, useState } from "react";

interface ProfileContextProps {
  profileImage: string;
  setProfileImage: React.Dispatch<React.SetStateAction<string>>;
}

const ProfileContext = createContext<ProfileContextProps | undefined>(
  undefined
);

export const ProfileProvider: React.FC = ({ children }) => {
  const [profileImage, setProfileImage] = useState<string>("");

  return (
    <ProfileContext.Provider value={{ profileImage, setProfileImage }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfileContext = () => {
  const context = useContext(ProfileContext);

  if (!context) {
    throw new Error("useProfileContext must be used within a ProfileProvider");
  }

  return context;
};

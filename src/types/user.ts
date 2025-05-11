export type User = {
  id: number;
  name: string;
  email: string;
  walletAddress: string;
  phoneNumber: string | null;
  profileImageUrl: string | null;
  location: string | null;
  bio: string | null;
  joinedAt: string;
  authMethod: string;
  role: string;
  updatedAt: string;
  profileImage: string | null;
  accessToken: string;
};

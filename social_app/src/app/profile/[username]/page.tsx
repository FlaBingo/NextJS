import { Metadata } from "next";
import {
  getProfileByUsername,
  getUserLikedPosts,
  getUserPosts,
  isFollowing,
} from "@/actions/profile.action";
import { notFound } from "next/navigation";
import ProfilePageClient from "./ProfilePageClient";

// Update the Props interface
interface Props {
  params: {
    username: string;
  };
  searchParams?: { [key: string]: string | string[] | undefined };
}

// Update the metadata function
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const user = await getProfileByUsername(params.username);
  if (!user) return {
    title: "User not found",
    description: "The user you're looking for doesn't exist."
  };

  return {
    title: `${user.name ?? user.username}`,
    description: user.bio || `Check out ${user.username}'s profile.`,
  };
}

// Update the page component
async function ProfilePageServer({ params }: Props) {
  const user = await getProfileByUsername(params.username);
  if (!user) notFound();

  const [posts, likedPosts, isCurrentUserFollowing] = await Promise.all([
    getUserPosts(user.id),
    getUserLikedPosts(user.id),
    isFollowing(user.id),
  ]);

  return (
    <ProfilePageClient
      user={user}
      posts={posts}
      likedPosts={likedPosts}
      isFollowing={isCurrentUserFollowing}
    />
  );
}

export default ProfilePageServer;
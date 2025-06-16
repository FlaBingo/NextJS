import { Metadata } from "next";
import {
  getProfileByUsername,
  getUserLikedPosts,
  getUserPosts,
  isFollowing,
} from "@/actions/profile.action";
import { notFound } from "next/navigation";
import ProfilePageClient from "./ProfilePageClient";

interface ProfilePageParams {
  params: {
    username: string;
  };
}

export async function generateMetadata({ params }: ProfilePageParams): Promise<Metadata> {
  try {
    const user = await getProfileByUsername(params.username);
    if (!user) return {
      title: 'User Not Found',
      description: 'The requested profile could not be found.'
    };

    return {
      title: `${user.name ?? user.username}`,
      description: user.bio || `Check out ${user.username}'s profile.`,
    };
  } catch (error) {
    return {
      title: 'Error',
      description: 'An error occurred while loading the profile.'
    };
  }
}

async function ProfilePageServer({ params }: ProfilePageParams) {
  try {
    const user = await getProfileByUsername(params.username);
    if (!user) notFound();

    const [posts, likedPosts, isCurrentUserFollowing] = await Promise.all([
      getUserPosts(user.id),
      getUserLikedPosts(user.id),
      isFollowing(user.id),
    ]).catch((error) => {
      console.error('Error fetching profile data:', error);
      throw error;
    });

    return (
      <ProfilePageClient
        user={user}
        posts={posts}
        likedPosts={likedPosts}
        isFollowing={isCurrentUserFollowing}
      />
    );
  } catch (error) {
    notFound();
  }
}

export default ProfilePageServer;
/**
 * Profile Page - Server Component (Container)
 *
 * Responsibilities:
 * - Fetch user data from backend
 * - Pass data to ProfileView (presentation)
 * - Handle auth redirects
 */

import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { config } from '@/config';
import { ProfileView } from '@/views/Profile';

interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  role: string;
  is_active: boolean;
  auth_provider: string;
  profile_picture_url: string | null;
  created_at: string;
}

interface ProfileResponse {
  user: UserProfile;
}

/**
 * Fetch user profile from backend
 */
async function getUserProfile(accessToken: string): Promise<UserProfile | null> {
  try {
    const response = await fetch(`${config.apiUrl}/auth/me/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      return null;
    }

    const data: ProfileResponse = await response.json();
    return data.user;
  } catch {
    return null;
  }
}

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.accessToken) {
    redirect('/login');
  }

  const user = await getUserProfile(session.accessToken);

  // Pass data to presentation layer
  return <ProfileView user={user} />;
}

/**
 * Profile View - Client Component (Presentation)
 *
 * Responsibilities:
 * - Render user profile UI
 * - Handle user interactions (if any)
 * - Receive data via props from container
 */

'use client';

import Image from 'next/image';
import './styles.scss';

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

interface ProfileViewProps {
  user: UserProfile | null;
}

export const ProfileView = ({ user }: ProfileViewProps) => {
  if (!user) {
    return (
      <div className="profile">
        <h1 className="profile__title">Error</h1>
        <p className="profile__error">No se pudo cargar el perfil. Intenta de nuevo.</p>
      </div>
    );
  }

  return (
    <div className="profile">
      <h1 className="profile__title">Mi Perfil</h1>

      <div className="profile__card">
        {/* Avatar */}
        <div className="profile__avatar">
          {user.profile_picture_url ? (
            <Image
              src={user.profile_picture_url}
              alt={user.full_name}
              width={100}
              height={100}
              className="profile__avatar-img"
            />
          ) : (
            <div className="profile__avatar-placeholder">
              {user.full_name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        {/* User Info */}
        <div className="profile__info">
          <h2 className="profile__name">{user.full_name}</h2>
          <span className="profile__role">{user.role}</span>
        </div>

        {/* Details Grid */}
        <div className="profile__details">
          <div className="profile__detail-item">
            <span className="profile__detail-label">Email</span>
            <span className="profile__detail-value">{user.email}</span>
          </div>

          <div className="profile__detail-item">
            <span className="profile__detail-label">ID</span>
            <span className="profile__detail-value profile__detail-value--mono">{user.id}</span>
          </div>

          <div className="profile__detail-item">
            <span className="profile__detail-label">Proveedor</span>
            <span className="profile__detail-value">{user.auth_provider}</span>
          </div>

          <div className="profile__detail-item">
            <span className="profile__detail-label">Estado</span>
            <span
              className={`profile__status ${user.is_active ? 'profile__status--active' : 'profile__status--inactive'}`}
            >
              {user.is_active ? 'Activo' : 'Inactivo'}
            </span>
          </div>

          <div className="profile__detail-item">
            <span className="profile__detail-label">Miembro desde</span>
            <span className="profile__detail-value">
              {new Date(user.created_at).toLocaleDateString('es-CO', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};


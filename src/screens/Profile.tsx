'use client';

import { useAuth } from '@features/auth/model';
import ViewedHistory from '@features/profile/ui/ViewedHistory';
import { Loader } from '@features/shared/ui';

const Profile = () => {
  const { user } = useAuth();

  return (
    <section className="container">
      <h1 className="text-foreground text-2xl font-bold">Profile</h1>
      {user && (
        <p className="text-foreground/70 text-right text-sm">
          Signed in as <span className="font-medium">{user.username}</span>
        </p>
      )}

      <Loader>
        <ViewedHistory />
      </Loader>
    </section>
  );
};

export default Profile;

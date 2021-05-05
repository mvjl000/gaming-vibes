import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../stores/auth-context';
import styles from '../styles/Guides.module.css';

export default function Guides() {
  const { user, authReady } = useContext(AuthContext);
  const [guides, setGuides] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (authReady) {
      fetch(
        '/.netlify/functions/guides',
        user && {
          headers: {
            Authorization: `Bearer ${user.token.access_token}`,
          },
        }
      )
        .then((res) => {
          if (!res.ok) {
            throw Error('You must be logged in to view this content');
          }
          return res.json();
        })
        .then((data) => {
          setGuides(data);
          setError(null);
        })
        .catch((err) => {
          setError(err.message);
          setGuides(null);
        });
    }
  }, [user, authReady]);

  return (
    <div className={styles.guides}>
      {!authReady && <div>Loading...</div>}
      {error && (
        <div className={styles.error}>
          <p>{error}</p>
        </div>
      )}
      {guides &&
        guides.map((guide) => (
          <div key={guide.title} className={styles.card}>
            <h3>{guide.title}</h3>
            <h4>Written by {guide.author}</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
              varius, tellus ut sodales vulputate, mi ipsum elementum magna, sit
              amet blandit diam diam ut sem. Ut facilisis feugiat elit vel
              semper. Nulla pellentesque velit ac orci egestas, at vestibulum
              turpis dictum. Etiam et gravida lorem. In pretium diam vel mi
              cursus, non porttitor libero congue. Proin velit nisl, commodo sed
              mollis eget, sagittis ut ipsum.
            </p>
          </div>
        ))}
    </div>
  );
}

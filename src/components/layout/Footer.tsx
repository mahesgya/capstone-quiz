import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground py-6 mt-12 border-t">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <p className="poppins text-sm font-medium">
          &copy; {new Date().getFullYear()} Ilmu Komputer IPB.
        </p>
        <p className="poppins text-xs text-muted-foreground mt-1">
          Modul 3 &mdash; Etika, Keamanan, dan Aspek Hukum AI
        </p>
      </div>
    </footer>
  );
};

import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-primary text-primary-foreground py-3 md:py-4 px-4 md:px-6 shadow-md border-b-4 border-accent">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-0">
        <div className="flex items-center space-x-3">
          <img 
            src="/logo-ipb.png" 
            alt="Logo IPB" 
            className="h-10 md:h-12 w-auto object-contain bg-white rounded-md p-0.5 md:p-1 shadow-sm"
          />
        </div>
        <div>
          <h2 className="poppins text-sm md:text-lg font-semibold leading-tight text-primary-foreground/90 md:text-primary-foreground">Etika, Keamanan, dan Aspek Hukum AI</h2>
        </div>
      </div>
    </header>
  );
};

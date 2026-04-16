export const Footer = () => {
  return (
    <footer className="border-t border-border mt-16 py-10">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {["FAQ", "Help Center", "Account", "Media Center"].map((item) => (
            <div key={item} className="flex flex-col gap-2">
              <span className="text-sm text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
                {item}
              </span>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl tracking-widest text-gradient">FLIXORA</h2>
          <p className="text-xs text-muted-foreground">© 2024 Flixora. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

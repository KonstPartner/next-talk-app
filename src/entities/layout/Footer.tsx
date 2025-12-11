const Footer = () => {
  return (
    <footer className="bg-background/60 border-border w-full border-t backdrop-blur-md">
      <div className="p-5 text-center">
        <p className="text-foreground text-sm">
          © {new Date().getFullYear()} NextTalk. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

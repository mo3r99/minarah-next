import NavMenuItem from "./NavMenuItem";

export default function NavMenu() {
  return (
    <nav
      className="fixed bottom-0 left-0 w-screen
        md:fixed md:top-0 md:left-0 md:h-screen md:w-20
        backdrop-blur-xl
        border-t md:border-t-0 md:border-r border-gray-200 
        font-[family-name:var(--font-figtree)]
        z-50"
      style={{
        paddingBottom: "calc(env(safe-area-inset-bottom) - 1rem)",
      }}
    >
      <ul className="flex md:flex-col justify-around md:justify-start md:gap-8 items-center py-2 md:py-4 md:h-full">
        <NavMenuItem icon="home" />
        <NavMenuItem icon="mosques" />
        <NavMenuItem icon="calendar" />
        <NavMenuItem icon="settings" />
      </ul>
    </nav>
  );
}
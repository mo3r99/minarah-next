import NavMenuItem from "./NavMenuItem";

export default function NavMenu() {
  return (
    <nav
      className="fixed bottom-0 left-0 w-screen backdrop-blur-md border-t border-gray-200 font-[family-name:var(--font-figtree)]"
      style={{
        paddingBottom: "calc(env(safe-area-inset-bottom) - 1rem)",
      }}
    >
      <ul className="flex justify-around items-center py-2">
        <NavMenuItem icon="home" />
        <NavMenuItem icon="jamaah" />
        <NavMenuItem icon="calendar" />
        <NavMenuItem icon="settings" />
      </ul>
    </nav>
  );
}

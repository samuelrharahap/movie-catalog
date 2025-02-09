import Image from 'next/image';
import Link from 'next/link';

/**
 * The `SideBar` component renders a sidebar navigation menu for this application.
 * It includes a logo at the top and a navigation menu with links to different sections of the app.
 *
 * @returns {JSX.Element} The rendered sidebar component.
 */
export function SideBar() {
  const menu = [
    { href: '/search', src: '/icon-search.svg', alt: 'search', text: 'Search' },
    { href: '/', src: '/icon-home.svg', alt: 'home', text: 'Home' },
    {
      href: '/watchlist',
      src: '/icon-watch-list.svg',
      alt: 'watch-list',
      text: 'Watch list',
    },
  ];

  return (
    <div className="sidebar__container">
      <div className="sidebar__logo">
        <Link href="/">
          <Image src="/disney-plus-hotstar-logo.svg" alt="logo" width={51} height={32} />
        </Link>
      </div>
      <nav>
        <ul className="sidebar__nav">
          {menu.map((item, index) => (
            <li key={index}>
              <Link href={item.href} className="sidebar__nav-link">
                <Image
                  src={item.src}
                  className="sidebar__icon"
                  alt={item.alt}
                  width={24}
                  height={24}
                />
                <span>{item.text}</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="sidebar__background"></div>
      </nav>
    </div>
  );
}

import Image from 'next/image';
import Link from 'next/link';

export function SideBar() {
  return (
    <div className="sidebar__container">
      <div className="sidebar__logo">
        <Link href="/">
          <Image src="/disney-plus-hotstar-logo.svg" alt="logo" width={51} height={32} />
        </Link>
      </div>
      <nav>
        <ul className="sidebar__nav">
          <li>
            <Link href="/search" className="sidebar__nav-link">
              <Image
                src="/icon-search.svg"
                className="sidebar__icon"
                alt="search"
                width={24}
                height={24}
              />
              <span>Search</span>
            </Link>
          </li>
          <li>
            <Link href="/" className="sidebar__nav-link">
              <Image
                src="/icon-home.svg"
                className="sidebar__icon"
                alt="search"
                width={24}
                height={24}
              />
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link href="/watch-list" className="sidebar__nav-link">
              <Image
                src="/icon-watch-list.svg"
                className="sidebar__icon"
                alt="watch-list"
                width={24}
                height={24}
              />
              <span>Watch list</span>
            </Link>
          </li>
        </ul>
        <div className="sidebar__background"></div>
      </nav>
    </div>
  );
}

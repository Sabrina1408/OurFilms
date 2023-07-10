import styles from "./NavBar.module.css";

import { ChangeEvent, FormEvent, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { BiCameraMovie, BiSearchAlt2 } from "react-icons/bi";

const NavBar = () => {
  const [search, setSearch] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if(!search) return;

    navigate(`/search?q=${search}`);
    setSearch("");
  };

  return (
    <nav className={styles.navBar}>
      <div className={styles.smallScreen}>
        <div className={styles.topPart}>
          <Link to="/">
            <BiCameraMovie />
            OurFilms
          </Link>
          <Link to="/about">About</Link>
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search for a film..."
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSearch(e.target.value)
            }
            value={search}
          />
          <button type="submit">
            <BiSearchAlt2 />
          </button>
        </form>
      </div>
      <div className={styles.largeScreen}>
        <Link to="/">
          <BiCameraMovie />
          OurFilms
        </Link>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search for a film..."
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSearch(e.target.value)
            }
            value={search}
          />
          <button type="submit">
            <BiSearchAlt2 />
          </button>
        </form>
        <Link to="/about">About</Link>
      </div>
    </nav>
  );
};

export default NavBar;

import styles from "./About.module.css";

const About = () => {
  return (
    <div>
      <section className={styles.about}>
        <h2>About</h2>
        <p>
          This project consists of a movie information network made with React
          and Typescript.
        </p>
        <p>
          Api used:{" "}
          <a href="https://developer.themoviedb.org/docs">
            https://developer.themoviedb.org/docs
          </a>
        </p>
        <p>
          Meu portfolio:{" "}
          <a href="https://sabrinaalvesbrito.com.br">
            https://sabrinaalvesbrito.com.br
          </a>
        </p>
      </section>
    </div>
  );
};

export default About;

import React from "react";

const AboutPage = () => {
  return (
    <div>
      <h3>About</h3>
      <p>This is a remastered version of a weather app I previously made.</p>
      <p>
        It includes various improvements and features, with improved UI and
        functionality.
      </p>
      <p>
        You can check out the previous version{" "}
        <a
          href="https://alux444.github.io/weather-api-project/"
          target="_blank"
          rel="noreferrer"
        >
          here
        </a>{" "}
        <div>
          You can find some of my other work on my website{" "}
          <a href="https://alux444.github.io" target="_blank" rel="noreferrer">
            here
          </a>
        </div>
        <div>
          The source code of this app can be found on{" "}
          <a
            href="https://github.com/alux444/weather-remastered"
            target="_blank"
            rel="noreferrer"
          >
            here
          </a>
        </div>
      </p>
    </div>
  );
};

export default AboutPage;

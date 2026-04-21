import React from "react";
import styles from "./Backgrounds.module.css";

//이미지는 이렇게 가져와야 정상적으로 작동할 확률이 높다.
import desk1 from "../../../../assets/images/desk1.jpg";
import desk2 from "../../../../assets/images/desk2.jpg";
import tile from "../../../../assets/images/tile.jpg";
import leaf from "../../../../assets/images/leaf.jpg";

const Backgrounds = ({ selectedBackground, setSelectedBackground }) => {
  const backgrounds = [
    {
      id: 1,
      name: "GREEN",
      src: null,
      className: "background-green",
      alt: "background image - green",
    },
    {
      id: 2,
      name: "YELLOW",
      src: null,
      className: "background-yellow",
      alt: "background image - yellow",
    },
    {
      id: 3,
      name: "BLUE",
      src: null,
      className: "background-blue",
      alt: "background image - blue",
    },
    {
      id: 4,
      name: "PINK",
      src: null,
      className: "background-pink",
      alt: "background image - pink",
    },
    {
      id: 5,
      name: "DESK1",
      src: desk1,
      className: null,
      alt: "background image - desk1",
    },
    {
      id: 6,
      name: "DESK2",
      src: desk2,
      className: null,
      alt: "background image - desk2",
    },
    {
      id: 7,
      name: "TILE",
      src: tile,
      className: null,
      alt: "background image - tile",
    },
    {
      id: 8,
      name: "LEAF",
      src: leaf,
      className: null,
      alt: "background image - leaf",
    },
  ];
  return (
    <div>
      <p className={styles.label}>배경을 선택해주세요</p>
      <div className={styles.backgrounds}>
        {backgrounds.map((background) => {
          return (
            <div
              key={background.id}
              onClick={() => {
                setSelectedBackground(background.name);
              }}
              className={styles.background}
            >
              {background.className && (
                <div
                  className={`${styles.colorchip} ${styles[background.className]}`}
                />
              )}
              {background.src && (
                <img src={background.src} alt={background.alt} />
              )}

              {selectedBackground === background.name ? (
                <div className={styles.pawContainer}>
                  <div className={`ic paw ${styles.paw}`} />
                </div>
              ) : (
                ""
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Backgrounds;

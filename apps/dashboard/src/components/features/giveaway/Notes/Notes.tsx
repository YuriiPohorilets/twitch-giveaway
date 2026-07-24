import { Typography } from "@/components/ui";
import styles from "./Notes.module.css";

const notes = [
  {
    content: (
      <>
        <b>1 глядач</b>, <b>100 повідомлень</b> із ключовим слово = <b>1 участь</b> в{" "}
        <b>поточному розіграші</b>.
      </>
    ),
  },
  {
    content: (
      <>
        Регістр <b>НЕ</b> має значення: <i>банана, БАНАНА, БаНаНа</i> -{" "}
        <b>однаково зараховуються</b>.
      </>
    ),
  },
  {
    content: (
      <>
        Переобраний переможець більше <b>НЕ</b> бере участі в <b>поточному розіграші</b>.
      </>
    ),
  },
  {
    content: (
      <>
        Максимальна кількість переможців - <b>12</b>.
      </>
    ),
  },
];

export function Notes() {
  return (
    <ul className={styles.list}>
      {notes.map(({ content }, index) => (
        <li key={`instructions-${index}`} className={styles.item}>
          <Typography variant="body2">{content}</Typography>
        </li>
      ))}
    </ul>
  );
}

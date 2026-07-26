import { Typography } from "@/components/ui";
import styles from "./Instructions.module.css";

const instructions = [
  { content: <>Введи ключове слово.</> },
  { content: <>Вкажи кількість переможців.</> },
  {
    content: (
      <>
        Натисни <b>«Старт»</b>.
      </>
    ),
  },
  { content: <>Глядачі пишуть ключове слово в чат.</> },
  {
    content: (
      <>
        Натисни <b>«Стоп»</b>, щоб завершити прийом учасників.
      </>
    ),
  },
  {
    content: (
      <>
        Натисни <b>«Обрати переможців»</b>.
      </>
    ),
  },
  {
    content: (
      <>
        За потреби можна <b>«Переобрати»</b> окремого переможця.
      </>
    ),
  },
  {
    content: (
      <>
        <b>«Скопіювати переможців»</b> копіює всіх переможців одним кліком.
      </>
    ),
  },
  {
    content: (
      <>
        Перед новим розіграшем натисніть <b>«Почати заново»</b>.
      </>
    ),
  },
];

export function Instructions() {
  return (
    <ol className={styles.list}>
      {instructions.map(({ content }, index) => (
        <li key={`instructions-${index}`} className={styles.item}>
          <Typography variant="body2">{content}</Typography>
        </li>
      ))}
    </ol>
  );
}

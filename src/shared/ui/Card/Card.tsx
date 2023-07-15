import { HTMLAttributes, memo, ReactNode } from "react";
import { classNames } from "../../../shared/lib/classNames/classNames";
import cls from "./Card.module.scss";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: ReactNode;
  max?: boolean;
}

export const Card = memo((props: CardProps) => {
  const { className, children, max, ...rest } = props;

  return (
    <div
      className={classNames(cls.Card, { [cls.max]: max }, [className])}
      {...rest}
    >
      {children}
    </div>
  );
});

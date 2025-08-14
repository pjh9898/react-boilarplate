import React, { ElementType, ComponentPropsWithoutRef, JSX } from "react";

interface ITypography<T extends ElementType> extends ITextType {
  children: JSX.Element | string | number;
  className?: string;
  tag?: T;
}

const typoList = {
  strong_01: "text-[1.75rem] leading-[1.4] tracking-[-0.4px] font-bold",
  strong_02: "text-[1.5rem] leading-[1.4] tracking-[-0.4px] font-bold",

  text_01: "text-[1.25rem] leading-[1.2] font-medium",
  text_02: "text-[1rem] leading-[1.2] font-medium",

  small_01: "text-[1rem] leading-[1.1] font-normal",
  small_02: "text-[0.875rem] leading-[1.1] font-normal",
};

const Typography = <T extends ElementType = "p">({
  children,
  className = "",
  tag,
  type,
  ...props
}: ITypography<T> & ComponentPropsWithoutRef<T>): JSX.Element => {
  const Tag = tag || "span";

  return (
    <Tag
      {...props}
      className={`${typoList[type] || ""} ${
        Tag === "p" ? "mb-0" : ""
      } ${className}`}
    >
      {children}
    </Tag>
  );
};

export default Typography;

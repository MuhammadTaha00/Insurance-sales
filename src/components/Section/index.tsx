import React, { ReactNode } from "react";

import "./Section.css";

interface SectionProp {
  title: string;
  children: ReactNode;
}

const Section: React.FC<SectionProp> = ({ title, children }) => {
  return (
    <div className="section">
      <h2>{title}</h2>
      <div>{children}</div>
    </div>
  );
};

export default Section;

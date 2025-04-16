"use client";

import React from "react";
import Typography from "../components/Typography";
import { useMessages } from "next-intl";

const Tailwind = () => {
  const messages = useMessages();

  return (
    <div>
      <Typography type="text_01">{messages.home.title}</Typography>
    </div>
  );
};

export default Tailwind;

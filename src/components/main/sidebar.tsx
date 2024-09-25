import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import Header from "../layout/header";
import Input from "../common/input";
import List from "./list";

export default function Sidebar() {
  return (
    <div className="h-full">
      <Header />
      <Input />
      <h1 className="py-8 text-4xl">송파구 근처 주차장이에요.</h1>
      <List />
    </div>
  );
}

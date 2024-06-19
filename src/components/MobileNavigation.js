"use client";
import {
  Article,
  Briefcase,
  BriefcaseMetal,
  Confetti,
  GlobeStand,
  Newspaper,
  PlusSquare,
  Users,
  Envelope,
} from "@phosphor-icons/react";
import Link from "next/link";
import React, { useState } from "react";

function MobileNavigation() {
  const [isBottomDrawerOpen, setIsBottomDrawerOpen] = useState(false);
  return (
    <>
      <div
        className={`mb-14 transform -bottom-14 left-0 fixed w-full overflow-auto ease-in-out transition-all duration-100 z-10 border-t ${
          isBottomDrawerOpen ? "-translate-y-14" : "translate-y-full"
        }`}
      >
        <div className="p-2 grid grid-cols-2 gap-2 bg-base-100 text-theme-dark dark:text-theme-light shadow dark:shadow-white">
          <button type="button" className="btn normal-case btn-outline">
            <span className="block">
              <Envelope size={24} stroke={2} />
            </span>
            Message
          </button>
          <button type="button" className="btn normal-case btn-outline">
            <span className="block">
              <Article size={24} stroke={2} />
            </span>
            Article
          </button>
          <button type="button" className="btn normal-case btn-outline">
            <span className="block">
              <Confetti size={24} stroke={2} />
            </span>
            Celebration
          </button>
          <button type="button" className="btn normal-case btn-outline">
            <span className="block">
              <BriefcaseMetal size={24} stroke={2} />
            </span>
            Buy Request
          </button>
        </div>
      </div>

      <div
        id="mobile-footer"
        style={{
          transition: "bottom 0.3s",
          bottom: isBottomDrawerOpen ? "14rem" : "0",
        }}
        className="fixed z-40 w-full text-xs grid grid-cols-5 bg-inherit lg:hidden items-center bottom-0 text-theme-dark dark:text-theme-light shadow dark:shadow-white"
      >
        <Link
          href="/network"
          className="flex flex-col items-center p-2 hover:bg-gray-200 hover:dark:bg-gray-800"
        >
          <Users size={24} stroke={2} />
          Network
        </Link>
        <Link
          href="/news"
          className="flex flex-col items-center p-2 hover:bg-gray-200 hover:dark:bg-gray-800"
        >
          <Newspaper size={24} stroke={2} />
          News
        </Link>{" "}
        <button
          onClick={() => setIsBottomDrawerOpen(!isBottomDrawerOpen)}
          className="flex flex-col items-center p-2 hover:bg-gray-200 hover:dark:bg-gray-800"
        >
          <PlusSquare size={24} stroke={2} />
          Post
        </button>{" "}
        <Link
          href="/events"
          className="flex flex-col items-center p-2 hover:bg-gray-200 hover:dark:bg-gray-800"
        >
          <GlobeStand size={24} stroke={2} />
          Events
        </Link>{" "}
        <Link
          href="/jobs"
          className="flex flex-col items-center p-2 hover:bg-gray-200 hover:dark:bg-gray-800"
        >
          <Briefcase size={24} stroke={2} />
          Jobs{" "}
        </Link>
      </div>
    </>
  );
}

export default MobileNavigation;

"use client";

import React, { useEffect, useRef, useState } from "react";
import ShowMoreText from "react-show-more-text";

type ReadMoreProps = {
  text: string;
  lines?: number;
};

export default function ExpandableText({ text, lines = 6 }: ReadMoreProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const elementRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      isExpanded &&
      elementRef.current &&
      !elementRef.current.contains(event.target as Node)
    ) {
      setIsExpanded(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isExpanded]);

  return (
    <div className="relative">
      {!isExpanded ? (
        <ShowMoreText
          lines={lines}
          more="See more"
          expanded={false}
          less=""
          onClick={() => setIsExpanded(true)}
          className="content-css w-full text-slate-500"
          anchorClass="text-blue-500 cursor-pointer hover:text-blue-700 transition-colors"
          truncatedEndingComponent={"... "}
        >
          <p
            className={`text-slate-500 text-base font-light leading-normal relative`}
            dangerouslySetInnerHTML={{ __html: text }}
          />
        </ShowMoreText>
      ) : (
        <>
          {" "}
          <p
            ref={elementRef}
            className={`text-slate-500 text-base font-light leading-normal relative`}
            dangerouslySetInnerHTML={{ __html: text }}
          />
          <div
            className="text-blue-500 cursor-pointer hover:text-blue-700 transition-colors  w-fit"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            See less
          </div>
        </>
      )}
    </div>
  );
}

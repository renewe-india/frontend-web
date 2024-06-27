import React from "react";

function BusinessShowCard({ businessDetails }) {
  return (
    <>
      {businessDetails && (
        <div className="card bg-base-200 rounded-lg p-5 flex flex-col gap-5">
          <div className="relative w-full h-64 rounded-lg">
            <img
              src="https://picsum.photos/800/250"
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute -bottom-20 left-5">
              <div className="avatar">
                <div className="w-36 rounded-full border-4 border-white">
                  <img src="https://picsum.photos/600" />
                </div>
              </div>
            </div>
          </div>
          <div className="mx-5 py-2 mt-12 flex flex-col gap-2">
            <div className="font-bold text-base md:text-xl flex items-center gap-2">
              {businessDetails.name}
            </div>
            <div className="text-gray-500 line-clamp-1 max-w-2/4 text-xs md:text-sm">
              {businessDetails.tagline}
            </div>
            <div className="text-gray-500 text-xs md:text-sm">
              <time dateTime={businessDetails.date_of_incorporation}>
                <span>
                  {new Date(
                    businessDetails.date_of_incorporation
                  ).toLocaleString("default", {
                    month: "long",
                    day: "numeric",
                  })}
                  {","}
                </span>
                <span>
                  {new Date(
                    businessDetails.date_of_incorporation
                  ).getFullYear()}
                </span>
              </time>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default BusinessShowCard;

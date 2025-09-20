import React from "react";

export function SkeletonAddPost() {
  return (
    <div className="bg-white shadow-xs rounded-lg p-4 mb-6 w-full mx-auto animate-pulse">
      <div className="flex items-center mb-4">
        <div className="h-12 w-12 bg-gray-300 rounded-full mr-3" />
        <div>
          <div className="w-32 h-4 bg-gray-300 rounded mb-2" />
          <div className="w-20 h-3 bg-gray-200 rounded" />
        </div>
      </div>
      <div className="w-full h-10 bg-gray-200 rounded mb-2" />
      <div className="w-1/2 h-8 bg-gray-200 rounded" />
    </div>
  );
}

export default function SkeletonPost() {
  return (
    <div className="bg-white shadow-xs rounded-lg p-4 mb-6 w-full mx-auto animate-pulse">
      <div className="flex items-center mb-4">
        <div className="h-12 w-12 bg-gray-300 rounded-full mr-3" />
        <div>
          <div className="w-32 h-4 bg-gray-300 rounded mb-2" />
          <div className="w-20 h-3 bg-gray-200 rounded" />
          <div className="w-16 h-3 bg-gray-200 rounded" />
        </div>
      </div>
      <div className="mb-4">
        <div className="w-full h-4 bg-gray-300 rounded mb-2" />
        <div className="w-3/4 h-3 bg-gray-200 rounded mb-2" />
        <div className="w-1/2 h-3 bg-gray-200 rounded" />
        <div className="w-full h-32 bg-gray-200 rounded mt-3" />
      </div>
      <div className="flex justify-between items-center text-gray-700 text-sm bg-gray-50 px-4 py-3 rounded-xl shadow-sm">
        <div className="w-16 h-4 bg-gray-200 rounded" />
        <div className="w-16 h-4 bg-gray-200 rounded" />
        <div className="w-16 h-4 bg-gray-200 rounded" />
      </div>
    </div>
  );
}
import React from "react";

function AttemptBar({ currentAttempt = 0, maxAttempts = 20 }) {
  return (
    <div className=" flex items-center gap-4 bg-black/90 text-white p-4 rounded-lg">
      <span className="text-sm font-medium">Attempts</span>
      <div className="flex-1 h-2 bg-white/20 rounded-full overflow-hidden">
        <div
          className="h-full bg-white transition-all duration-300 ease-in-out"
          style={{
            width: `${(currentAttempt / maxAttempts) * 100}%`,
          }}
        />
      </div>
      <span className="text-sm tabular-nums">
        {currentAttempt}/{maxAttempts}
      </span>
    </div>
  );
}

export default AttemptBar;

export default function Background() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <svg className="w-full h-full" style={{ opacity: 0.18 }}>
        <circle cx="10%" cy="20%" r="3" fill="#00ff9d">
          <animate
            attributeName="cy"
            values="20%;80%;20%"
            dur="12s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="80%" cy="60%" r="2.5" fill="#00ff9d">
          <animate
            attributeName="cy"
            values="60%;30%;60%"
            dur="10s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="50%" cy="80%" r="2" fill="#00ff9d">
          <animate
            attributeName="cy"
            values="80%;10%;80%"
            dur="14s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="30%" cy="40%" r="2.5" fill="#00ff9d">
          <animate
            attributeName="cy"
            values="40%;70%;40%"
            dur="11s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="70%" cy="10%" r="2" fill="#00ff9d">
          <animate
            attributeName="cy"
            values="10%;90%;10%"
            dur="13s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    </div>
  );
}

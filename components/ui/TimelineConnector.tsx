"use client";

interface TimelineConnectorProps {
  className?: string;
}

export default function TimelineConnector({
  className = "",
}: TimelineConnectorProps) {
  return (
    <div className={`py-4 md:py-8 ${className}`} />
  );
}

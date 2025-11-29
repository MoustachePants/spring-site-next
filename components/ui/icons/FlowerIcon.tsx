import React from 'react';

type FlowerIconProps = {
  width?: number | string;
  height?: number | string;
  className?: string;
  strokeWidth?: number;
};

const FlowerIcon: React.FC<FlowerIconProps> = ({
  width = 24,
  height = 24,
  className,
  strokeWidth = 1.5,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      strokeWidth={strokeWidth}
    >
      <path
        d="M9.17152 13.4142C9.17152 13.4142 7.0502 14.1213 5.63599 15.5355C4.22177 16.9497 4.22177 19.7782 4.22177 19.7782C4.22177 19.7782 7.0502 19.7782 8.46441 18.364C9.87863 16.9497 10.5857 14.8284 10.5857 14.8284"
        stroke="currentColor"
        strokeMiterlimit="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.8285 13.4142C14.8285 13.4142 16.9498 14.1213 18.364 15.5355C19.7782 16.9497 19.7782 19.7782 19.7782 19.7782C19.7782 19.7782 16.9498 19.7782 15.5356 18.364C14.1214 16.9497 13.4143 14.8284 13.4143 14.8284"
        stroke="currentColor"
        strokeMiterlimit="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.4142 9.17176C13.4142 9.17176 14.1213 7.05044 15.5355 5.63623C16.9497 4.22202 19.7782 4.22202 19.7782 4.22202C19.7782 4.22202 19.7782 7.05044 18.364 8.46466C16.9497 9.87887 14.8284 10.586 14.8284 10.586"
        stroke="currentColor"
        strokeMiterlimit="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.5858 9.17176C10.5858 9.17176 9.87866 7.05044 8.46445 5.63623C7.05023 4.22202 4.22181 4.22202 4.22181 4.22202C4.22181 4.22202 4.22181 7.05044 5.63602 8.46466C7.05023 9.87887 9.17155 10.586 9.17155 10.586"
        stroke="currentColor"
        strokeMiterlimit="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 22V12"
        stroke="currentColor"
        strokeMiterlimit="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default FlowerIcon;

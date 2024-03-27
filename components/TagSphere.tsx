import React from "react";
import { TagCloud } from "react-tagcloud";

interface TagData {
  data: { value: string; count: number }[];
}

const SimpleCloud = ({ data }: TagData) => (
  <TagCloud
    minSize={12}
    maxSize={35}
    tags={data}
    renderer={(tag, size, color) => (
      <span
        key={tag.value}
        style={{
          fontSize: `${size}px`,
          margin: "5px",
          padding: "5px",
          position:'absolute',
          color: color,
          top: `${size*100}px`, // Adjust the range based on your layout
          left: `${size*100}px`, // Adjust the range based on your layout
        }}
      >
        <code>{`</${tag.value}>`}</code>
      </span>
    )}
  />
);

export default SimpleCloud;
